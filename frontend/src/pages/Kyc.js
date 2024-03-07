import React, { useState } from "react";
import axios from "axios";
// Import the useNavigate hook from react-router-dom
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Kyc() {
  const [nidNumber, setNidNumber] = useState("");
  const [fullNameEnglish, setFullNameEnglish] = useState("");
  const [fullNameBangla, setFullNameBangla] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3001/kyc", {
        nidNumber,
        fullNameEnglish,
        fullNameBangla,
        dateOfBirth,
      })
      .then((response) => {
        // Handle the success response
        Swal.fire({
          title: "Success",
          text: response.data.message,
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
        setNidNumber("");
        setFullNameEnglish("");
        setFullNameBangla("");
        setDateOfBirth("");
        navigate(`/user/${nidNumber}`);
      })
      .catch((error) => {
        // Handle the error response
        console.log("Unable to submit data. Error: ", error.response.data);
        Swal.fire({
          title: "Error",
          text: "Unable to submit data",
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  };

  return (
    <div className="bg-white rounded-lg py-5">
      <div className="container flex flex-col mx-auto bg-white rounded-lg pt-12 my-5">
        <div class="flex justify-center w-full h-full my-auto xl:gap-14 lg:justify-normal md:gap-5 draggable">
          <div class="flex items-center justify-center w-full lg:p-12">
            <div class="flex items-center xl:p-10">
              <form
                className="flex flex-col w-full h-full pb-6 text-center bg-white rounded-3xl"
                onSubmit={handleSubmit}
              >
                <h3 class="mb-12 text-4xl font-extrabold text-dark-grey-900">
                  KYC
                </h3>
                <div class="flex items-center mb-3">
                  <hr class="h-0 border-b border-solid border-grey-500 grow" />
                  <p class="mx-4 text-grey-600 font-medium">
                    Know Your Customer
                  </p>
                  <hr class="h-0 border-b border-solid border-grey-500 grow" />
                </div>
                <label
                  for="nid"
                  className="mb-2 text-sm text-start text-grey-900 font-medium"
                >
                  NID Number*
                </label>
                <input
                  className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl border-2 border-gray-300"
                  type="text"
                  id="nid"
                  placeholder="NID Number"
                  value={nidNumber}
                  onChange={(e) => setNidNumber(e.target.value)}
                />
                <label
                  for="english"
                  className="mb-2 text-sm text-start text-grey-900 font-medium"
                >
                  Full Name (English)*
                </label>
                <input
                  className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl border-2 border-gray-300"
                  type="text"
                  id="english"
                  placeholder="Full Name (English)"
                  value={fullNameEnglish}
                  onChange={(e) => setFullNameEnglish(e.target.value)}
                />
                <label
                  for="bangla"
                  className="mb-2 text-sm text-start text-grey-900 font-medium"
                >
                  Full Name (Bangla)*
                </label>
                <input
                  className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl border-2 border-gray-300"
                  type="text"
                  id="bangla"
                  placeholder="Full Name (Bangla)"
                  value={fullNameBangla}
                  onChange={(e) => setFullNameBangla(e.target.value)}
                />
                <label
                  for="dob"
                  className="mb-2 text-sm text-start text-grey-900 font-medium"
                >
                  Date of Birth*
                </label>
                <input
                  className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl border-2 border-gray-300"
                  type="text"
                  id="dob"
                  placeholder="Date of Birth (dd mm yyyy)"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                />
                <button
                  className="w-full px-6 py-5 mb-5 text-sm font-bold  bg-blue-500  leading-none text-white transition duration-300 md:w-96 rounded-2xl hover:bg-sky-blue-600 focus:ring-4 focus:ring-sky-blue-100 bg-sky-blue-500"
                  type="submit"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Kyc;
