import { z } from "zod";

// Payment schemas - shared between frontend and backend
export const coursePaymentSchema = z.object({
  courses: z
    .array(
      z.object({
        _id: z.string().min(1, "Course ID is required"),
      })
    )
    .min(1, "At least one course is required"),
});

export const verifyPaymentSchema = z.object({
  razorpay_order_id: z.string().min(1, "Order ID is required"),
  razorpay_payment_id: z.string().min(1, "Payment ID is required"),
  razorpay_signature: z.string().min(1, "Signature is required"),
  courses: z
    .array(
      z.object({
        _id: z.string().min(1, "Course ID is required"),
      })
    )
    .min(1, "At least one course is required"),
});

export const sendPaymentSuccessEmailSchema = z.object({
  orderId: z.string().min(1, "Order ID is required"),
  paymentId: z.string().min(1, "Payment ID is required"),
  amount: z.number().positive("Amount must be positive"),
});

