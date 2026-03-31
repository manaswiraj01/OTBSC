import { useEffect, useState } from "react";
import axios from "axios";
import { Star, Trash2, Pencil } from "lucide-react";
import { BASE_URL } from "../../utils/constants.js";

const ReviewSection = ({ placeId, user }) => {
  const [editingId, setEditingId] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const isLoggedIn = !!user;

  const fetchReviews = async () => {
    const res = await axios.get(`${BASE_URL}/public/reviews/${placeId}`);
    setReviews(res?.data?.data || []);
  };

  useEffect(() => {
    fetchReviews();
  }, [placeId]);

  const submitReview = async () => {
    try {
      if (!rating || !comment.trim()) {
        return alert("Please add rating and comment");
      }

      if (editingId) {
        await axios.patch(
          `${BASE_URL}/reviews/${editingId}`,
          { rating, comment },
          { withCredentials: true }
        );
        setEditingId(null);
      } else {
        await axios.post(
          `${BASE_URL}/reviews/${placeId}`,
          { rating, comment },
          { withCredentials: true }
        );
      }

      setRating(0);
      setComment("");
      fetchReviews();
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  const deleteReview = async (id) => {
    await axios.delete(`${BASE_URL}/reviews/${id}`, {
      withCredentials: true,
    });
    fetchReviews();
  };

  return (
    <div className="mb-6 px-2 md:px-0">

      {/* HEADING */}
      <h2 className="text-xl md:text-2xl font-semibold mb-4 flex items-center gap-2">
        <Star className="fill-yellow-400 text-yellow-400" size={20} />
        Reviews
      </h2>

      {/* LOGIN ALERT */}
      {!isLoggedIn && (
        <div className="alert alert-info mb-4 inline-flex w-fit text-sm">
          Login to write a review
        </div>
      )}

      {/* ADD REVIEW */}
      {isLoggedIn && (
        <div className="mb-5">

          {/* STAR INPUT */}
          <div className="flex gap-2 mb-3">
            {[1, 2, 3, 4, 5].map((s) => (
              <button key={s} onClick={() => setRating(s)}>
                <Star
                  size={22}
                  className={`${
                    s <= rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-base-content/70"
                  }`}
                />
              </button>
            ))}
          </div>

          {/* TEXTAREA */}
          <textarea
            className="textarea text-base-content/90 textarea-bordered border border-base-content focus:outline-none  w-full mb-3 text-sm md:text-base"
            placeholder="Write your experience..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          {/* BUTTON */}
          <button
            className="btn btn-primary btn-sm md:btn-md w-full md:w-fit"
            onClick={submitReview}
          >
            {editingId ? "Update Review" : "Submit Review"}
          </button>
        </div>
      )}

      {/* REVIEWS LIST */}
      <div className="space-y-4">
        {reviews.map((r) => (
          <div
            key={r._id}
            className="bg-base-200 p-3 md:p-4 rounded-xl"
          >

            {/* ⭐ TOP ROW */}
            <div className="flex items-start justify-between mb-2">

              {/* STARS */}
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    size={14}
                    className={
                      s <= r.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>

              {/* ACTION BUTTONS */}
              {user?._id === r.user?._id && (
                <div className="flex gap-1 ml-2">

                  <button
                    className="btn btn-xs btn-error h-6 min-h-0 px-2"
                    onClick={() => deleteReview(r._id)}
                  >
                    <Trash2 size={12} />
                  </button>

                  <button
                    className="btn btn-xs btn-outline h-6 min-h-0 px-2"
                    onClick={() => {
                      setRating(r.rating);
                      setComment(r.comment);
                      setEditingId(r._id);
                    }}
                  >
                    <Pencil size={12} />
                  </button>

                </div>
              )}
            </div>

            {/* COMMENT */}
            <p className="text-sm mt-2 break-words">
              {r.comment}
            </p>

            {/* USER */}
            <p className="text-xs text-gray-500 mt-1">
              — {r.user?.name} |{" "}
              {new Date(r.createdAt).toLocaleDateString()}
            </p>

          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewSection;