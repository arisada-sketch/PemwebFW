import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Booking({ auth, schedules, patients, errors: serverErrors }) {
    const { data, setData, post, processing, errors } = useForm({
        schedule_id: '',
        is_for_other: false,
        patient_id: '',
        new_patient_name: '',
        new_patient_nik: '',
        new_patient_dob: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('patient.booking.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Booking Jadwal Praktik</h2>}
        >
            <Head title="Booking Jadwal" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg mb-6">
                        <Link href={route('patient.dashboard')} className="text-indigo-600 hover:text-indigo-900 mb-4 inline-block">&larr; Kembali ke Dashboard</Link>
                        
                        <header className="mb-4">
                            <h2 className="text-lg font-medium text-gray-900">Pilih Jadwal yang Tersedia</h2>
                        </header>

                        {serverErrors.message && (
                            <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                                {serverErrors.message}
                            </div>
                        )}

                        <form onSubmit={submit} className="space-y-6 max-w-2xl">
                            <div>
                                <label className="block font-medium text-sm text-gray-700 mb-2">Pilih Jadwal</label>
                                <div className="space-y-3">
                                    {schedules.map(schedule => (
                                        <label key={schedule.id} className="flex items-center p-3 border rounded cursor-pointer hover:bg-gray-50">
                                            <input
                                                type="radio"
                                                name="schedule_id"
                                                value={schedule.id}
                                                checked={data.schedule_id == schedule.id}
                                                onChange={(e) => setData('schedule_id', e.target.value)}
                                                className="text-indigo-600 focus:ring-indigo-500"
                                                required
                                            />
                                            <div className="ml-3">
                                                <div className="font-semibold text-indigo-700 mb-1">{schedule.doctor?.name} <span className="text-sm font-normal text-gray-500">({schedule.doctor?.specialization})</span></div>
                                                <div className="font-medium">{schedule.date}</div>
                                                <div className="text-sm text-gray-600">{schedule.start_time} - {schedule.end_time}</div>
                                                <div className="text-xs text-gray-500 mt-1">Sisa Kuota: {schedule.quota - schedule.bookings_count}</div>
                                            </div>
                                        </label>
                                    ))}
                                    {schedules.length === 0 && (
                                        <div className="text-gray-500">Saat ini tidak ada jadwal yang tersedia.</div>
                                    )}
                                </div>
                                {errors.schedule_id && <div className="text-red-500 text-sm mt-1">{errors.schedule_id}</div>}
                            </div>

                            <div className="bg-gray-50 p-4 rounded-md border">
                                <label className="block font-medium text-md text-gray-800 mb-3">Untuk siapa pendaftaran ini?</label>
                                
                                <div className="flex gap-4 mb-4">
                                    <label className="flex items-center">
                                        <input type="radio" name="is_for_other" checked={data.is_for_other === false} onChange={() => setData('is_for_other', false)} className="mr-2" />
                                        Diri Sendiri ({auth.user.name})
                                    </label>
                                    <label className="flex items-center">
                                        <input type="radio" name="is_for_other" checked={data.is_for_other === true} onChange={() => setData('is_for_other', true)} className="mr-2" />
                                        Orang Lain / Keluarga
                                    </label>
                                </div>

                                {data.is_for_other && (
                                    <div className="mt-4 p-4 border rounded bg-white space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Pilih Profil Pasien</label>
                                            <select 
                                                className="w-full border-gray-300 rounded-md shadow-sm"
                                                value={data.patient_id}
                                                onChange={(e) => setData('patient_id', e.target.value)}
                                            >
                                                <option value="">-- Buat Profil Pasien Baru --</option>
                                                {patients && patients.map(p => (
                                                    <option key={p.id} value={p.id}>{p.name} ({p.no_rm})</option>
                                                ))}
                                            </select>
                                        </div>

                                        {!data.patient_id && (
                                            <div className="space-y-3 pt-3 border-t">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Nama Pasien</label>
                                                    <input type="text" className="w-full border-gray-300 rounded-md shadow-sm" value={data.new_patient_name} onChange={e => setData('new_patient_name', e.target.value)} required />
                                                    {errors.new_patient_name && <div className="text-red-500 text-xs mt-1">{errors.new_patient_name}</div>}
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">NIK (Opsional)</label>
                                                    <input type="text" className="w-full border-gray-300 rounded-md shadow-sm" value={data.new_patient_nik} onChange={e => setData('new_patient_nik', e.target.value)} maxLength="16" />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Tanggal Lahir</label>
                                                    <input type="date" className="w-full border-gray-300 rounded-md shadow-sm" value={data.new_patient_dob} onChange={e => setData('new_patient_dob', e.target.value)} required />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={processing || schedules.length === 0}
                                className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 focus:bg-indigo-700 disabled:opacity-50 transition ease-in-out duration-150"
                            >
                                Konfirmasi Booking
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
