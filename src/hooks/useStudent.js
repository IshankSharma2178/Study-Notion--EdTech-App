import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { apiConnector } from "../services/apiconnector";
import { studentEndpoints } from "../services/apis";
import { setPaymentLoading } from "../slices/courseSlice";
import { resetCart } from "../slices/cartSlice";
import { setUser } from "../slices/authSlice";
import toast from "react-hot-toast";

const {
  COURSE_PAYMENT_API,
  COURSE_VERIFY_API,
  SEND_PAYMENT_SUCCESS_EMAIL_API,
} = studentEndpoints;

// Helper function to get token
const getToken = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Not authenticated");
  }
  // Only parse if it's actually JSON, otherwise return as-is
  try {
    return JSON.parse(token);
  } catch {
    return token;
  }
};

// Helper function to load Razorpay script
function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

export function useBuyCourse() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async ({ courses, userDetails }) => {
      const token = getToken();

      // Load Razorpay script
      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );

      if (!res) {
        throw new Error("RazorPay SDK failed to load");
      }

      // Create order
      const orderResponse = await apiConnector(
        "POST",
        COURSE_PAYMENT_API,
        { courses },
        {
          Authorization: `Bearer ${token}`,
        }
      );

      if (!orderResponse.data.success) {
        throw new Error(orderResponse.data.message);
      }

      return {
        orderResponse: orderResponse.data.message,
        courses,
        userDetails,
        token,
      };
    },
    onSuccess: (data) => {
      const { orderResponse, courses, userDetails, token } = data;

      // Setup Razorpay options
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        currency: orderResponse.currency,
        amount: `${orderResponse.amount}`,
        order_id: orderResponse.id,
        name: "StudyNotion",
        description: "Thank You for Purchasing the Course",
        prefill: {
          name: `${userDetails.firstName}`,
          email: userDetails.email,
        },
        handler: async (response) => {
          // Send payment success email
          try {
            await apiConnector(
              "POST",
              SEND_PAYMENT_SUCCESS_EMAIL_API,
              {
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                amount: orderResponse.amount,
              },
              {
                Authorization: `Bearer ${token}`,
              }
            );
          } catch (error) {
            console.log("PAYMENT SUCCESS EMAIL ERROR:", error);
            toast.error("Payment success mail failed");
          }

          // Verify payment
          await verifyPayment(
            { ...response, courses },
            token,
            navigate,
            dispatch
          );
        },
      };

      if (!window.Razorpay) {
        toast.error("Razorpay SDK not loaded");
        return;
      }

      // Open Razorpay modal
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
      paymentObject.on("payment.failed", () => {
        toast.error("Oops, payment failed");
      });
    },
    onError: (error) => {
      console.log("PAYMENT API ERROR:", error);
      toast.error(error.message || "Could not make Payment");
    },
  });

  return {
    buyCourse: mutation.mutate,
    isLoading: mutation.isPending,
  };
}

// Helper function to verify payment
async function verifyPayment(bodyData, token, navigate, dispatch) {
  const toastId = toast.loading("Verifying Payment...");
  dispatch(setPaymentLoading(true));

  try {
    const response = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
      Authorization: `Bearer ${token}`,
    });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    // Update localStorage AFTER successful verification
    try {
      const userDataString = localStorage.getItem("user");
      if (userDataString && bodyData.courses) {
        const userData = JSON.parse(userDataString);
        const courseIds = bodyData.courses.map((course) => course._id);
        userData.courses = [...(userData.courses || []), ...courseIds];
        localStorage.setItem("user", JSON.stringify(userData));
        dispatch(setUser(userData));
      }
    } catch (error) {
      console.log("Error updating user data:", error);
    }

    toast.success("Payment successful, you are added to the course!");
    navigate("/dashboard/enrolled-courses");
    dispatch(resetCart());
  } catch (error) {
    console.log("PAYMENT VERIFY ERROR:", error);
    toast.error(error.message || "Could not verify Payment");
  } finally {
    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));
  }
}
