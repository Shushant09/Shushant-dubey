import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [pending, setPending] = useState([]);

  const fetchPending = async () => {
    const res = await axios.get("http://localhost:5000/api/admin/consultants/pending");
    setPending(res.data);
  };

  const approve = async (id) => {
    await axios.patch(`http://localhost:5000/api/admin/consultants/approve/${id}`);
    fetchPending();
  };

  const remove = async (id) => {
    await axios.delete(`http://localhost:5000/api/admin/consultants/delete/${id}`);
    fetchPending();
  };

  useEffect(() => {
    fetchPending();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      {pending.length === 0 ? (
        <p>No pending consultant approvals.</p>
      ) : (
        <ul className="space-y-4">
          {pending.map((c) => (
            <li key={c._id} className="p-4 bg-white shadow rounded">
              <h2 className="text-xl font-semibold">{c.name}</h2>
              <p className="text-sm text-blue-600">{c.field}</p>
              <p className="text-gray-700 mt-2">{c.bio}</p>
              <div className="mt-3 space-x-2">
                <button
                  onClick={() => approve(c._id)}
                  className="bg-green-500 text-white px-3 py-1 rounded"
                >
                  Approve
                </button>
                <button
                  onClick={() => remove(c._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
