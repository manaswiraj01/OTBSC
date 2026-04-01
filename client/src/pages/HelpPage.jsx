import { useState, useRef } from "react";
import axios from "axios";
import { BASE_URL } from "@/utils/constants";

export default function HelpPage() {
  const [formData, setFormData] = useState({
    mobile: "",
    bookingId: "",
    issueType: "",
    subIssueType: "",
    title: "",
    description: "",
  });
  const fileInputRef = useRef(null);

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();

      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      if (file) {
        data.append("attachment", file);
      }

      await axios.post(`${BASE_URL}/help`, data, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 2500);

      setFormData({
        mobile: "",
        bookingId: "",
        issueType: "",
        subIssueType: "",
        title: "",
        description: "",
      });

      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

    } catch (error) {
      console.error(error);
      alert("Failed to send request");
    }

    setLoading(false);
  };

  // 🎨 DaisyUI Clean Style


  const selectStyle =
    "select select-bordered bg-base-100 placeholder:text-base-content/70 " +
    "hover:border-pink-500 focus:border-pink-500 " +
    "focus:outline-none focus:ring-0 focus:ring-transparent " +
    "focus:shadow-none transition-all duration-200 w-full rounded-xl";

  const inputStyle =
    "input input-bordered bg-base-100 placeholder:text-base-content/70  " +
    "hover:border-pink-500 focus:border-pink-500 " +
    "focus:outline-none focus:ring-0 focus:ring-transparent focus:shadow-none " +
    "transition-all duration-200 w-full rounded-xl";

  const textareaStyle =
    "textarea textarea-bordered bg-base-100 placeholder:text-base-content/70  " +
    "hover:border-pink-500 focus:border-pink-500 " +
    "focus:outline-none focus:ring-0 focus:ring-transparent focus:shadow-none " +
    "transition-all duration-200 w-full rounded-xl";

  const fileStyle =
    "file-input file-input-bordered  bg-base-100 placeholder:text-base-content/70 " +
    "hover:border-pink-500 focus:border-pink-500 focus:outline-none " +
    "transition-all duration-200 w-full rounded-xl";

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4 sm:p-6">

      {/* Small Floating Alert */}
      {showAlert && (
        <div className="fixed inset-0 flex items-start justify-center pt-6 z-50">
          <div className="bg-pink-500 text-white px-6 py-3 rounded-lg shadow-lg text-sm animate-fade-in">
            Form submitted successfully ✅
          </div>
        </div>
      )}

      <div className="w-full max-w-5xl bg-base-100 shadow-2xl rounded-2xl p-6 sm:p-10">

        <h1 className="text-3xl font-bold text-center mb-8">
          Need <span className="text-pink-500">Help?</span>
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >

          {/* Mobile */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Mobile No *</span>
            </label>
            <input
              type="number"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              required
              placeholder="+91"
              className={inputStyle}
            />
          </div>

          {/* Booking ID */ }
           <div className="form-control">
            <label className="label">
              <span className="label-text">Booking ID</span>
            </label>
            <input
              type="text"
              name="bookingId"
              value={formData.bookingId}
              onChange={handleChange}
              placeholder="Enter Booking ID"
              className={inputStyle}
            />
          </div>

          {/* Issue Type */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Issue Type *</span>
            </label>
            <select
              name="issueType"
              value={formData.issueType}
              onChange={handleChange}
              required
              className={selectStyle}
            >
              <option value="">Select Issue</option>
              <option>Booking Issues</option>
              <option>Payment Problems</option>
              <option>Technical Support</option>
              <option>Cancellation</option>
              <option>Refund Request</option>
              <option>General Inquiry</option>
            </select>
          </div>

          {/* Sub Issue */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Sub Issue Type *</span>
            </label>
            <select
              name="subIssueType"
              value={formData.subIssueType}
              onChange={handleChange}
              required
              className={selectStyle}
            >
              <option value="">Select Sub Issue</option>
              <option>Cannot make booking</option>
              <option>Booking confirmation not received</option>
              <option>Booking modification</option>
            </select>
          </div>

          {/* Title */}
          <div className="form-control md:col-span-2">
            <label className="label">
              <span className="label-text">Issue Title *</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Enter Issue Title"
              className={inputStyle}
            />
          </div>

          {/* Attachment */}
          <div className="form-control md:col-span-2">
            <label className="label">
              <span className="label-text">Attachment (Image/Video)</span>
            </label>
            <input
              type="file"
              accept="image/*,video/*"
              ref={fileInputRef}
              onChange={(e) => setFile(e.target.files[0])}
              className={fileStyle}
            />
          </div>

          {/* Description */}
          <div className="form-control md:col-span-2">
            <label className="label">
              <span className="label-text">Description *</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="Describe your issue..."
              className={`${textareaStyle} h-32 resize-none`}
            ></textarea>
          </div>

          {/* Submit */}
          <div className="md:col-span-2 flex justify-end mt-4">
            <button
              type="submit"
              disabled={loading}
              className="btn bg-pink-500 hover:bg-pink-600 text-white border-none px-8 rounded-xl disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Submitting..." : "Submit Request"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}