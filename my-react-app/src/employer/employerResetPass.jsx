import { IoClose } from "react-icons/io5";
import { useEffect, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import axios from "axios";

export default function EmpResetPassword({ justClose, onClose, profile}) {
  const [resetPost, setResetPost] = useState({
    email: "",
    token: "",
    password: "",
    password_confirmation: "",
  });
  const [message, setMessage] = useState("");
  const [currentForm, setCurrentForm] = useState("resetRequest");
  const [resetPassVisible, setResetPassVisible] = useState(false);
  const [resetPassConfirmVisible, setResetPassConfirmVisible] = useState(false);
  
  const toggleResetPassVisibility = () => {
    setResetPassVisible(!resetPassVisible);
};

  const toggleResetPassConfirmVisibility = () => {
      setResetPassConfirmVisible(!resetPassConfirmVisible);
  };

  useEffect(() => {
    console.log(profile);
  }, []);

  const handleResetRequestSubmit = (event) => {
    event.preventDefault();

    if (!resetPost.email) {
      setMessage("* Email is required");
      return;
    }
    if (!resetPost.email.includes("@")) {
      setMessage("* Invalid email address");
      return;
    }
    if(resetPost.email !== profile.employerEmail){
        setMessage("* Email does not match");
        return;
    }

    axios
      .post("http://localhost:8000/api/Employer/SendOTPEmail", {
        email: resetPost.email,
      })
      .then((response) => {
        console.log("Response:", response.data);
        setMessage("OTP sent to your email.");
        setCurrentForm("resetPassword");
      })
      .catch((error) => {
        console.error("Error sending OTP:", error);
        setMessage("Error sending OTP.");
      });
  };

  const handleResetPasswordSubmit = (event) => {
    event.preventDefault();

    const { token, password, password_confirmation } = resetPost;

    if (!token || !password || !password_confirmation) {
      setMessage("* All fields are required");
      return;
    }

    if (password !== password_confirmation) {
      setMessage("* New password and confirm password must match");
      return;
    }

    axios
      .post("http://localhost:8000/api/Employer/ResetPassword", {
        token,
        password,
        password_confirmation,
      })
      .then((response) => {
        console.log("Password reset successful:", response.data);
        setMessage("Password reset successful.");
        onClose();
      })
      .catch((error) => {
        console.error("Error resetting password:", error);
        setMessage("Invalid OTP or error resetting password.");
      });
  };

  return (
    <div className="addrole fixed inset-0 flex items-center justify-end bg-black bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded shadow-lg relative w-full max-w-2xl h-full overflow-y-auto">
        <button onClick={justClose} className="absolute top-2 right-2 text-xl font-bold">
          <IoClose size={25} />
        </button>
        <div className="py-4 px-6">
          {currentForm === "resetRequest" && (
            <form className="flex flex-col" onSubmit={handleResetRequestSubmit}>
              <h2 className="text-2xl font-bold mb-4">Request OTP</h2>
              <input
                type="email"
                placeholder="Enter your email"
                className="border border-gray-300 rounded px-3 py-2 w-full mb-2"
                value={resetPost.email}
                onChange={(e) => setResetPost({ ...resetPost, email: e.target.value })}
              />
              <button
                type="submit"
                className="bg-customPink text-white px-4 py-2 rounded hover:bg-pink-700 transition duration-200"
              >
                Send OTP
              </button>
              {message && <p className="text-red-500 mt-2">{message}</p>}
            </form>
          )}
          {currentForm === "resetPassword" && (
            <form className="flex flex-col" onSubmit={handleResetPasswordSubmit}>
              <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
              <input
                type="text"
                placeholder="Enter OTP"
                className="border border-gray-300 rounded px-3 py-2 w-full mb-2"
                value={resetPost.token}
                onChange={(e) => setResetPost({ ...resetPost, token: e.target.value })}
              />
              <div className="password-container">
                <input
                  type={resetPassVisible ? "text" : "password"} 
                  placeholder="Enter new password"
                  className="border border-gray-300 rounded px-3 py-2 w-full mb-2"
                  value={resetPost.password}
                  onChange={(e) => setResetPost({ ...resetPost, password: e.target.value })}
                />
                <span onClick={toggleResetPassVisibility} className="userProfilePPassword-toggle-icon">
                  {resetPassVisible ? <FaRegEye /> : <FaRegEyeSlash />}
                </span>
              </div>
              <div className="password-container">
                <input
                  type={resetPassConfirmVisible ? "text" : "password"} 
                  placeholder="Confirm new password"
                  className="border border-gray-300 rounded px-3 py-2 w-full mb-2"
                  value={resetPost.password_confirmation}
                  onChange={(e) =>
                    setResetPost({ ...resetPost, password_confirmation: e.target.value })
                  }
                />
                <span onClick={toggleResetPassConfirmVisibility} className="userProfilePassword-toggle-icon">
                    {resetPassConfirmVisible ? <FaRegEye /> : <FaRegEyeSlash />}
                </span>
              </div>
              <button
                type="submit"
                className="bg-customPink text-white px-4 py-2 rounded hover:bg-pink-700 transition duration-200"
              >
                Reset Password
              </button>
              {message && <p className="text-red-500 mt-2">{message}</p>}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
