import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Beranda Akun</h2>}
        >
            <Head title="Dashboard Utama" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-xl sm:rounded-2xl p-8 border border-gray-100">
                        <div className="text-center mb-10">
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Selamat Datang, {auth.user.name}!</h3>
                            <p className="text-gray-500">Silakan pilih menu layanan yang ingin Anda akses di bawah ini.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                            {/* Patient Card */}
                            <Link href={route('patient.dashboard')} className="block group">
                                <div className="h-full bg-gradient-to-br from-indigo-50 to-white border-2 border-indigo-100 rounded-2xl p-8 hover:border-indigo-500 hover:shadow-2xl transition duration-300 transform hover:-translate-y-1">
                                    <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center text-white text-2xl mb-6 shadow-md group-hover:scale-110 transition-transform">
                                        🏥
                                    </div>
                                    <h4 className="text-xl font-bold text-gray-900 mb-3">Layanan Pasien</h4>
                                    <p className="text-gray-600 mb-6">Booking jadwal praktik dokter, lihat tiket reservasi, dan pantau antrean secara real-time dari handphone Anda.</p>
                                    <span className="text-indigo-600 font-semibold group-hover:text-indigo-800 flex items-center gap-2">
                                        Masuk Area Pasien <span className="text-xl">&rarr;</span>
                                    </span>
                                </div>
                            </Link>

                            {/* Admin Card */}
                            {auth.user.role === 'admin' && (
                                <Link href={route('admin.dashboard')} className="block group">
                                    <div className="h-full bg-gradient-to-br from-teal-50 to-white border-2 border-teal-100 rounded-2xl p-8 hover:border-teal-500 hover:shadow-2xl transition duration-300 transform hover:-translate-y-1">
                                        <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center text-white text-2xl mb-6 shadow-md group-hover:scale-110 transition-transform">
                                            👨‍⚕️
                                        </div>
                                        <h4 className="text-xl font-bold text-gray-900 mb-3">Manajemen Klinik (Admin)</h4>
                                        <p className="text-gray-600 mb-6">Kelola jadwal praktik dokter, buka kuota baru, dan atur pemanggilan antrean pasien hari ini.</p>
                                        <span className="text-teal-600 font-semibold group-hover:text-teal-800 flex items-center gap-2">
                                            Masuk Area Admin <span className="text-xl">&rarr;</span>
                                        </span>
                                    </div>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
