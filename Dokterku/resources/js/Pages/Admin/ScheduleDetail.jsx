import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, Link } from '@inertiajs/react';

export default function ScheduleDetail({ auth, schedule, bookings }) {
    
    const updateStatus = (bookingId, status) => {
        router.patch(route('admin.bookings.updateStatus', bookingId), {
            status: status
        }, {
            preserveScroll: true
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Detail Jadwal: {schedule.date}</h2>}
        >
            <Head title="Kelola Antrean" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg mb-6">
                        <Link href={route('admin.dashboard')} className="text-indigo-600 hover:text-indigo-900 mb-4 inline-block">&larr; Kembali ke Dashboard</Link>
                        <h3 className="text-lg font-medium text-gray-900 mt-2">
                            Waktu: {schedule.start_time} - {schedule.end_time} | Kuota: {schedule.quota}
                        </h3>
                    </div>

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <header className="mb-4">
                            <h2 className="text-lg font-medium text-gray-900">Daftar Antrean Pasien</h2>
                        </header>
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr>
                                    <th className="border-b py-2">No. Antrean</th>
                                    <th className="border-b py-2">Nama Pasien</th>
                                    <th className="border-b py-2">Status</th>
                                    <th className="border-b py-2">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.map((booking) => (
                                    <tr key={booking.id} className={booking.status === 'dipanggil' ? 'bg-yellow-50' : ''}>
                                        <td className="border-b py-2 font-bold text-lg text-center w-24">{booking.queue_number}</td>
                                        <td className="border-b py-2">{booking.patient ? booking.patient.name : booking.user.name}</td>
                                        <td className="border-b py-2 capitalize">{booking.status}</td>
                                        <td className="border-b py-2 space-x-2">
                                            {booking.status === 'menunggu' && (
                                                <button
                                                    onClick={() => updateStatus(booking.id, 'hadir')}
                                                    className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
                                                >
                                                    Check-in (Hadir)
                                                </button>
                                            )}
                                            {booking.status === 'hadir' && (
                                                <button
                                                    onClick={() => updateStatus(booking.id, 'dipanggil')}
                                                    className="px-3 py-1 bg-yellow-500 text-white rounded text-sm hover:bg-yellow-600"
                                                >
                                                    Panggil
                                                </button>
                                            )}
                                            {booking.status === 'dipanggil' && (
                                                <button
                                                    onClick={() => updateStatus(booking.id, 'selesai')}
                                                    className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
                                                >
                                                    Selesai
                                                </button>
                                            )}
                                            {booking.status === 'selesai' && (
                                                <span className="text-green-600 font-semibold text-sm">Selesai ✓</span>
                                            )}
                                            {booking.status === 'dibatalkan' && (
                                                <span className="text-red-600 font-semibold text-sm">Dibatalkan ✕</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {bookings.length === 0 && <div className="mt-4 text-gray-500">Belum ada pasien yang booking.</div>}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
