import React, { useState } from 'react';

const HelpPage = () => {
  const [formData, setFormData] = useState({
    mobileNo: '',
    emailId: '',
    issueType: '',
    subIssueType: '',
    description: '',
    fullName: '',
    bookingId: '',
    issueTitle: '',
    attachment: null
  });

  const [showAlert, setShowAlert] = useState(false);

  const issueTypes = [
    'Booking Issues',
    'Payment Problems',
    'Technical Support',
    'Service Quality',
    'Cancellation/Refund',
    'Other'
  ];

  const subIssueTypes = {
    'Booking Issues': ['Room not available', 'Booking confirmation', 'Modification request', 'Double booking'],
    'Payment Problems': ['Payment failed', 'Refund delay', 'Wrong amount charged', 'Payment gateway error'],
    'Technical Support': ['Website not loading', 'Login issues', 'App crashes', 'Feature not working'],
    'Service Quality': ['Poor service', 'Cleanliness issues', 'Staff behavior', 'Amenities problem'],
    'Cancellation/Refund': ['Cancellation policy', 'Refund status', 'Partial refund', 'Processing delay'],
    'Other': ['General inquiry', 'Feedback', 'Suggestion', 'Complaint']
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'attachment') {
      setFormData(prev => ({
        ...prev,
        [name]: files[0] || null
      }));
    } else if (name === 'issueType') {
      setFormData(prev => ({
        ...prev,
        [name]: value,
        subIssueType: ''
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = () => {
    const requiredFields = ['mobileNo', 'issueType', 'subIssueType', 'fullName', 'issueTitle'];
    const missingFields = requiredFields.filter(field => !formData[field]);

    if (missingFields.length > 0) {
      alert('Please fill in all required fields marked with *');
      return;
    }

    if (!/^\d{10}$/.test(formData.mobileNo)) {
      alert('Please enter a valid 10-digit mobile number');
      return;
    }

    setShowAlert(true);

    setFormData({
      mobileNo: '',
      emailId: '',
      issueType: '',
      subIssueType: '',
      description: '',
      fullName: '',
      bookingId: '',
      issueTitle: '',
      attachment: null
    });

    setTimeout(() => setShowAlert(false), 4000);
  };

  return (<div  >
    <div className="min-h-screen bg-base-200 pt-15">

      {/* Alert */}
      {showAlert && (

        <div className="px-6 pt-6 " >
          <div className="alert alert-success shadow-lg">
            <svg className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h3 className="font-bold">Success!</h3>
              <div className="text-xs">Your support request has been submitted successfully. We'll get back to you soon!</div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="p-6" style={{ paddingLeft: '400px', paddingRight: '400px', backgroundColor: 'transparent' }}>
        {/* Header Section */}
        <div className="bg-base-100 rounded-lg shadow-lg p-8 mb-6 ">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-base-content mb-2">Welcome Guest</h1>
            <p className="text-base-content opacity-70 text-lg">Please fill out the form below to submit your support request</p>
            <div className="divider"></div>
          </div>
        </div>

        {/* Form Section */}
        <div className="bg-base-100 rounded-lg shadow-lg p-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Mobile Number */}
              <div className="form-control w-full">
                <label className="label pb-1.5">
                  <span className="label-text font-semibold text-base-content">Mobile No <span className="text-error">*</span></span>
                </label>
                <input
                  type="tel"
                  name="mobileNo"
                  value={formData.mobileNo}
                  onChange={handleChange}
                  placeholder="Enter 10-digit mobile number"
                  className="input input-bordered input-primary w-full"
                  maxLength="10"
                />
              </div>

              {/* Email ID */}
              <div className="form-control w-full">
                <label className="label pb-1.5">
                  <span className="label-text font-semibold text-base-content">Email ID</span>
                </label>
                <input
                  type="email"
                  name="emailId"
                  value={formData.emailId}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  className="input input-bordered input-primary w-full"
                />
              </div>

              {/* Issue Type */}
              <div className="form-control w-full">
                <label className="label pb-1.5">
                  <span className="label-text font-semibold text-base-content">Issue Type <span className="text-error">*</span></span>
                </label>
                <select
                  name="issueType"
                  value={formData.issueType}
                  onChange={handleChange}
                  className="select select-bordered select-primary w-full"
                >
                  <option value="">Select issue type</option>
                  {issueTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>



              {/* Full Name */}
              <div className="form-control w-full">
                <label className="label pb-1.5">
                  <span className="label-text font-semibold text-base-content">Full Name <span className="text-error">*</span></span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="input input-bordered input-primary w-full"
                />
              </div>

              {/* Description */}
              <div className="form-control w-full">
                <label className="label pr-1.5">
                  <span className="label-text font-semibold text-base-content">Description</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="textarea textarea-bordered textarea-primary h-32"
                  placeholder="Please provide detailed information about your issue..."
                ></textarea>

              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Booking ID */}
              <div className="form-control w-full">
                <label className="label pb-1.5">
                  <span className="label-text font-semibold text-base-content">Booking ID</span>
                </label>
                <input
                  type="text"
                  name="bookingId"
                  value={formData.bookingId}
                  onChange={handleChange}
                  placeholder="Enter booking ID (if applicable)"
                  className="input input-bordered input-primary w-full"
                />
              </div>

              {/* Issue Title */}
              <div className="form-control w-full">
                <label className="label pb-1.5">
                  <span className="label-text font-semibold text-base-content">Issue Title <span className="text-error">*</span></span>
                </label>
                <input
                  type="text"
                  name="issueTitle"
                  value={formData.issueTitle}
                  onChange={handleChange}
                  placeholder="Brief title describing your issue"
                  className="input input-bordered input-primary w-full"
                />
              </div>
              {/* Sub Issue Type */}
              <div className="form-control w-full">
                <label className="label pb-1.5">
                  <span className="label-text font-semibold text-base-content">Sub Issue Type <span className="text-error">*</span></span>
                </label>
                <select
                  name="subIssueType"
                  value={formData.subIssueType}
                  onChange={handleChange}
                  className="select select-bordered select-primary w-full"
                  disabled={!formData.issueType}
                >
                  <option value="">Select sub issue type</option>
                  {formData.issueType && subIssueTypes[formData.issueType]?.map(subType => (
                    <option key={subType} value={subType}>{subType}</option>
                  ))}
                </select>
              </div>




              {/* Attachment */}
              <div className="form-control w-full ">
                <label className="label pb-1.5">
                  <span className="label-text font-semibold text-base-content ">Attachment</span>
                </label>
                <input
                  type="file"
                  name="attachment"
                  onChange={handleChange}
                  className="file-input file-input-bordered file-input-primary w-full "
                  accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                />
                <label className="label ">
                  <span className="label-text-alt text-base-content opacity-70">Supported formats: JPG, PNG, PDF,</span></label>
                <label className="label">
                  <span> DOC, DOCX (Max 10MB)</span>
                </label>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="form-control mt-8">
            <button
              onClick={handleSubmit}
              className="btn btn-lg w-full lg:w-auto lg:px-12 text-white bg-[oklch(65%_0.241_354.308)] hover:bg-[oklch(70%_0.241_354.308)]"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              Submit Support Request
            </button>
          </div>


          {/* Required Fields Notice */}
          <div className="alert alert-info mt-6">
            <svg className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm">Fields marked with <span className="text-error font-bold">*</span> are required</span>
          </div>
        </div>
      </div>

    
    </div></div>
  );
};

export default HelpPage;