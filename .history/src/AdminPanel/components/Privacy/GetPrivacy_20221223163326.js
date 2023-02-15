/** @format */

import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { ContainerS } from "../../Common/CommonStyling";
import HOC from "../../Common/HOC";
import { Button, Table } from "react-bootstrap";
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

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Privacy Policy</th>
          </tr>
        </thead>
      </Table>

      </ContainerS>
    </>
  );
};

export default HOC(GetPrivacy);
