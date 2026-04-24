import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Rekap({ auth, totalPasien, totalHadirSelesai, jadwalPalingRamai, riwayatJadwal }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Rekap Data & Laporan Klinik</h2>}
        >
            <Head title="Rekap Data" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <Link href={route('admin.dashboard')} className="text-indigo-600 hover:text-indigo-900 inline-block mb-4">&larr; Kembali ke Dashboard Admin</Link>

                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-indigo-500">
                            <h3 className="text-gray-500 text-sm font-semibold uppercase tracking-wider mb-2">Total Pasien Terdaftar</h3>
                            <div className="text-4xl font-black text-gray-800">{totalPasien}</div>
                            <p className="text-xs text-gray-400 mt-2">Akumulasi seluruh booking aktif</p>
                        </div>
                        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-green-500">
                            <h3 className="text-gray-500 text-sm font-semibold uppercase tracking-wider mb-2">Total Pasien Dilayani</h3>
                            <div className="text-4xl font-black text-gray-800">{totalHadirSelesai}</div>
                            <p className="text-xs text-gray-400 mt-2">Hadir & Selesai</p>
                        </div>
                        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-teal-500">
                            <h3 className="text-gray-500 text-sm font-semibold uppercase tracking-wider mb-2">Jadwal Paling Ramai</h3>
                            <div className="text-2xl font-bold text-gray-800 mt-1">
                                {jadwalPalingRamai ? jadwalPalingRamai.date : '-'}
                            </div>
                            <p className="text-sm font-semibold text-teal-600 mt-1">
                                {jadwalPalingRamai ? `${jadwalPalingRamai.bookings_count} Pasien` : ''}
                            </p>
                        </div>
                    </div>

                    {/* History Table */}
                    <div className="bg-white shadow sm:rounded-lg overflow-hidden">
                        <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">Riwayat Kunjungan per Jadwal</h3>
                            <p className="mt-1 max-w-2xl text-sm text-gray-500">Daftar semua jadwal praktik beserta jumlah pasien yang mendaftar.</p>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Waktu</th>
                                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Kapasitas</th>
                                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Jumlah Pasien</th>
                                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Persentase Penuh</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {riwayatJadwal.map(jadwal => {
                                        const persentase = (jadwal.bookings_count / jadwal.quota) * 100;
                                        return (
                                            <tr key={jadwal.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{jadwal.date}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{jadwal.start_time} - {jadwal.end_time}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{jadwal.quota}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center font-bold">{jadwal.bookings_count}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    <div className="flex items-center justify-center">
                                                        <span className="mr-2 text-xs font-semibold">{persentase.toFixed(0)}%</span>
                                                        <div className="w-24 bg-gray-200 rounded-full h-2">
                                                            <div className={`h-2 rounded-full ${persentase >= 100 ? 'bg-red-500' : (persentase >= 50 ? 'bg-yellow-400' : 'bg-green-500')}`} style={{ width: `${Math.min(persentase, 100)}%` }}></div>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                            {riwayatJadwal.length === 0 && (
                                <div className="text-center py-8 text-gray-500">Belum ada data riwayat jadwal.</div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
