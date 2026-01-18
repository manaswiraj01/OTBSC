const PricingTable = ({ pricing }) => {
  return (
    <div className="mt-10">
      <h2 className="text-2xl font-semibold mb-4">
        💰 Entry Pricing
      </h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Visitor Type</th>
              <th>Price (₹)</th>
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
