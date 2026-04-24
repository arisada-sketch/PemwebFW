<?php

namespace App\Http\Controllers;

use App\Models\Doctor;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DoctorController extends Controller
{
    public function index()
    {
        $doctors = Doctor::withCount('schedules')->orderBy('name', 'asc')->get();
        return Inertia::render('Admin/Doctors', [
            'doctors' => $doctors
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'specialization' => 'required|string|max:255',
        ]);

        Doctor::create($request->all());

        return redirect()->back()->with('success', 'Data dokter berhasil ditambahkan.');
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'specialization' => 'required|string|max:255',
        ]);

        $doctor = Doctor::findOrFail($id);
        $doctor->update($request->all());

        return redirect()->back()->with('success', 'Data dokter berhasil diperbarui.');
    }

    public function destroy($id)
    {
        $doctor = Doctor::findOrFail($id);
        
        if($doctor->schedules()->count() > 0) {
            return redirect()->back()->withErrors(['message' => 'Tidak dapat menghapus dokter karena masih memiliki jadwal aktif.']);
        }

        $doctor->delete();
        return redirect()->back()->with('success', 'Data dokter berhasil dihapus.');
    }
}
