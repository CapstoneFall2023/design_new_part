import React, { useState } from "react";
import axios from "axios";

function EthereumAddressInput() {
  const [verifier, setVerifier] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const nid = "1234"; // original nid data
      const response = await axios.post(`http://localhost:3001/grantVerifier`, {
        verifier,
        nid,
      });
      console.log("KYC Approved Successfully:", response.data);
      console.log("Submitted Ethereum Address:", verifier);
      setVerifier("");
    } catch (error) {
      console.error("Error submitting KYC Approved:", error);
    }
  };

  const handleRevoke = async (e) => {
    e.preventDefault();
    try {
      const nid = "1234"; // original nid data
      const response = await axios.post(
        `http://localhost:3001/revokeVerifier`,
        {
          verifier,
          nid,
        }
      );
      console.log("KYC Revoked Successfully:", response.data);
      console.log("Revoked Ethereum Address:", verifier);
      setVerifier("");
    } catch (error) {
      console.error("Error submitting KYC Revoke:", error);
    }
  };

  return (
    <div className="bg-white rounded-lg py-5">
      <div className="container flex flex-col mx-auto bg-white rounded-lg pt-12 my-5">
        <div class="flex justify-center w-full h-full my-auto xl:gap-14 lg:justify-normal md:gap-5 draggable">
          <div class="flex items-center justify-center w-full lg:p-12">
            <div class="flex items-center xl:p-10">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col w-full h-full pb-6 text-center bg-white rounded-3xl"
              >
                <h3
                  htmlFor="ethereumAddress"
                  className="mb-6 text-4xl font-extrabold text-dark-grey-900"
                >
                  Verifier Address
                </h3>
                <input
                  type="text"
                  id="ethereumAddress"
                  value={verifier}
                  onChange={(e) => setVerifier(e.target.value)}
                  placeholder="Enter your Verifier address"
                  className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl border-2 border-gray-300"
                />
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 bg-green-500 text-white p-2 rounded hover:bg-green-600 transition-colors duration-150 ease-in-out flex items-center justify-center gap-2 transition duration-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                      className=""
                    >
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM7.247 4.86v.03L6 8.691l1.481-.445L8 7.293l.52 1.953 1.48.445-1.248-3.8h-.505zm.259-1.71c-.457 0-.842.345-.928.802h1.857c-.086-.457-.471-.802-.929-.802zm2.229 2.326l-.717-2.147c-.548-.07-1.04-.246-1.475-.489v-.047c0-.256.207-.464.464-.464h.947c.306 0 .587.117.802.312.214-.195.496-.312.802-.312h.946c.256 0 .464.208.464.464v.047c-.435.243-.927.419-1.475.489l-.717 2.147zm3.095 1.098l-1.234 3.733-1.368-.486-.775-2.916-.775 2.916-1.368.486-1.234-3.733H5.658L4.896 13h6.208l-.759-2.876h-1.519z" />
                    </svg>
                    Approve
                  </button>
                  <button
                    type="button"
                    onClick={handleRevoke}
                    className="flex-1 bg-red-500 text-white p-2 rounded hover:bg-red-600 flex items-center justify-center gap-2 transition duration-300"
                  >
                    {/* Revoke Icon SVG or Text */}
                    Revoke
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EthereumAddressInput;
