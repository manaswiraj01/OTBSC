import { useEffect, useState } from "react";
import { deleteUserApi, fetchUsersApi } from "@/api/user.api";

const useUsers = ({
  isLoaded,
  isSignedIn,
  getToken,
  page,
  limit
}) => {

  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    const fetchUsers = async () => {

      try {

        if (!isLoaded || !isSignedIn) return;

        setLoading(true);

        const token = await getToken();

        const res = await fetchUsersApi(token, page, limit);

        setUsers(res.data.users || []);
        setTotal(res.data.total || 0);

      } catch (err) {

        console.error(err);
        setError("Failed to fetch users");

      } finally {

        setLoading(false);

      }

    };

    fetchUsers();

  }, [isLoaded, isSignedIn, getToken, page, limit]);


  const handleDeleteUser = async (userId) => {

    if (!userId) {
      console.error("No userId provided to delete");
      return;
    }

    try {

      const token = await getToken();

      await deleteUserApi(userId, token);

      // update UI instantly
      setUsers((prev) => prev.filter((u) => u._id !== userId));
      setTotal((prev) => prev - 1);

    } catch (err) {

      console.error(err);
      alert("Failed to delete user");

    }

  };


  return {
    users,
    total,
    loading,
    error,
    handleDeleteUser
  };

};

export default useUsers;