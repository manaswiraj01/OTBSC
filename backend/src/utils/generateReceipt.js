import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

export const generateReceipt = (booking, user) => {
    return new Promise((resolve, reject) => {
        try {
            const receiptsDir = path.join(process.cwd(), "receipts");

            if (!fs.existsSync(receiptsDir)) {
                fs.mkdirSync(receiptsDir, { recursive: true });
            }

            const fileName = `receipt-${booking.bookingRef || booking._id}-${Date.now()}.pdf`;
            const filePath = path.join(receiptsDir, fileName);

            const doc = new PDFDocument({
                margin: 40,
                size: "A4",
            });

            const stream = fs.createWriteStream(filePath);
            doc.pipe(stream);

            // =========================
            // Helpers
            // =========================
            const drawLine = (y) => {
                doc
                    .strokeColor("#E5E7EB")
                    .lineWidth(1)
                    .moveTo(40, y)
                    .lineTo(555, y)
                    .stroke();
            };

            const drawBox = (x, y, w, h, fill = "#FFFFFF", stroke = "#E5E7EB") => {
                doc.roundedRect(x, y, w, h, 8).fillAndStroke(fill, stroke);
            };

            const formatDate = (date) =>
                new Date(date).toLocaleDateString("en-IN", {
                    timeZone: "Asia/Kolkata",
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                });

            const formatDateTime = (date) =>
                new Date(date).toLocaleString("en-IN", {
                    timeZone: "Asia/Kolkata",
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                });

            // =========================
            // Header
            // =========================
            drawBox(40, 40, 515, 80, "#F9FAFB", "#E5E7EB");

            doc
                .fillColor("#7B61FF")
                .fontSize(24)
                .font("Helvetica-Bold")
                .text("QuickBook", 60, 60);

            doc
                .fillColor("#111827")
                .fontSize(18)
                .font("Helvetica-Bold")
                .text("BOOKING RECEIPT", 60, 88);

            doc
                .fillColor("#6B7280")
                .fontSize(10)
                .font("Helvetica")
                .text("quickbook.support@gmail.com", 360, 62, {
                    align: "right",
                    width: 160,
                });

            // =========================
            // Booking Info Cards
            // =========================
            drawBox(40, 140, 250, 90, "#FFFFFF");
            drawBox(305, 140, 250, 90, "#FFFFFF");

            doc
                .fillColor("#111827")
                .fontSize(12)
                .font("Helvetica-Bold")
                .text("Booking Details", 55, 155);

            doc
                .font("Helvetica")
                .fontSize(10)
                .fillColor("#374151")
                .text(`Booking Ref: ${booking.bookingRef || "N/A"}`, 55, 178)
                .text(`Booked On: ${formatDateTime(booking.createdAt)}`, 55, 198);

            doc
                .fillColor("#111827")
                .fontSize(12)
                .font("Helvetica-Bold")
                .text("Payment Info", 320, 155);

            const displayPaymentStatus =
                booking.refundStatus === "Refunded" ? "Refunded" : booking.paymentStatus;

            doc
                .font("Helvetica")
                .fontSize(10)
                .fillColor("#374151")
                .text(`Payment Status: ${displayPaymentStatus}`, 320, 178)
                .text(`Amount Paid: Rs. ${booking.totalAmount}`, 320, 198);

            // =========================
            // User & Place Section
            // =========================
            drawBox(40, 250, 250, 130, "#FFFFFF");
            drawBox(305, 250, 250, 130, "#FFFFFF");

            doc
                .fillColor("#111827")
                .fontSize(12)
                .font("Helvetica-Bold")
                .text("Customer Details", 55, 265);

            doc
                .font("Helvetica")
                .fontSize(10)
                .fillColor("#374151")
                .text(`Name: ${user?.name || "N/A"}`, 55, 290)
                .text(`Email: ${user?.email || "N/A"}`, 55, 308, { width: 210 });

            doc
                .fillColor("#111827")
                .fontSize(12)
                .font("Helvetica-Bold")
                .text("Place Details", 320, 265);

            doc
                .font("Helvetica")
                .fontSize(10)
                .fillColor("#374151")
                .text(`Place: ${booking.name || "N/A"}`, 320, 290, { width: 210 })
                .text(`Category: ${booking.category || "N/A"}`, 320, 308)
                .text(`Visit Date: ${formatDate(booking.visitDate)}`, 320, 326)
                .text(
                    `City: ${booking.city || "N/A"}, ${booking.state || "N/A"}`,
                    320,
                    344
                );

            // =========================
            // Ticket Table Title
            // =========================
            doc
                .fillColor("#111827")
                .fontSize(14)
                .font("Helvetica-Bold")
                .text("Ticket Summary", 40, 405);

            // =========================
            // Ticket Table Header
            // =========================
            drawBox(40, 430, 515, 30, "#7B61FF", "#7B61FF");

            doc
                .fillColor("#FFFFFF")
                .fontSize(10)
                .font("Helvetica-Bold")
                .text("S.No", 55, 440)
                .text("Visitor Type", 105, 440)
                .text("Qty", 315, 440)
                .text("Price", 380, 440)
                .text("Total", 470, 440);

            // =========================
            // Ticket Rows
            // =========================
            let currentY = 460;
            let grandTotal = 0;

            booking.ticketDetails.forEach((ticket, index) => {
                const rowTotal = ticket.totalPrice;
                grandTotal += rowTotal;

                drawBox(40, currentY, 515, 32, "#FFFFFF", "#E5E7EB");

                doc
                    .fillColor("#111827")
                    .fontSize(10)
                    .font("Helvetica")
                    .text(index + 1, 58, currentY + 10)
                    .text(ticket.visitorType || "N/A", 105, currentY + 10)
                    .text(ticket.numberOfTickets || 0, 320, currentY + 10)
                    .text(
                        `Rs. ${Math.round(rowTotal / (ticket.numberOfTickets || 1))}`,
                        380,
                        currentY + 10
                    )
                    .text(`Rs. ${rowTotal}`, 470, currentY + 10);

                currentY += 32;
            });

            // =========================
            // Payment Summary Box
            // =========================
            drawBox(
                335,
                currentY + 20,
                220,
                booking.refundStatus === "Refunded" ? 120 : 95,
                "#F9FAFB",
                "#E5E7EB"
            );

            doc
                .fillColor("#111827")
                .fontSize(12)
                .font("Helvetica-Bold")
                .text("Payment Summary", 350, currentY + 35);

            doc
                .font("Helvetica")
                .fontSize(10)
                .fillColor("#374151")
                .text(`Subtotal`, 350, currentY + 58)
                .text(`Rs. ${grandTotal}`, 490, currentY + 58, {
                    width: 50,
                    align: "right",
                })

                .text(`Taxes / Fees`, 350, currentY + 76)
                .text(`0`, 490, currentY + 76, { width: 50, align: "right" });


            doc
                .font("Helvetica-Bold")
                .fillColor("#111827")
                .text(`Total Paid`, 350, currentY + 102)
                .text(`Rs. ${booking.totalAmount}`, 470, currentY + 102, {
                    width: 70,
                    align: "right",
                });

            //Refund status row
            if (booking.refundStatus === "Refunded") {
                doc
                    .font("Helvetica-Bold")
                    .fillColor("#16A34A")
                    .text(`Refund Status`, 350, currentY + 120)
                    .text(`Refunded`, 495, currentY + 120);
            }

            // =========================
            // Footer
            // =========================
            doc
                .fillColor("#6B7280")
                .fontSize(10)
                .font("Helvetica")
                .text(
                    "Please show this receipt at the place for booking verification. If verification fails, you will not be allowed to enter.",
                    40,
                    760,
                    { align: "center", width: 515 }
                );

            doc
                .fontSize(10)
                .text("Thank you for booking with QuickBook!", 40, 775, {
                    align: "center",
                    width: 515,
                });

            doc.end();

            stream.on("finish", () => {
                resolve({ fileName, filePath });
            });

            stream.on("error", reject);
        } catch (error) {
            reject(error);
        }
    });
};