import { React, useState } from "react";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { useAuth } from "../hooks/useAuth";

function ForgotPassword() {
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");
  const { resetPasswordToken, isLoading } = useAuth();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    resetPasswordToken(
      { email },
      {
        onSuccess: () => {
          setEmailSent(true);
        },
      }
    );
  };

  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
      {isLoading.resetPasswordToken ? (
        <div className="spinner"></div>
      ) : (
        <div className="lg:max-w-[500px] max-w-[25rem] md:max-w-[400px] p-4 lg:p-8">
          <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
            {!emailSent ? "Reset your Password" : "Check Your Email"}
          </h1>
          <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">
            {!emailSent ? (
              "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
            ) : (
              <div>{`We have sent the reset email to ${email}`}</div>
            )}
          </p>
          <form onSubmit={handleOnSubmit}>
            {!emailSent && (
              <label>
                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                  Email Address <sup className="text-pink-200">*</sup>
                </p>
                <input
                  required
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Your Email Address"
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                />
              </label>
            )}

            <button
              type="submit"
              className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900"
            >
              {!emailSent ? "Reset Password" : "Resend Email"}
            </button>
          </form>

          <div className="mt-6 flex items-centerjustify-between">
            <Link to="/login">
              <p className="flex items-center gap-x-2 text-blue-100 ">
                <BiArrowBack />
                Back to login
              </p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default ForgotPassword;
