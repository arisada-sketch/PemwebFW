import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Doctors({ auth, doctors, errors: serverErrors }) {
    const [editingId, setEditingId] = useState(null);
    
    const { data, setData, post, patch, processing, errors, reset } = useForm({
        name: '',
        specialization: '',
    });

    const submit = (e) => {
        e.preventDefault();
        if (editingId) {
            patch(route('admin.doctors.update', editingId), {
                onSuccess: () => {
                    reset();
                    setEditingId(null);
                },
            });
        } else {
            post(route('admin.doctors.store'), {
                onSuccess: () => reset(),
            });
        }
    };

    const editDoctor = (doctor) => {
        setEditingId(doctor.id);
        setData({
            name: doctor.name,
            specialization: doctor.specialization
        });
    };

    const cancelEdit = () => {
        setEditingId(null);
        reset();
    };

    const deleteDoctor = (id) => {
        if(confirm('Apakah Anda yakin ingin menghapus data dokter ini?')) {
            router.delete(route('admin.doctors.destroy', id), {
                preserveScroll: true
            });
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Manajemen Data Dokter</h2>}
        >
            <Head title="Kelola Dokter" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <Link href={route('admin.dashboard')} className="text-indigo-600 hover:text-indigo-900 inline-block mb-4">&larr; Kembali ke Dashboard Admin</Link>

                    {serverErrors.message && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                            {serverErrors.message}
                        </div>
                    )}

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <header>
                            <h2 className="text-lg font-medium text-gray-900">{editingId ? 'Edit Data Dokter' : 'Tambah Dokter Baru'}</h2>
                        </header>
                        <form onSubmit={submit} className="mt-6 space-y-6 max-w-xl">
                            <div>
                                <label htmlFor="name" className="block font-medium text-sm text-gray-700">Nama Lengkap & Gelar</label>
                                <input
                                    id="name"
                                    type="text"
                                    placeholder="Contoh: Dr. Budi Santoso"
                                    className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                />
                                {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
                            </div>
                            
                            <div>
                                <label htmlFor="specialization" className="block font-medium text-sm text-gray-700">Spesialisasi / Poli</label>
                                <input
                                    id="specialization"
                                    type="text"
                                    placeholder="Contoh: Poli Gigi"
                                    className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full"
                                    value={data.specialization}
                                    onChange={(e) => setData('specialization', e.target.value)}
                                    required
                                />
                                {errors.specialization && <div className="text-red-500 text-sm mt-1">{errors.specialization}</div>}
                            </div>
                            
                            <div className="flex space-x-3">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 focus:bg-indigo-700 transition"
                                >
                                    {editingId ? 'Simpan Perubahan' : 'Tambah Dokter'}
                                </button>
                                {editingId && (
                                    <button
                                        type="button"
                                        onClick={cancelEdit}
                                        className="inline-flex items-center px-4 py-2 bg-gray-300 border border-transparent rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest hover:bg-gray-400 transition"
                                    >
                                        Batal
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <header className="mb-4">
                            <h2 className="text-lg font-medium text-gray-900">Daftar Dokter</h2>
                        </header>
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr>
                                    <th className="border-b py-2">Nama Dokter</th>
                                    <th className="border-b py-2">Spesialisasi</th>
                                    <th className="border-b py-2">Total Jadwal</th>
                                    <th className="border-b py-2">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {doctors.map((doctor) => (
                                    <tr key={doctor.id}>
                                        <td className="border-b py-2 font-semibold text-gray-900">{doctor.name}</td>
                                        <td className="border-b py-2">{doctor.specialization}</td>
                                        <td className="border-b py-2">{doctor.schedules_count} jadwal</td>
                                        <td className="border-b py-2 space-x-3">
                                            <button 
                                                onClick={() => editDoctor(doctor)}
                                                className="text-indigo-600 hover:text-indigo-900 font-semibold"
                                            >
                                                Edit
                                            </button>
                                            <button 
                                                onClick={() => deleteDoctor(doctor.id)} 
                                                className="text-red-500 hover:text-red-700 font-semibold"
                                            >
                                                Hapus
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {doctors.length === 0 && <div className="mt-4 text-gray-500">Belum ada data dokter.</div>}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
