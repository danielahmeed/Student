import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function TasksDashboard({ auth }) {
    const { data: tasks, isLoading, error } = useQuery({
        queryKey: ['tasks'],
        queryFn: async () => (await axios.get('/api/tasks')).data,
    });

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Tasks</h2>}>
            <Head title="Tasks Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {isLoading && <p>Loading...</p>}
                            {error && <p>Error loading tasks.</p>}
                            {tasks && tasks.map((task) => (
                                <div key={task.id} className="border-b py-2">
                                    <h3 className="text-lg font-bold">{task.title}</h3>
                                    <p>{task.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
