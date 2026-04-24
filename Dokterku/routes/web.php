<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Admin Routes
    Route::prefix('admin')->name('admin.')->middleware('admin')->group(function () {
        Route::get('/dashboard', [\App\Http\Controllers\ScheduleController::class, 'adminDashboard'])->name('dashboard');
        Route::post('/schedules', [\App\Http\Controllers\ScheduleController::class, 'store'])->name('schedules.store');
        Route::get('/schedules/{id}', [\App\Http\Controllers\ScheduleController::class, 'show'])->name('schedules.show');
        Route::patch('/schedules/{id}', [\App\Http\Controllers\ScheduleController::class, 'update'])->name('schedules.update');
        Route::delete('/schedules/{id}', [\App\Http\Controllers\ScheduleController::class, 'destroy'])->name('schedules.destroy');
        Route::patch('/bookings/{id}/status', [\App\Http\Controllers\BookingController::class, 'updateStatus'])->name('bookings.updateStatus');
        Route::get('/rekap', [\App\Http\Controllers\ScheduleController::class, 'rekap'])->name('rekap');
        
        // Doctor Routes
        Route::get('/doctors', [\App\Http\Controllers\DoctorController::class, 'index'])->name('doctors.index');
        Route::post('/doctors', [\App\Http\Controllers\DoctorController::class, 'store'])->name('doctors.store');
        Route::patch('/doctors/{id}', [\App\Http\Controllers\DoctorController::class, 'update'])->name('doctors.update');
        Route::delete('/doctors/{id}', [\App\Http\Controllers\DoctorController::class, 'destroy'])->name('doctors.destroy');
    });

    // Patient Routes
    Route::prefix('patient')->name('patient.')->group(function () {
        Route::get('/dashboard', [\App\Http\Controllers\BookingController::class, 'patientDashboard'])->name('dashboard');
        Route::get('/booking', [\App\Http\Controllers\BookingController::class, 'create'])->name('booking.create');
        Route::post('/booking', [\App\Http\Controllers\BookingController::class, 'store'])->name('booking.store');
        Route::get('/monitor', [\App\Http\Controllers\BookingController::class, 'monitor'])->name('monitor');
        Route::delete('/booking/{id}', [\App\Http\Controllers\BookingController::class, 'cancel'])->name('booking.cancel');
    });
});

require __DIR__.'/auth.php';
