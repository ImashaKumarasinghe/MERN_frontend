import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function UsersPage() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const token = localStorage.getItem("token");
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/users/all`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setUsers(res.data.users);
        } catch (err) {
            console.error(err);
            toast.error("Failed to fetch users");
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Registered Users</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-xl shadow-md">
                    <thead className="bg-[var(--color-accent)] text-white">
                        <tr>
                            <th className="py-2 px-4">#</th>
                            <th className="py-2 px-4">First Name</th>
                            <th className="py-2 px-4">Last Name</th>
                            <th className="py-2 px-4">Email</th>
                            <th className="py-2 px-4">Role</th>
                            <th className="py-2 px-4">Blocked</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, idx) => (
                            <tr
                                key={user._id}
                                className="text-center border-b hover:bg-gray-100"
                            >
                                <td className="py-2 px-4">{idx + 1}</td>
                                <td className="py-2 px-4">{user.firstname}</td>
                                <td className="py-2 px-4">{user.lastname}</td>
                                <td className="py-2 px-4">{user.email}</td>
                                <td className="py-2 px-4">{user.role}</td>
                                <td className="py-2 px-4">{user.isBlocked ? "Yes" : "No"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
