const ContactSection = ({ email, phone, address }) => {
  return (
    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-base-200 p-6 rounded-xl">
        <h3 className="text-xl font-semibold mb-2">
          📞 Contact
        </h3>
        <p>Email: {email}</p>
        <p>Phone: {phone}</p>
      </div>

      <div className="bg-base-200 p-6 rounded-xl">
        <h3 className="text-xl font-semibold mb-2">
          🗺 Location
        </h3>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            address
          )}`}
          target="_blank"
          rel="noreferrer"
          className="btn btn-outline btn-sm mt-2"
        >
          Open in Google Maps
        </a>
      </div>
    </div>
  );
};

export default ContactSection;
