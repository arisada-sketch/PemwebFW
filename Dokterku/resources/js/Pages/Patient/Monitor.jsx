import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Monitor({ auth, schedules }) {
    
    // Auto refresh logic could be added here using useEffect/router.reload

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Monitor Antrean Hari Ini</h2>}
        >
            <Head title="Monitor Antrean" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <Link href={route('patient.dashboard')} className="text-indigo-600 hover:text-indigo-900 inline-block">&larr; Kembali ke Dashboard</Link>

                    {schedules.map(schedule => {
                        const currentCalled = schedule.bookings.find(b => b.status === 'dipanggil');
                        const waitingList = schedule.bookings.filter(b => b.status === 'menunggu');
                        
                        return (
                            <div key={schedule.id} className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                                <header className="mb-6 pb-4 border-b">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                                        <h2 className="text-xl font-bold text-gray-900">Jadwal: {schedule.start_time} - {schedule.end_time}</h2>
                                        <div className="text-indigo-700 font-semibold mt-2 md:mt-0">{schedule.doctor?.name} <span className="text-sm text-gray-500">({schedule.doctor?.specialization})</span></div>
                                    </div>
                                </header>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100 flex flex-col items-center justify-center text-center h-64">
                                        <h3 className="text-lg font-semibold text-indigo-800 mb-2">Sedang Dipanggil</h3>
                                        {currentCalled ? (
                                            <>
                                                <div className="text-6xl font-black text-indigo-600 mb-2">{currentCalled.queue_number}</div>
                                                <div className="text-xl text-indigo-900">{currentCalled.patient ? currentCalled.patient.name : currentCalled.user.name}</div>
                                            </>
                                        ) : (
                                            <div className="text-gray-500 text-lg">Belum ada antrean yang dipanggil</div>
                                        )}
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Daftar Tunggu Berikutnya</h3>
                                        <div className="space-y-3 h-52 overflow-y-auto pr-2">
                                            {waitingList.map(booking => (
                                                <div key={booking.id} className="flex justify-between items-center p-3 bg-gray-50 border rounded-lg">
                                                    <div className="flex items-center space-x-4">
                                                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-700">
                                                            {booking.queue_number}
                                                        </div>
                                                        <div className="font-medium">{booking.patient ? booking.patient.name : booking.user.name}</div>
                                                    </div>
                                                    <div className="text-xs font-semibold text-yellow-600 uppercase tracking-wide px-2 py-1 bg-yellow-100 rounded">
                                                        {booking.status}
                                                    </div>
                                                </div>
                                            ))}
                                            {waitingList.length === 0 && (
                                                <div className="text-gray-500 text-center py-4">Tidak ada antrean menunggu</div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {schedules.length === 0 && (
                        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg text-center text-gray-500 py-12">
                            Tidak ada jadwal praktik hari ini.
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
