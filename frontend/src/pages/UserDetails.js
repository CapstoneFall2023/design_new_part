import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

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
        alert(error.response.data.error);
        setLoading(false);
      });
  }, [nidNumber]);
  
  const getKYCWallet = async () =>{
    try {
      axios.post(
        "http://localhost:3001/createWallet",{
          nidNumber
        })
        .then((response) => {
          alert(response.data.message);
        })
        .catch((error) => {
          // Handle the error response
          console.log("Unable to submit data. Error: ", error.response.data);
        });
    } catch (error) {
      console.log("Unable to get KYC wallet. Error: ", error)
    }
  }


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4">User Details</h1>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <form className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="nidNumber"
            >
              NID Number
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="nidNumber"
              type="text"
              value={nidNumber}
              readOnly
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="fullNameEnglish"
            >
              Full Name (English)
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="fullNameEnglish"
              type="text"
              value={fullNameEnglish}
              readOnly
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="fullNameBangla"
            >
              Full Name (Bangla)
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="fullNameBangla"
              type="text"
              value={fullNameBangla}
              readOnly
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="dateOfBirth"
            >
              Date of Birth
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="dateOfBirth"
              type="text"
              value={dateOfBirth}
              readOnly
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="father"
            >
              Father's Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="father"
              type="text"
              value={father}
              readOnly
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="mother"
            >
              Mother's Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="mother"
              type="text"
              value={mother}
              readOnly
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="address"
            >
              Address
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="address"
              type="text"
              value={address}
              readOnly
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="bloodGroup"
            >
              Blood Group
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="bloodGroup"
              type="text"
              value={bloodGroup}
              readOnly
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Cancel
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={getKYCWallet}
            >
              Next
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
export default UserDetails;
