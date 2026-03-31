import { useEffect, useState } from "react";

const UserAvatar = ({ user, size = "w-10 h-10 text-sm" }) => {
  const [imgError, setImgError] = useState(false);

  const firstLetter = user?.name?.trim()?.charAt(0)?.toUpperCase() || "U";

  useEffect(() => {
    setImgError(false);
  }, [user?.photoUrl]);

  if (user?.photoUrl && !imgError) {
    return (
      <img
        src={user.photoUrl}
        alt={user?.name || "User"}
        className={`${size} rounded-full object-cover border border-base-300 shrink-0`}
        onError={() => setImgError(true)}
      />
    );
  }

  return (
    <div
      className={`${size} rounded-full bg-primary text-primary-content flex items-center justify-center font-bold border border-base-300 shrink-0`}
      title={user?.name || "User"}
    >
      {firstLetter}
    </div>
  );
};

export default UserAvatar;