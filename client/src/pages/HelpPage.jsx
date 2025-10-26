import React, { useState } from 'react';

const HelpPage = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    mobileNumber: '',
    fullName: '',
    emailId: '',
    bookingId: '',
    issueType: '',
    subIssueType: '',
    issueTitle: '',
    description: '',
    attachment: null
  });
  
  const issueTypes = [
    'Booking Issues',
    'Payment Problems',
    'Technical Support',
    'Cancellation',
    'Refund Request',
    'General Inquiry'
  ];

  const subIssueTypes = {
    'Booking Issues': ['Cannot make booking', 'Booking confirmation not received', 'Booking modification'],
    'Payment Problems': ['Payment failed', 'Double charge', 'Payment gateway error'],
    'Technical Support': ['Website not loading', 'Form not submitting', 'Login issues'],
    'Cancellation': ['Cancel booking', 'Partial cancellation', 'Emergency cancellation'],
    'Refund Request': ['Full refund', 'Partial refund', 'Refund status'],
    'General Inquiry': ['Tourist information', 'Package details', 'Contact information']
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (name === 'issueType') {
      setFormData(prev => ({
        ...prev,
        subIssueType: ''
      }));
    }
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      attachment: e.target.files[0]
    }));
  };

  const handleSubmit = () => {
    if (!formData.mobileNumber || !formData.fullName || !formData.emailId || 
        !formData.issueType || !formData.subIssueType || !formData.issueTitle || !formData.description) {
      alert('Please fill in all required fields');
      return;
    }
    
    console.log('Form Data Submitted:', formData);
    alert('Help request submitted successfully!');
    if (onClose) onClose();
  };

  return (
    <div data-theme="daisy" className="min-h-screen bg-base-200 p-4 flex items-center justify-center">
      
      
      <div className="card w-200 max-w-4xl mt-20 border border-gray-400 bg-base-100 rounded-2xl">
        <div className="card-body p-8">
          {/* Header */}
          <div className="flex justify-center items-center mb-6">
            <h1 className="text-3xl font-semibold text-base-content">Welcome Guest</h1>
            {onClose && (
              <button
                onClick={onClose}
                className="btn btn-ghost btn-sm btn-circle text-xl hover:bg-base-200"
              >
                ✕
              </button>
            )}
          </div>

          {/* Form Fields */}
          <div className="space-y-6 pl-4.5 pt-4.5">
            {/* Row 1: Mobile No & Full Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label pb-2">
                  <span className="label-text font-medium text-base-content">
                    Mobile No<span className="text-error ml-1">*</span>
                  </span>
                </label><br />
                <div className="join h-12">
                  <div className="bg-base-200 px-4 flex items-center justify-center rounded-l-lg border border-base-300 border-r-0 min-w-[60px]">
                    <span className="text-base-content/60 text-sm">+91</span>
                  </div>
                  <input
                    type="tel"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleInputChange}
                    className="input input-bordered flex-1 h-12 w-65 bg-base-200 border-l-0 rounded-l-none focus:outline-none focus:border-primary"
                    placeholder=""
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label pb-2">
                  <span className="label-text font-medium text-base-content">
                    Full Name<span className="text-error ml-1">*</span>
                  </span>
                </label><br />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="input input-bordered h-12 bg-base-200 text-base-content/60 focus:outline-none focus:border-primary"
                  placeholder="Full Name"
                />
              </div>
            </div>

            {/* Row 2: Email ID & Booking ID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label pb-2">
                  <span className="label-text font-medium text-base-content">Email ID</span>
                </label><br />
                <input
                  type="email"
                  name="emailId"
                  value={formData.emailId}
                  onChange={handleInputChange}
                  className="input input-bordered h-12 bg-base-200 text-base-content/60 focus:outline-none focus:border-primary"
                  placeholder="Enter Email ID"
                />
              </div>

              <div className="form-control">
                <label className="label pb-2">
                  <span className="label-text font-medium text-base-content">Booking ID</span>
                </label><br />
                <input
                  type="text"
                  name="bookingId"
                  value={formData.bookingId}
                  onChange={handleInputChange}
                  className="input input-bordered h-12 bg-base-200 text-base-content/60 focus:outline-none focus:border-primary"
                  placeholder="Enter Booking ID"
                />
              </div>
            </div>

            {/* Row 3: Issue Type & Issue Title */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label pb-2">
                  <span className="label-text font-medium text-base-content">
                    Issue Type<span className="text-error ml-1">*</span>
                  </span>
                </label><br />
                <select
                  name="issueType"
                  value={formData.issueType}
                  onChange={handleInputChange}
                  className="select select-bordered h-12 bg-base-200 text-base-content/60 focus:outline-none focus:border-primary"
                >
                  <option value="" className="text-base-content/60">select</option>
                  {issueTypes.map((type) => (
                    <option key={type} value={type} className="text-base-content">{type}</option>
                  ))}
                </select>
              </div>

              <div className="form-control">
                <label className="label pb-2">
                  <span className="label-text font-medium text-base-content">
                    Issue Title<span className="text-error ml-1">*</span>
                  </span>
                </label><br />
                <input
                  type="text"
                  name="issueTitle"
                  value={formData.issueTitle}
                  onChange={handleInputChange}
                  className="input input-bordered h-12 bg-base-200 text-base-content/60 focus:outline-none focus:border-primary"
                  placeholder="Enter Title"
                />
              </div>
            </div>

            {/* Row 4: Sub Issue Type & Attachment */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label pb-2">
                  <span className="label-text font-medium text-base-content">
                    Sub Issue Type<span className="text-error ml-1">*</span>
                  </span>
                </label>
                <select
                  name="subIssueType"
                  value={formData.subIssueType}
                  onChange={handleInputChange}
                  disabled={!formData.issueType}
                  className="select select-bordered h-12 bg-base-200 text-base-content/60 focus:outline-none focus:border-primary disabled:bg-base-300 disabled:text-base-content/40"
                >
                  <option value="" className="text-base-content/60">select</option>
                  {formData.issueType && subIssueTypes[formData.issueType]?.map((subType) => (
                    <option key={subType} value={subType} className="text-base-content">{subType}</option>
                  ))}
                </select>
              </div>

              <div className="form-control">
                <label className="label pb-2">
                  <span className="label-text font-medium text-base-content">Attachment</span>
                </label>
                <div className="relative">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="input input-bordered h-12 bg-base-200 flex items-center justify-between cursor-pointer hover:bg-base-300 transition-colors"
                  >
                    <span className="text-base-content/60">
                      {formData.attachment ? formData.attachment.name : 'Attach File'}
                    </span>
                    <svg className="w-5 h-5 text-base-content/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                    </svg>
                  </label>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="form-control">
              <label className="label pb-2">
                <span className="label-text font-medium text-base-content">Description</span>
              </label><br />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="textarea textarea-bordered bg-base-200 text-base-content/60 resize-none focus:outline-none focus:border-primary"
                placeholder="Description"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="form-control mt-8 flex justify-center">
            <button
              onClick={handleSubmit}
              className="btn text-white font-semibold text-lg h-14 w-175 rounded-lg"
              style={{
                backgroundColor: 'oklch(65% 0.241 354.308)',
                borderColor: '#e91e63'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#d81b60';
                e.target.style.borderColor = '#d81b60';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#e91e63';
                e.target.style.borderColor = '#e91e63';
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;