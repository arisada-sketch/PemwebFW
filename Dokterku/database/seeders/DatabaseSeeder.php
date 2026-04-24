<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        \App\Models\User::factory()->create([
            'name' => 'Dokter Admin',
            'email' => 'admin@dokterku.com',
            'password' => bcrypt('password'),
            'role' => 'admin',
        ]);

        \App\Models\User::factory()->create([
            'name' => 'Pasien Uji Coba',
            'email' => 'pasien@dokterku.com',
            'password' => bcrypt('password'),
            'role' => 'patient',
        ]);

        \App\Models\Doctor::create([
            'name' => 'Dr. Andi Budi',
            'specialization' => 'Dokter Umum'
        ]);

        \App\Models\Doctor::create([
            'name' => 'Dr. Siti Aminah',
            'specialization' => 'Dokter Gigi'
        ]);

        \App\Models\Doctor::create([
            'name' => 'Dr. Tono Wijaya',
            'specialization' => 'Spesialis Anak'
        ]);
    }
}
