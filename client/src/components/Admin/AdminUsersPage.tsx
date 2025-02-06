import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pencil, Trash2, UserPlus } from "lucide-react";

interface User {
  id: number;
  name: string;
  role: number; // Enum: 0-admin, 1-mentor, 2-mentee
  account_status: number; // Enum: 0-inactive, 1-active
}

const AdminUsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string>("");
  const [editUser, setEditUser] = useState<User | null>(null);
  const [deleteUser, setDeleteUser] = useState<User | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/api/v1/admin/users", {
        withCredentials: true,
      });
      setUsers(response.data);
    } catch (err) {
      setError("Failed to fetch users");
    }
  };

  const handleUpdate = async () => {
    if (!editUser) return;
    try {
      await axios.put(`/api/v1/admin/users/${editUser.id}`, editUser, {
        withCredentials: true,
      });
      fetchUsers();
      setEditUser(null);
    } catch (err) {
      setError("Failed to update user");
    }
  };

  const handleDelete = async () => {
    if (!deleteUser) return;
    try {
      await axios.delete(`/api/v1/admin/users/${deleteUser.id}`, {
        withCredentials: true,
      });
      fetchUsers();
      setDeleteUser(null);
    } catch (err) {
      setError("Failed to delete user");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <button className="px-4 py-2">
        <UserPlus className="text-green-500" />
      </button>
      {error && <p className="text-red-500">{error}</p>}
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Role</th>
            <th className="border px-4 py-2">Account Status</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border">
              <td className="border px-4 py-2">{user.id}</td>
              <td className="border px-4 py-2">{user.name}</td>
              <td className="border px-4 py-2">{user.role}</td>
              <td className="border px-4 py-2">{user.account_status}</td>
              <td className="border px-4 py-2 flex gap-2">
                <button onClick={() => setEditUser(user)}>
                  <Pencil className="text-blue-500" />
                </button>
                <button onClick={() => setDeleteUser(user)}>
                  <Trash2 className="text-red-500" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit User Modal */}
      {editUser && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-lg font-bold mb-4">Edit User</h2>
            <div className="mb-4">
              <label className="block mb-1">Name</label>
              <input
                type="text"
                value={editUser.name}
                onChange={(e) =>
                  setEditUser({ ...editUser, name: e.target.value })
                }
                className="border p-2 w-full rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Role</label>
              <select
                value={editUser.role}
                onChange={(e) =>
                  setEditUser({ ...editUser, role: Number(e.target.value) })
                }
                className="border p-2 w-full rounded"
              >
                <option value={0}>Admin</option>
                <option value={1}>Mentor</option>
                <option value={2}>Mentee</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-1">Account Status</label>
              <select
                value={editUser.account_status}
                onChange={(e) =>
                  setEditUser({
                    ...editUser,
                    account_status: Number(e.target.value),
                  })
                }
                className="border p-2 w-full rounded"
              >
                <option value={0}>Inactive</option>
                <option value={1}>Active</option>
              </select>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleUpdate}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
              <button
                onClick={() => setEditUser(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteUser && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
            <p>Are you sure you want to delete {deleteUser.name}?</p>
            <div className="flex gap-2 mt-4">
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
              <button
                onClick={() => setDeleteUser(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsersPage;
