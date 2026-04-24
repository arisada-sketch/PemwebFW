import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link, router } from '@inertiajs/react';

export default function Dashboard({ auth, schedules, doctors }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        doctor_id: '',
        date: '',
        start_time: '',
        end_time: '',
        quota: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.schedules.store'), {
            onSuccess: () => reset(),
        });
    };

    const deleteSchedule = (id) => {
        if(confirm('Apakah Anda yakin ingin menghapus jadwal ini? Seluruh booking yang terkait akan ikut terhapus.')) {
            router.delete(route('admin.schedules.destroy', id), {
                preserveScroll: true
            });
        }
    };

    const toggleActive = (schedule) => {
        router.patch(route('admin.schedules.update', schedule.id), {
            doctor_id: schedule.doctor_id,
            date: schedule.date,
            start_time: schedule.start_time,
            end_time: schedule.end_time,
            quota: schedule.quota,
            is_active: !schedule.is_active
        }, {
            preserveScroll: true
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Admin Dashboard - Jadwal Praktik</h2>}
        >
            <Head title="Admin Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    
                    <div className="flex justify-between items-center mb-4">
                        <Link href={route('admin.doctors.index')} className="px-6 py-2 bg-white text-indigo-600 border-2 border-indigo-600 font-bold rounded-lg shadow hover:bg-indigo-50 transition">
                            👨‍⚕️ Kelola Data Dokter
                        </Link>
                        <Link href={route('admin.rekap')} className="px-6 py-2 bg-indigo-600 text-white font-bold rounded-lg shadow hover:bg-indigo-700 transition">
                            Lihat Rekap Data & Laporan
                        </Link>
                    </div>

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <header>
                            <h2 className="text-lg font-medium text-gray-900">Tambah Jadwal Baru</h2>
                        </header>
                        <form onSubmit={submit} className="mt-6 space-y-6 max-w-xl">
                            <div>
                                <label htmlFor="doctor_id" className="block font-medium text-sm text-gray-700">Pilih Dokter</label>
                                <select
                                    id="doctor_id"
                                    className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full"
                                    value={data.doctor_id}
                                    onChange={(e) => setData('doctor_id', e.target.value)}
                                    required
                                >
                                    <option value="">-- Pilih Dokter --</option>
                                    {doctors.map(doc => (
                                        <option key={doc.id} value={doc.id}>{doc.name} ({doc.specialization})</option>
                                    ))}
                                </select>
                                {errors.doctor_id && <div className="text-red-500 text-sm mt-1">{errors.doctor_id}</div>}
                            </div>
                            <div>
                                <label htmlFor="date" className="block font-medium text-sm text-gray-700">Tanggal</label>
                                <input
                                    id="date"
                                    type="date"
                                    className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full"
                                    value={data.date}
                                    onChange={(e) => setData('date', e.target.value)}
                                    required
                                />
                                {errors.date && <div className="text-red-500 text-sm mt-1">{errors.date}</div>}
                            </div>
                            <div className="flex space-x-4">
                                <div className="flex-1">
                                    <label htmlFor="start_time" className="block font-medium text-sm text-gray-700">Jam Mulai</label>
                                    <input
                                        id="start_time"
                                        type="time"
                                        className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full"
                                        value={data.start_time}
                                        onChange={(e) => setData('start_time', e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="flex-1">
                                    <label htmlFor="end_time" className="block font-medium text-sm text-gray-700">Jam Selesai</label>
                                    <input
                                        id="end_time"
                                        type="time"
                                        className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full"
                                        value={data.end_time}
                                        onChange={(e) => setData('end_time', e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="quota" className="block font-medium text-sm text-gray-700">Kuota</label>
                                <input
                                    id="quota"
                                    type="number"
                                    min="1"
                                    className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full"
                                    value={data.quota}
                                    onChange={(e) => setData('quota', e.target.value)}
                                    required
                                />
                                {errors.quota && <div className="text-red-500 text-sm mt-1">{errors.quota}</div>}
                            </div>
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 focus:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                            >
                                Simpan Jadwal
                            </button>
                        </form>
                    </div>

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <header className="mb-4">
                            <h2 className="text-lg font-medium text-gray-900">Daftar Jadwal Praktik</h2>
                        </header>
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr>
                                    <th className="border-b py-2">Dokter</th>
                                    <th className="border-b py-2">Tanggal</th>
                                    <th className="border-b py-2">Waktu</th>
                                    <th className="border-b py-2">Kuota</th>
                                    <th className="border-b py-2">Terisi</th>
                                    <th className="border-b py-2">Status</th>
                                    <th className="border-b py-2">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {schedules.map((schedule) => (
                                    <tr key={schedule.id} className={!schedule.is_active ? 'bg-gray-50 text-gray-500' : ''}>
                                        <td className="border-b py-2 font-semibold">{schedule.doctor?.name} <span className="text-xs text-gray-500 block">{schedule.doctor?.specialization}</span></td>
                                        <td className="border-b py-2">{schedule.date}</td>
                                        <td className="border-b py-2">{schedule.start_time} - {schedule.end_time}</td>
                                        <td className="border-b py-2">{schedule.quota}</td>
                                        <td className="border-b py-2">{schedule.bookings_count}</td>
                                        <td className="border-b py-2">
                                            <button 
                                                onClick={() => toggleActive(schedule)}
                                                className={`px-2 py-1 text-xs rounded-full font-semibold ${schedule.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
                                            >
                                                {schedule.is_active ? 'Buka' : 'Tutup'}
                                            </button>
                                        </td>
                                        <td className="border-b py-2 space-x-3">
                                            <Link href={route('admin.schedules.show', schedule.id)} className="text-indigo-600 hover:text-indigo-900 font-semibold">
                                                Kelola
                                            </Link>
                                            <button onClick={() => deleteSchedule(schedule.id)} className="text-red-500 hover:text-red-700 font-semibold">
                                                Hapus
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {schedules.length === 0 && <div className="mt-4 text-gray-500">Belum ada jadwal.</div>}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
