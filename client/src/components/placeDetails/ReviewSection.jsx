import { useEffect, useState } from "react";
import axios from "axios";
import {BASE_URL} from "../../utils/constants.js";


const ReviewSection = ({ placeId, user }) => {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const isLoggedIn = !!user;

  const fetchReviews = async () => {
    const res = await axios.get(
      `${BASE_URL}/public/reviews/${placeId}`
    );
    setReviews(res?.data?.data);
  };

  useEffect(() => {
    fetchReviews();
  }, [placeId]);

  const submitReview = async () => {
    await axios.post(
      `${BASE_URL}/reviews/${placeId}`,
      { rating, comment },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }
    );
    setRating(0);
    setComment("");
    fetchReviews();
  };

  const deleteReview = async (id) => {
    await axios.delete(
      `${BASE_URL}/reviews/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }
    );
    fetchReviews();
  };

  return (
    <div className="mt-14">
      <h2 className="text-2xl font-semibold mb-4">
        ⭐ Reviews
      </h2>

      {!isLoggedIn && (
        <div className="alert alert-info mb-4">
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
            Submit Review
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

              {user?.id === r.user?._id && (
                <button
                  className="btn btn-xs btn-error"
                  onClick={() =>
                    deleteReview(r._id)
                  }
                >
                  Delete
                </button>
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
