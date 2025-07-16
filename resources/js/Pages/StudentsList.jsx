import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

const fetchStudents = async () => {
    const res = await axios.get("/api/students");
    return res.data;
};

export default function StudentsList({ auth }) {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['students'],
        queryFn: fetchStudents,
    });

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading students.</div>;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Student API List</h2>}
        >
            <Head title="Students List" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 bg-white p-6 shadow rounded">
                    <ul>
                        {data.map(s => (
                            <li key={s.student_id}>
                                <strong>{s.first_name} {s.last_name}</strong> - {s.department} - {s.email}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
