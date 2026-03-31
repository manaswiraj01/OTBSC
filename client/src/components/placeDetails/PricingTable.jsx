import { IndianRupee } from "lucide-react";

const PricingTable = ({ pricing }) => {
  return (
    <div className="px-2 md:px-0">
      <h2 className="text-xl md:text-2xl font-semibold mb-4 flex items-center gap-2">
        <IndianRupee size={20} /> Entry Pricing
      </h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full text-sm md:text-base">
          <thead>
            <tr>
              <th>Visitor Type</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Indian Adult</td>
              <td>₹{pricing.indianAdult}</td>
            </tr>
            <tr>
              <td>Indian Student</td>
              <td>₹{pricing.indianStudent}</td>
            </tr>
            <tr>
              <td>Foreigner Adult</td>
              <td>₹{pricing.foreignerAdult}</td>
            </tr>
            <tr>
              <td>Foreigner Student</td>
              <td>₹{pricing.foreignerStudent}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PricingTable;