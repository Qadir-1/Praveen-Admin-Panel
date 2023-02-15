/** @format */

import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { ContainerS } from "../../Common/CommonStyling";
import HOC from "../../Common/HOC";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";

const GetPrivacy = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [data, setData] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `https://fast-auto-praveen.herokuapp.com/api/admin/privacy-policy`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(data);
    } catch (error) {
      console.log(error);
    }
  }, [token]);

  useEffect(() => {
    fetchData();
  },[fetchData]);

  return (
    <>
      <ContainerS>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h3>Privacy Policy</h3>
        </div>

        <div style={{ marginTop: "5%", marginLeft: "5%" }}>
          <h5>ID</h5>
          <p
            style={{ border: "2px solid black", padding: "5px ", width: "40%" }}
          >
            {Privacy._id}
          </p>
          <h5>Privacy Policy</h5>
          <p
            style={{ border: "2px solid black", padding: "5px ", width: "40%" }}
          >
            {Privacy.privacyPolicy}
          </p>
        </div>
      </ContainerS>
    </>
  );
};

export default HOC(GetPrivacy);
