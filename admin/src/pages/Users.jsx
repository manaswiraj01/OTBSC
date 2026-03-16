import { useAuth } from "@clerk/clerk-react";
import { SearchForm } from "../components/search-form.jsx";
import { Button } from "@/components/ui/button.jsx";
import useUsers from "@/hooks/useUsers.js";
import { useState } from "react";
import DeleteUserModal from "@/components/DeleteUserModal";
import Pagination from "@/components/Pagination";

const UsersPage = () => {

  const { getToken, isLoaded, isSignedIn } = useAuth();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const {
    users,
    total,
    loading,
    error,
    handleDeleteUser
  } = useUsers({
    isLoaded,
    isSignedIn,
    getToken,
    page,
    limit
  });

  const [deleteUserId, setDeleteUserId] = useState(null);

  if (!isLoaded) return null;
  if (!isSignedIn) return <p>Please sign in</p>;
  if (loading) return <p>Loading users...</p>;
  if (error) return <p>{error}</p>;

  return (

    <div className="p-6">

      {/* ===== STATS ===== */}
      <div className="max-w-7xl mx-auto mb-8">

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">

          {/* TOTAL USERS */}
          <div className="rounded-xl sm:rounded-2xl p-4 sm:p-6 min-h-24 sm:min-h-30 bg-linear-to-r from-blue-500 to-blue-700 text-white shadow flex items-center justify-between">
            <div>
              <p className="text-sm sm:text-base font-medium opacity-90">
                Total Users
              </p>

              <h2 className="text-2xl sm:text-3xl font-bold mt-1">
                {total}
              </h2>

            </div>
          </div>

          {/* USERS THIS MONTH */}
          <div className="rounded-xl sm:rounded-2xl p-4 sm:p-6 min-h-24 sm:min-h-30 bg-linear-to-r from-orange-500 to-orange-700 text-white shadow flex items-center justify-between">
            <div>

              <p className="text-sm sm:text-base font-medium opacity-90">
                Users Joined This Month
              </p>

              <h2 className="text-2xl sm:text-3xl font-bold mt-1">

                {users.filter(
                  (user) =>
                    new Date(user.createdAt) >
                    new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
                ).length}

              </h2>

            </div>
          </div>

        </div>

      </div>


      {/* ================= USERS TABLE ================= */}

      <div className="max-w-7xl mx-auto">

        <div className="bg-gray-50 dark:bg-zinc-900/60 rounded-2xl shadow border border-white/5">

          {/* TOP BAR */}

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4">

            <SearchForm />

            <button className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium flex items-center gap-2">
              + Create user
            </button>

          </div>


          {/* HEADER */}

          <div className="hidden lg:grid lg:grid-cols-[2fr_1fr_1fr_1fr_1fr_auto] px-6 py-3 text-sm text-zinc-400 border-t border-b border-white/5">

            <span>User</span>
            <span>Phone</span>
            <span>Gender</span>
            <span>Country</span>
            <span>Joined</span>
            <span>Action</span>

          </div>


          {/* USERS LIST */}

          <div className="divide-y divide-white/5">

            {users.map((user) => (

              <div
                key={user._id}
                className="flex flex-col lg:grid lg:grid-cols-[2fr_1fr_1fr_1fr_1fr_auto] pl-5 py-4 transition"
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

                    <p className="text-white font-medium">
                      {user.name}
                    </p>

                    <p className="text-sm text-zinc-400">
                      {user.email}
                    </p>

                  </div>

                </div>


                {/* PHONE */}

                <div className="text-sm text-zinc-300 lg:flex lg:items-center mx-2">
                  {user.phoneNo || "—"}
                </div>


                {/* GENDER */}

                <div className="text-sm text-zinc-300 lg:flex lg:items-center mx-4">
                  {user.gender || "—"}
                </div>


                {/* COUNTRY */}

                <div className="text-sm text-zinc-300 lg:flex lg:items-center mx-5">
                  {user.country || "—"}
                </div>


                {/* JOINED */}

                <div className="text-sm text-zinc-300 lg:flex lg:items-center mx-5">
                  {new Date(user.createdAt).toLocaleDateString()}
                </div>


                {/* ACTION */}

                <div className="flex justify-end items-center mx-4">

                  <Button
                    className="p-2 rounded-md transition bg-red-600 hover:bg-destructive/90 text-white"
                    onClick={() => setDeleteUserId(user._id)}
                  >
                    Delete
                  </Button>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>


      {/* PAGINATION */}

      <Pagination
        page={page}
        setPage={setPage}
        limit={limit}
        setLimit={setLimit}
        total={total}
      />


      {/* DELETE MODAL */}

      <DeleteUserModal
        open={!!deleteUserId}
        onClose={() => setDeleteUserId(null)}
        onConfirm={async () => {
          await handleDeleteUser(deleteUserId);
          setDeleteUserId(null);
        }}
      />

    </div>

  );
};

export default UsersPage;