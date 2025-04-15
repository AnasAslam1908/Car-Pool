import { useEffect, useState } from "react";
import axios from "axios";

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get("http://localhost:8081/admin/users", {
                withCredentials: true,
            });
            setUsers(response.data);
        } catch (err) {
            setError("Failed to fetch users.");
            autoClear(setError);
        }
    };

    const deleteUser = async (userId) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;

        try {
            await axios.delete(`http://localhost:8081/admin/delete/user/${userId}`, {
                withCredentials: true,
            });
            setUsers(users.filter((user) => user.user_id !== userId));
            setMessage("User deleted successfully.");
            autoClear(setMessage);
        } catch (err) {
            setError("Failed to delete user.");
            autoClear(setError);
        }
    };

    const autoClear = (setter) => {
        setTimeout(() => setter(null), 1500);
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Manage Users</h2>

            {error && (
                <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 border border-red-300">
                    {error}
                </div>
            )}
            {message && (
                <div className="bg-green-100 text-green-700 px-4 py-2 rounded mb-4 border border-green-300">
                    {message}
                </div>
            )}

            {users.length === 0 ? (
                <p className="text-gray-600">No users found.</p>
            ) : (
                <table className="table-auto w-full bg-white border border-gray-200 rounded shadow-md">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-2 border text-left">User ID</th>
                        <th className="px-4 py-2 border text-left">Name</th>
                        <th className="px-4 py-2 border text-left">Email</th>
                        <th className="px-4 py-2 border text-left">Role</th>
                        <th className="px-4 py-2 border text-left">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user) => (
                        <tr key={user.user_id} className="hover:bg-gray-50">
                            <td className="px-4 py-2 text-left border">{user.user_id}</td>
                            <td className="px-4 py-2 text-left border">{user.full_name}</td>
                            <td className="px-4 py-2 text-left border">{user.email}</td>
                            <td className="px-4 py-2 text-left border">{user.role}</td>
                            <td className="px-4 py-2 text-left border">
                                <button
                                    onClick={() => deleteUser(user.user_id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ManageUsers;
