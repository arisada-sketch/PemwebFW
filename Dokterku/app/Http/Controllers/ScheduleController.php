<?php

namespace App\Http\Controllers;

use App\Models\Schedule;
use App\Models\Booking;
use App\Models\Doctor;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ScheduleController extends Controller
{
    public function adminDashboard()
    {
        $schedules = Schedule::with(['doctor'])->withCount('bookings')->orderBy('date', 'desc')->get();
        $doctors = Doctor::all();
        return Inertia::render('Admin/Dashboard', [
            'schedules' => $schedules,
            'doctors' => $doctors
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'doctor_id' => 'required|exists:doctors,id',
            'date' => 'required|date',
            'start_time' => 'required',
            'end_time' => 'required',
            'quota' => 'required|integer|min:1',
        ]);

        Schedule::create($request->all());

        return redirect()->back()->with('success', 'Jadwal berhasil ditambahkan.');
    }

    public function show($id)
    {
        $schedule = Schedule::with('doctor')->findOrFail($id);
        $bookings = Booking::with('user')->where('schedule_id', $id)->orderBy('queue_number')->get();

        return Inertia::render('Admin/ScheduleDetail', [
            'schedule' => $schedule,
            'bookings' => $bookings
        ]);
    }
    public function update(Request $request, $id)
    {
        $request->validate([
            'doctor_id' => 'required|exists:doctors,id',
            'date' => 'required|date',
            'start_time' => 'required',
            'end_time' => 'required',
            'quota' => 'required|integer|min:1',
            'is_active' => 'boolean',
        ]);

        $schedule = Schedule::findOrFail($id);
        $schedule->update($request->all());

        return redirect()->back()->with('success', 'Jadwal berhasil diperbarui.');
    }

    public function destroy($id)
    {
        $schedule = Schedule::findOrFail($id);
        $schedule->delete();

        return redirect()->back()->with('success', 'Jadwal berhasil dihapus.');
    }

    public function rekap()
    {
        $totalPasien = Booking::where('status', '!=', 'dibatalkan')->count();
        $totalHadirSelesai = Booking::whereIn('status', ['hadir', 'dipanggil', 'selesai'])->count();
        
        $jadwalPalingRamai = Schedule::withCount(['bookings' => function($q) {
            $q->where('status', '!=', 'dibatalkan');
        }])->orderBy('bookings_count', 'desc')->first();

        $riwayatJadwal = Schedule::withCount(['bookings' => function($q) {
            $q->where('status', '!=', 'dibatalkan');
        }])->orderBy('date', 'desc')->get();

        return Inertia::render('Admin/Rekap', [
            'totalPasien' => $totalPasien,
            'totalHadirSelesai' => $totalHadirSelesai,
            'jadwalPalingRamai' => $jadwalPalingRamai,
            'riwayatJadwal' => $riwayatJadwal
        ]);
    }
}
