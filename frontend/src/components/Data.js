import React, { useState, useEffect } from "react";
import axios from "axios";

function Data() {
  const [nidUsers, setNidUsers] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3001/nid")
      .then((nidUsers) => setNidUsers(nidUsers.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <table className="">
        <thead>
          <tr>
            <th>Full Name English</th>
            <th>Full Name Bengali</th>
            <th>NID NUM</th>
            <th>Date of Birth</th>
          </tr>
        </thead>
        <tbody>
          {nidUsers.map((nidUser) => {
            return (
              <tr key={nidUser.id}>
                <td>{nidUser.fullNameEnglish}</td>
                <td>{nidUser.fullNameBangla}</td>
                <td>{nidUser.nidNumber}</td>
                <td>{nidUser.dateOfBirth}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Data;
