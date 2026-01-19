import { useAuth } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL_ADMIN } from "../lib/constants.js";
import { SearchForm } from "../components/search-form.jsx";
import { Button } from "@/components/ui/button.jsx";


const UsersPage = () => {
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (!isLoaded || !isSignedIn) return;

        const token = await getToken();

        const res = await axios.get(
          BASE_URL_ADMIN + "/users",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );


        setUsers(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [isLoaded, isSignedIn, getToken]);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-6">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">

          {/* ===== TOTAL USERS ===== */}
          <div
            className="
        rounded-xl sm:rounded-2xl
        p-4 sm:p-6
        min-h-24 sm:min-h-30
        bg-blue-600 
        text-white
        shadow
        flex items-center justify-between
      "
          >
            <div>
              <p className="text-sm sm:text-base font-medium opacity-90">
                Total Users
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold mt-1">
                {users.length}
              </h2>
            </div>
          </div>

          {/* ===== USERS THIS MONTH ===== */}
          <div
            className="
        rounded-xl sm:rounded-2xl
        p-4 sm:p-6
        min-h-24 sm:min-h-30
        bg-orange-600 
        text-white
        shadow
        flex items-center justify-between
      "
          >
            <div>
              <p className="text-sm sm:text-base font-medium opacity-90">
                Users Joined This Month
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold mt-1">
                {
                  users.filter(
                    (user) =>
                      new Date(user.createdAt) >
                      new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
                  ).length
                }
              </h2>
            </div>
          </div>

        </div>
      </div>

      {/* ================= USERS LIST ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-50 dark:bg-zinc-900/60 rounded-2xl shadow border border-white/5">

          {/* ===== TOP BAR ===== */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4">

            <SearchForm />

            {/* Create User */}
            <button className="
        px-4 py-2 rounded-lg
        bg-indigo-600 hover:bg-indigo-500
        text-white font-medium
        flex items-center gap-2
      ">
              + Create user
            </button>
          </div>

          <div
            className="
    hidden lg:grid
    lg:grid-cols-[2fr_1fr_1fr_1fr_1fr_auto]
    px-6 py-3
    text-sm text-zinc-400
    border-t border-b border-white/5
  "
          >
            <span>User</span>
            <span>Phone</span>
            <span>Gender</span>
            <span>Country</span>
            <span>Joined</span>
            <span className="text-right">Action</span>
          </div>



          <div className="divide-y divide-white/5">
            {users.map((user) => (
              <div
                key={user._id}
                className="
        flex flex-col gap-4
        lg:grid lg:grid-cols-[2fr_1fr_1fr_1fr_1fr_auto]
        px-4 lg:px-6 py-4
        hover:bg-white/5 transition
      "
              >
                {/* USER */}
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden bg-indigo-600 flex items-center justify-center text-white font-semibold">
                    {user.photoUrl ? (
                      <img
                        src={user.photoUrl}
                        alt={user.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    ) : (
                      <span className="text-lg">
                        {user.name?.[0]?.toUpperCase()}
                      </span>
                    )}
                  </div>

                  <div>
                    <p className="text-white font-medium">{user.name}</p>
                    <p className="text-sm text-zinc-400">{user.email}</p>
                  </div>
                </div>

                {/* PHONE */}
                <div className="text-sm text-zinc-300 lg:flex lg:items-center">
                  {user.phoneNo || "—"}
                </div>

                {/* GENDER */}
                <div className="text-sm text-zinc-300 lg:flex lg:items-center">
                  {user.gender || "—"}
                </div>

                {/* COUNTRY */}
                <div className="text-sm text-zinc-300 lg:flex lg:items-center">
                  {user.country || "—"}
                </div>

                {/* JOINED */}
                <div className="text-sm text-zinc-300 lg:flex lg:items-center">
                  {new Date(user.createdAt).toLocaleDateString()}
                </div>

                {/* ACTION */}
                <div className="flex justify-end items-center">
                  <Button variant="destructive"
                    onClick={() => handleDeleteUser(user._id)}
                    className="
            p-2 rounded-md
            transition
          "
                    title="Delete user"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* ===== PAGINATION ===== */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-4 lg:px-6 py-4 text-sm text-zinc-400">

            {/* LEFT */}
            <div className="flex items-center gap-4">
              <span>
                1–{users.length} of {users.length}
              </span>

              <div className="flex items-center gap-2">
                <span>Results per page</span>

                <select
                  className="
          bg-zinc-800 text-white
          border border-white/10
          rounded-md px-2 py-1
          focus:outline-none
        "
                  defaultValue={10}
                >
                  <option value={10}>10</option>
                  <option value={15}>15</option>
                  <option value={20}>20</option>
                  <option value={100}>100</option>
                </select>
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-2">
              <button className="w-6 p-1 rounded bg-zinc-800 border border-white/10 text-zinc-500">
                ⟪
              </button>
              <button className="w-6 p-1 rounded bg-zinc-800 border border-white/10 text-zinc-500">
                ‹
              </button>

              <span className="px-2">1 / 1</span>

              <button className="w-6 p-1 rounded bg-zinc-800 border border-white/10 text-zinc-500">
                ›
              </button>
              <button className="w-6 p-1 rounded bg-zinc-800 border border-white/10 text-zinc-500">
                ⟫
              </button>
            </div>
          </div>

        </div>
      </div>


      {/* ===== PAGINATION (next step) ===== */}
    </div>
  );
};

export default UsersPage;
