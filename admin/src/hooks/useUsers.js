import { useEffect, useState } from "react";
import { deleteUserApi, fetchUsersApi } from "@/api/user.api";

const useUsers = ({ isLoaded, isSignedIn, getToken }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (!isLoaded || !isSignedIn) return;

        const token = await getToken();
        const res = await fetchUsersApi(token);

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

  const handleDeleteUser = async (userId) => {
    if (!userId) {
      console.error("No userId provided to delete");
      return;
    }
    try {
      const token = await getToken();

      await deleteUserApi(userId, token);

      setUsers((prev) => prev.filter((u) => u._id !== userId));
    } catch (err) {
      console.error(err);
      alert("Failed to delete user");
    }
  };

  return { users, loading, error, handleDeleteUser };
};

export default useUsers;
