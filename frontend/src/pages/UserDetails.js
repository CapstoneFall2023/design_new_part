import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

function UserDetails() {
  const { nidNumber } = useParams();
  const [fullNameEnglish, setFullNameEnglish] = useState("");
  const [fullNameBangla, setFullNameBangla] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [father, setFather] = useState("");
  const [mother, setMother] = useState("");
  const [address, setAddress] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3001/user/${nidNumber}`)
      .then((response) => {
        // Handle the success response
        const { user } = response.data;
        setFullNameEnglish(user.fullNameEnglish);
        setFullNameBangla(user.fullNameBangla);
        setDateOfBirth(user.dateOfBirth);
        setFather(user.father);
        setMother(user.mother);
        setAddress(user.address);
        setBloodGroup(user.bloodGroup);
        setLoading(false);
      })
      .catch((error) => {
        // Handle the error response
        console.log("Unable to get user details. Error: ", error.response.data);
        Swal.fire({
          title: "Error",
          text: error.response.data.error,
          icon: "error",
          confirmButtonText: "OK",
        });
        setLoading(false);
      });
  }, [nidNumber]);

  const getKYCWallet = async () => {
    try {
      console.log(nidNumber);
      if (nidNumber) {
        console.log(nidNumber);
        const response = await axios.post(
          `http://localhost:3001/createWallet`, { nidNumber });
        console.log(response.data);
        Swal.fire({
          title: "Success",
          text: "Wallet created successfully",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error("Error creating wallet:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to create wallet",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="bg-white rounded-lg py-5">
      <div className="container flex flex-col mx-auto bg-white rounded-lg pt-12 my-5">
        <div class="flex justify-center w-full h-full my-auto xl:gap-14 lg:justify-normal md:gap-5 draggable">
          <div class="flex items-center justify-center w-full lg:p-12">
            <div class="flex items-center xl:p-10">
              {loading ? (
                <p className="text-center font-extrabold text-dark-grey-900">
                  Loading...
                </p>
              ) : (
                <form className="flex flex-col w-full h-full pb-6 text-center bg-white rounded-3xl">
                  <h3 className="mb-12 text-4xl font-extrabold text-dark-grey-900">
                    User Details
                  </h3>
                  <label
                    className="mb-2 text-sm text-start text-grey-900 font-medium"
                    htmlFor="nidNumber"
                  >
                    NID Number
                  </label>
                  <input
                    className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl border-2 border-gray-300"
                    id="nidNumber"
                    type="text"
                    value={nidNumber}
                    readOnly
                  />
                  <label
                    className="mb-2 text-sm text-start text-grey-900 font-medium"
                    htmlFor="fullNameEnglish"
                  >
                    Full Name (English)
                  </label>
                  <input
                    className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl border-2 border-gray-300"
                    id="fullNameEnglish"
                    type="text"
                    value={fullNameEnglish}
                    readOnly
                  />
                  <label
                    className="mb-2 text-sm text-start text-grey-900 font-medium"
                    htmlFor="fullNameBangla"
                  >
                    Full Name (Bangla)
                  </label>
                  <input
                    className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl border-2 border-gray-300"
                    id="fullNameBangla"
                    type="text"
                    value={fullNameBangla}
                    readOnly
                  />

                  <label
                    className="mb-2 text-sm text-start text-grey-900 font-medium"
                    htmlFor="dateOfBirth"
                  >
                    Date of Birth
                  </label>
                  <input
                    className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl border-2 border-gray-300"
                    id="dateOfBirth"
                    type="text"
                    value={dateOfBirth}
                    readOnly
                  />
                  <label
                    className="mb-2 text-sm text-start text-grey-900 font-medium"
                    htmlFor="father"
                  >
                    Father's Name
                  </label>
                  <input
                    className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl border-2 border-gray-300"
                    id="father"
                    type="text"
                    value={father}
                    readOnly
                  />
                  <label
                    className="mb-2 text-sm text-start text-grey-900 font-medium"
                    htmlFor="mother"
                  >
                    Mother's Name
                  </label>
                  <input
                    className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl border-2 border-gray-300"
                    id="mother"
                    type="text"
                    value={mother}
                    readOnly
                  />
                  <label
                    className="mb-2 text-sm text-start text-grey-900 font-medium"
                    htmlFor="address"
                  >
                    Address
                  </label>
                  <input
                    className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl border-2 border-gray-300"
                    id="address"
                    type="text"
                    value={address}
                    readOnly
                  />
                  <label
                    className="mb-2 text-sm text-start text-grey-900 font-medium"
                    htmlFor="bloodGroup"
                  >
                    Blood Group
                  </label>
                  <input
                    className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl border-2 border-gray-300"
                    id="bloodGroup"
                    type="text"
                    value={bloodGroup}
                    readOnly
                  />
                  <button
                    className="w-full px-6 py-5 mb-5 text-sm font-bold  bg-blue-500  leading-none text-white transition duration-300 md:w-96 rounded-2xl hover:bg-sky-blue-600 focus:ring-4 focus:ring-sky-blue-100 bg-sky-blue-500"
                    type="button"
                    onClick={getKYCWallet}
                  >
                    Next
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default UserDetails;
