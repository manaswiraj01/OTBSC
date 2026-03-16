import React, { useEffect } from "react";

const CancelBookingModal = ({ booking, onClose, onConfirm }) => {

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  if (!booking) return null;

  return (

    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
    >

      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm sm:max-w-md bg-base-100 rounded-xl shadow-xl p-5 sm:p-6"
      >

        {/* TITLE */}

        <h2 className="text-lg sm:text-xl font-semibold text-base-content mb-3">
          Cancel Booking
        </h2>

        {/* MESSAGE */}

        <p className="text-sm sm:text-base text-base-content/80 leading-relaxed mb-6">

          Are you sure you want to cancel your booking for

          <span className="font-semibold text-base-content">
            {" "}{booking.placeId?.name}
          </span>

          ?

        </p>

        {/* BUTTONS */}

        <div className="flex gap-3">

          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 rounded-md border border-base-300 hover:bg-base-200 transition cursor-pointer"
          >
            Close
          </button>

          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2 rounded-md bg-red-700 text-white hover:opacity-90 transition cursor-pointer"
          >
            Cancel
          </button>

        </div>

      </div>

    </div>

  );
};

export default CancelBookingModal;