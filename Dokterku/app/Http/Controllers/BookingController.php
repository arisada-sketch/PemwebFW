<?php

namespace App\Http\Controllers;

use App\Models\Schedule;
use App\Models\Booking;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class BookingController extends Controller
{
    public function patientDashboard()
    {
        $myBookings = Booking::with(['schedule.doctor', 'patient'])
            ->where('user_id', Auth::id())
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($booking) {
                if (in_array($booking->status, ['menunggu', 'hadir'])) {
                    $patientsAhead = Booking::where('schedule_id', $booking->schedule_id)
                        ->where('queue_number', '<', $booking->queue_number)
                        ->whereIn('status', ['menunggu', 'hadir', 'dipanggil'])
                        ->count();
                    $booking->patients_ahead = $patientsAhead;
                    $booking->estimated_wait_time = $patientsAhead * 15; // 15 menit per pasien
                }
                return $booking;
            });

        return Inertia::render('Patient/Dashboard', [
            'myBookings' => $myBookings
        ]);
    }

    public function create()
    {
        $schedules = Schedule::with(['doctor'])->withCount(['bookings' => function($query) {
                $query->where('status', '!=', 'dibatalkan');
            }])
            ->where('date', '>=', date('Y-m-d'))
            ->where('is_active', true)
            ->orderBy('date', 'asc')
            ->get()
            ->filter(function($schedule) {
                return $schedule->bookings_count < $schedule->quota;
            })->values();

        $patients = Auth::user()->patients;

        return Inertia::render('Patient/Booking', [
            'schedules' => $schedules,
            'patients' => $patients
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'schedule_id' => 'required|exists:schedules,id',
            'is_for_other' => 'required|boolean',
            'patient_id' => 'nullable|exists:patients,id',
            'new_patient_name' => 'required_if:is_for_other,true,patient_id,null',
            'new_patient_nik' => 'nullable|string|max:16',
            'new_patient_dob' => 'nullable|date',
        ]);

        $schedule = Schedule::findOrFail($request->schedule_id);

        $currentBookings = Booking::where('schedule_id', $schedule->id)->where('status', '!=', 'dibatalkan')->count();
        if ($currentBookings >= $schedule->quota) {
            return redirect()->back()->withErrors(['message' => 'Kuota sudah penuh.']);
        }

        // Handle patient
        $patient_id = null;
        if ($request->is_for_other) {
            if ($request->patient_id) {
                $patient_id = $request->patient_id;
            } elseif ($request->new_patient_name) {
                // Generate No RM (contoh sederhana)
                $no_rm = 'RM-' . date('Ym') . '-' . rand(1000, 9999);
                
                $patient = Auth::user()->patients()->create([
                    'no_rm' => $no_rm,
                    'name' => $request->new_patient_name,
                    'nik' => $request->new_patient_nik,
                    'date_of_birth' => $request->new_patient_dob,
                ]);
                $patient_id = $patient->id;
            }
        }

        $existingQuery = Booking::where('schedule_id', $schedule->id)
            ->where('status', '!=', 'dibatalkan');
            
        if ($patient_id) {
            $existingQuery->where('patient_id', $patient_id);
        } else {
            $existingQuery->where('user_id', Auth::id())->whereNull('patient_id');
        }
            
        if ($existingQuery->first()) {
             return redirect()->back()->withErrors(['message' => 'Anda/Pasien ini sudah memiliki booking aktif untuk jadwal ini.']);
        }

        $maxQueue = Booking::where('schedule_id', $schedule->id)->max('queue_number');
        $nextQueue = $maxQueue ? $maxQueue + 1 : 1;

        Booking::create([
            'schedule_id' => $schedule->id,
            'user_id' => Auth::id(),
            'patient_id' => $patient_id,
            'queue_number' => $nextQueue,
            'status' => 'menunggu'
        ]);

        return redirect()->route('patient.dashboard')->with('success', 'Booking berhasil!');
    }

    public function monitor()
    {
        $todaySchedules = Schedule::with('doctor')->where('date', date('Y-m-d'))
            ->with(['bookings' => function($q) {
                $q->orderBy('queue_number', 'asc');
            }, 'bookings.user', 'bookings.patient'])
            ->get();

        return Inertia::render('Patient/Monitor', [
            'schedules' => $todaySchedules
        ]);
    }

    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:menunggu,hadir,dipanggil,selesai,dibatalkan'
        ]);

        $booking = Booking::findOrFail($id);
        $booking->update(['status' => $request->status]);

        return redirect()->back()->with('success', 'Status antrean berhasil diupdate.');
    }

    public function cancel($id)
    {
        $booking = Booking::where('id', $id)->where('user_id', Auth::id())->firstOrFail();
        
        if ($booking->status === 'menunggu') {
            $booking->update(['status' => 'dibatalkan']);
            return redirect()->back()->with('success', 'Booking berhasil dibatalkan.');
        }

        return redirect()->back()->withErrors(['message' => 'Booking tidak dapat dibatalkan pada status ini.']);
    }
}
