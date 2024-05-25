import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Footer from "./Footer.jsx";

function FinishSign() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [valid, setValid] = useState(true);

  const handleChange = (value) => {
    setPhoneNumber(value);
    setValid(validatePhoneNumber(value));
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneNumberPattern = /^\+?[1-9]\d{1,14}$/;
    return phoneNumberPattern.test(phoneNumber);
  };
  const handleInput = (event) => {
  const { name, value } = event.target;
  setPost({ ...post, [name]: value });
};
  const [post, setPost] = useState({
    name: '',
    phoneNumber: '',
    address: '',
    city: '',
    state: '',
    zip: '',
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8000/api/UserRegister', post)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
  };


  return (
    <>
      <section>
        <div className="LoginRegisterTop">
          <h1 className="logo">MMUJOB</h1>
        </div>
        <div className="finishSignContainer">
          <div>
            <h1 className="text-[25px] font-bold text-gray-900">Almost done</h1>
            <p>Fill in this form to complete your account.</p>
            <form className="finishSignForm space-y-4 flex" onClick={handleSubmit}>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  className="peer w-full h-10 border border-black outline-none transition duration-200 pt-4"
                  value={post.name}
                  onChange={handleInput}
                />
                <label className={`input-text absolute left-2 top-2 text-gray-500 transition-all duration-200 transform origin-0 ${post.name ? 'top-[-11px] left-2 text-blue-500' : 'peer-placeholder-shown:top-2 peer-placeholder-shown:left-2 peer-focus:top-[-12px] peer-focus:left-2 peer-focus:text-blue-500'}`}>
                    Name
                </label>
              </div>
                
              <div>
                <label>Phone Number:</label>
                <PhoneInput
                  country={"in"}
                  value={phoneNumber}
                  onChange={handleChange}
                  inputProps={{
                    required: true,
                  }}
                />
                {!valid && (
                  <p className="error-message">
                    Please enter a valid phone number.
                  </p>
                )}
              </div>
              {["Nationality","Address"].map((field) => (
                <div className="relative" key={field}>
                    <input
                    type="text"
                    name={field}
                    value={post[field]}
                    required
                    className="peer w-full h-10 border border-black outline-none transition duration-200 pt-4"
                    onChange={handleInput}
                    />
                    <label
                    htmlFor={field}
                    className={`input-text absolute left-2 top-2 text-gray-500 transition-all duration-200 transform origin-0 ${post[field] ? 'top-[-11px] left-2 text-blue-500' : 'peer-placeholder-shown:top-2 peer-placeholder-shown:left-2 peer-focus:top-[-11px] peer-focus:left-2 peer-focus:text-blue-500'}`}>
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                </div>
                ))}

              <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                Finish
              </button>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default FinishSign;
