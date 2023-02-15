/** @format */

import React, { useCallback } from "react";
import { useNavigate, useParams } from "react-router";
import { ContainerS } from "../../Common/CommonStyling";
import HOC from "../../Common/HOC";
import { Alert, Button, Table } from "react-bootstrap";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

const Coupan = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState([]);

  const token = localStorage.getItem("token");

  const fetchHandler = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `http://ec2-15-206-210-177.ap-south-1.compute.amazonaws.com:3003/api/admin/coupons/users/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(data);
    } catch (err) {
      console.log(err);
    }
  }, [token, id]);

  useEffect(() => {
    fetchHandler();
  }, [fetchHandler]);


  

  return (
    <>
      {data?.coupons?.length === 0 ? (
        <ContainerS>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Alert variant="info" style={{ width: "70%" }}>
              No Coupan Founded
            </Alert>
            <Button
              variant="outline-success"
              onClick={() => navigate(`/addCoupan/${id}`)}
              style={{height : '45px'}}
            >
              Add Coupan
            </Button>
          </div>
        </ContainerS>
      ) : (
        <ContainerS>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h3>User Coupans</h3>
            <Button
              variant="outline-success"
              onClick={() => navigate(`/addCoupan/${id}`)}
              style={{height : '45px'}}
            >
              Add More Coupan
            </Button>
          </div>

          <div>
            <Table
              striped
              bordered
              hover
              style={{
                marginTop: "5%",
              }}
            >
              <thead>
                <tr>
                  <th>Code</th>
                  <th>validFrom</th>
                  <th>validTill</th>
                  <th>discount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data?.coupons?.map((i) => (
                  <tr key={i._id}>
                    <td> {i.code} </td>
                    <td> {i.validFrom} </td>
                    <td> {i.validTill} </td>
                    <td> {i.discount} </td>
                    <td>
                      <Button
                        variant="outline-danger"
                        onClick={() =>

                        }
                      >
                        Delete
                      </Button>{" "}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </ContainerS>
      )}
    </>
  );
};

export default HOC(Coupan);
