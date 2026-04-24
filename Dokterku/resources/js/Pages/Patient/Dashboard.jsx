import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Dashboard({ auth, myBookings }) {
    const cancelBooking = (id) => {
        if(confirm('Apakah Anda yakin ingin membatalkan jadwal ini? Kuota akan dikembalikan dan nomor antrean Anda hangus.')) {
            router.delete(route('patient.booking.cancel', id), {
                preserveScroll: true
            });
        }
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard Pasien</h2>}
        >
            <Head title="Dashboard Pasien" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="flex space-x-4 mb-6">
                        <Link href={route('patient.booking.create')} className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                            Booking Jadwal Baru
                        </Link>
                        <Link href={route('patient.monitor')} className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                            Monitor Antrean
                        </Link>
                    </div>

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <header className="mb-4">
                            <h2 className="text-lg font-medium text-gray-900">Riwayat Booking Saya</h2>
                        </header>
                        
                        <div className="space-y-4">
                            {myBookings.map(booking => (
                                <div key={booking.id} className="border p-4 rounded-lg flex justify-between items-center shadow-sm">
                                    <div>
                                        <div className="font-bold text-indigo-700">{booking.schedule.doctor?.name} <span className="text-sm font-normal text-gray-500">({booking.schedule.doctor?.specialization})</span></div>
                                        <div className="font-semibold text-lg mt-1">{booking.schedule.date}</div>
                                        <div className="text-gray-600">{booking.schedule.start_time} - {booking.schedule.end_time}</div>
                                        <div className="mt-2 text-sm bg-gray-100 inline-block px-2 py-1 rounded">
                                            Pasien: <span className="font-semibold">{booking.patient ? booking.patient.name : auth.user.name}</span>
                                        </div>
                                        <div className="mt-2 text-sm block">
                                            Status: <span className={`font-bold capitalize ${booking.status === 'dibatalkan' ? 'text-red-500' : ''}`}>{booking.status}</span>
                                        </div>
                                        
                                        {(booking.status === 'menunggu' || booking.status === 'hadir') && (
                                            <div className="mt-4 bg-indigo-50 border border-indigo-100 p-3 rounded text-sm text-indigo-900">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="text-xl">⏳</span>
                                                    <span className="font-semibold">Estimasi Tunggu: {booking.estimated_wait_time > 0 ? `~${booking.estimated_wait_time} menit` : 'Giliran Anda berikutnya!'}</span>
                                                </div>
                                                <div className="text-xs text-indigo-700 ml-7">
                                                    ({booking.patients_ahead} pasien di depan Anda)
                                                </div>
                                                <div className="mt-2 ml-7 text-xs font-semibold text-yellow-600 bg-yellow-50 p-1.5 rounded inline-block">
                                                    🔔 Pengingat: Harap tiba di klinik 15 menit sebelum giliran Anda.
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex items-center space-x-6">
                                        <div className="text-center bg-gray-50 px-6 py-4 rounded-lg">
                                            <div className="text-xs text-gray-500 uppercase tracking-wide">No. Antrean</div>
                                            <div className="text-4xl font-black text-indigo-600 mt-1">{booking.queue_number}</div>
                                        </div>
                                        {booking.status === 'menunggu' && (
                                            <button 
                                                onClick={() => cancelBooking(booking.id)}
                                                className="px-4 py-2 bg-red-100 text-red-600 font-semibold rounded hover:bg-red-200 transition"
                                            >
                                                Batalkan
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                            
                            {myBookings.length === 0 && (
                                <div className="text-gray-500">Anda belum memiliki riwayat booking.</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
