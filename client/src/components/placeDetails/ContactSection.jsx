import { Mail, Phone, MapPin } from "lucide-react";

const ContactSection = ({ email, phone, address }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-5 mt-5 px-2 md:px-0">
      
      <div className="bg-base-200 p-4 md:p-6 rounded-xl">
        <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 flex items-center gap-2">
          <Phone size={20} /> Contact
        </h3>

        <p className="flex items-center gap-2 mb-2 text-sm md:text-base break-all">
          <Mail size={16} /> {email}
        </p>

        <p className="flex items-center gap-2 text-sm md:text-base">
          <Phone size={16} /> {phone}
        </p>
      </div>

      <div className="bg-base-200 p-4 md:p-6 rounded-xl">
        <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 flex items-center gap-2">
          <MapPin size={20} /> Location
        </h3>

        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
          target="_blank"
          rel="noreferrer"
          className="btn btn-outline btn-sm mt-2 w-full md:w-fit"
        >
          Open in Google Maps
        </a>
      </div>
    </div>
  );
};

export default ContactSection;