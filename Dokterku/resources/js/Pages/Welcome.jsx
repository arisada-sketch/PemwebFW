import { Link, Head } from '@inertiajs/react';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Selamat Datang - Dokterku" />
            <div className="min-h-screen bg-slate-50 font-sans text-gray-900 selection:bg-indigo-500 selection:text-white">
                {/* Navbar */}
                <nav className="absolute top-0 left-0 right-0 z-10 w-full px-6 py-4 flex justify-between items-center bg-white/80 backdrop-blur-md shadow-sm">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center font-bold text-xl">D</div>
                        <span className="font-bold text-xl text-indigo-900">Dokterku</span>
                    </div>
                    <div className="space-x-4">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="font-semibold text-gray-600 hover:text-indigo-600 focus:outline focus:outline-2 focus:rounded-sm focus:outline-indigo-500 transition"
                            >
                                Ke Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="font-semibold text-gray-600 hover:text-indigo-600 focus:outline focus:outline-2 focus:rounded-sm focus:outline-indigo-500 transition"
                                >
                                    Log in
                                </Link>

                                <Link
                                    href={route('register')}
                                    className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-full font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 transition"
                                >
                                    Daftar Sekarang
                                </Link>
                            </>
                        )}
                    </div>
                </nav>

                {/* Hero Section */}
                <div className="relative flex items-center justify-center min-h-screen pt-16 overflow-hidden">
                    {/* Background decorations */}
                    <div className="absolute top-0 -left-4 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob"></div>
                    <div className="absolute top-0 -right-4 w-72 h-72 bg-teal-300 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-2000"></div>
                    <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-4000"></div>

                    <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 text-center flex flex-col items-center">
                        <div className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold text-indigo-700 bg-indigo-100 rounded-full shadow-sm">
                            Sistem Reservasi Antrean Digital
                        </div>
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 mb-6 drop-shadow-sm">
                            Klinik <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-teal-500">Kesehatan Modern</span>
                        </h1>
                        <p className="mt-4 max-w-2xl text-lg md:text-xl text-gray-600 mb-10 leading-relaxed">
                            Booking jadwal praktik dokter tanpa perlu menunggu lama di ruang tunggu. Cukup dari rumah, pantau antrean, dan datang saat giliran Anda tiba.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            {auth.user ? (
                                <Link
                                    href={route('patient.dashboard')}
                                    className="px-8 py-4 bg-indigo-600 text-white rounded-full font-bold text-lg hover:bg-indigo-700 shadow-lg hover:shadow-indigo-500/30 transition duration-300 transform hover:-translate-y-1"
                                >
                                    Dashboard Pasien
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('register')}
                                        className="px-8 py-4 bg-indigo-600 text-white rounded-full font-bold text-lg hover:bg-indigo-700 shadow-lg hover:shadow-indigo-500/30 transition duration-300 transform hover:-translate-y-1"
                                    >
                                        Mulai Reservasi
                                    </Link>
                                    <Link
                                        href={route('login')}
                                        className="px-8 py-4 bg-white text-indigo-600 border border-indigo-200 rounded-full font-bold text-lg hover:bg-gray-50 shadow-md transition duration-300 transform hover:-translate-y-1"
                                    >
                                        Log in
                                    </Link>
                                </>
                            )}
                        </div>

                        {/* Feature Highlights */}
                        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 text-left w-full">
                            <div className="bg-white/60 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-white/20">
                                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 mb-4 text-2xl">
                                    🗓️
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Pilih Jadwal</h3>
                                <p className="text-gray-600">Pilih hari dan jam praktik yang sesuai dengan waktu luang Anda.</p>
                            </div>
                            <div className="bg-white/60 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-white/20">
                                <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center text-teal-600 mb-4 text-2xl">
                                    📱
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Dapat Nomor Antrean</h3>
                                <p className="text-gray-600">Sistem akan mengurutkan antrean secara otomatis agar adil dan rapi.</p>
                            </div>
                            <div className="bg-white/60 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-white/20">
                                <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center text-pink-600 mb-4 text-2xl">
                                    ⏱️
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Pantau Real-time</h3>
                                <p className="text-gray-600">Lihat nomor yang sedang dipanggil saat ini langsung dari HP Anda.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
                @keyframes blob {
                    0% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                    100% { transform: translate(0px, 0px) scale(1); }
                }
                .animate-blob {
                    animation: blob 7s infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
            `}</style>
        </>
    );
}
