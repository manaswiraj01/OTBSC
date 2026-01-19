import { useEffect, useState } from "react";
import axios from "axios";
import {BASE_URL} from "../../utils/constants.js";


const ReviewSection = ({ placeId, user }) => {
  const [editingId, setEditingId] = useState(null);

  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const isLoggedIn = !!user;

  const fetchReviews = async () => {
    const res = await axios.get(
      `${BASE_URL}/public/reviews/${placeId}`
    );
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
      // UPDATE
      await axios.patch(
        `${BASE_URL}/reviews/${editingId}`,
        { rating, comment },
        { withCredentials: true }
      );
      setEditingId(null);
    } else {
      // CREATE
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
    alert(
      err.response?.data?.message ||
      "Something went wrong"
    );
  }
};


  const deleteReview = async (id) => {
    await axios.delete(
      `${BASE_URL}/reviews/${id}`,
      { withCredentials: true }
    );
    fetchReviews();
  };

  return (
    <div className="mt-14">
      <h2 className="text-2xl font-semibold mb-4">
        ⭐ Reviews
      </h2>

      {!isLoggedIn && (
       <div className="alert alert-info mb-4 inline-flex w-fit">
  Login to write a review
</div>

      )}

      {isLoggedIn && (
        <>
          <div className="flex gap-2 mb-4">
            {[1, 2, 3, 4, 5].map((s) => (
              <button
                key={s}
                onClick={() => setRating(s)}
                className={`text-2xl ${
                  s <= rating
                    ? "text-yellow-400"
                    : "text-gray-400"
                }`}
              >
                ★
              </button>
            ))}
          </div>

          <textarea
            className="textarea textarea-bordered w-full mb-3"
            placeholder="Write your experience..."
            value={comment}
            onChange={(e) =>
              setComment(e.target.value)
            }
          />

          <button
            className="btn btn-primary btn-sm"
            onClick={submitReview}
          >
            {editingId ? "Update Review" : "Submit Review"}

          </button>
        </>
      )}

      <div className="mt-6 space-y-3">
        {reviews.map((r) => (
          <div
            key={r._id}
            className="bg-base-200 p-4 rounded-lg"
          >
            <div className="flex justify-between">
              <span className="text-yellow-400">
                {"★".repeat(r.rating)}
              </span>

              {user?._id === r.user?._id && (
                <div>
                <button
                  className="btn btn-xs btn-error"
                  onClick={() =>
                    deleteReview(r._id)
                  }
                >
                  Delete
                </button>
               <button
  className="btn btn-xs btn-edit ml-4"
  onClick={() => {
    setRating(r.rating);
    setComment(r.comment);
    setEditingId(r._id);
  }}
>
  Edit
</button>

                </div>
              )}
            </div>

            <p className="text-sm mt-1">
              {r.comment}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              — {r.user?.name} |{" "}
              {new Date(
                r.createdAt
              ).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewSection;
