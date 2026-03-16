import { Button } from "@/components/ui/button";

const RefundApproveModal = ({
  open,
  onClose,
  onConfirm,
  booking,
  loading
}) => {

  if (!open || !booking) return null;

  return (

    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div className="bg-zinc-900 rounded-xl p-6 w-96 shadow-lg">

        <h2 className="text-lg font-semibold text-white mb-4">
          Confirm Refund
        </h2>

        <p className="text-zinc-300 mb-6">

          Refund ₹{booking.totalAmount} to{" "}
          <span className="text-white font-medium">
            {booking.userId?.name}
          </span>
          ?

        </p>

        <div className="flex justify-end gap-3">

          <Button
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button
            className="bg-green-600 hover:bg-green-500 text-white"
            disabled={loading}
            onClick={onConfirm}
          >
            {loading ? "Processing..." : "Approve Refund"}
          </Button>

        </div>

      </div>

    </div>

  );
};

export default RefundApproveModal;