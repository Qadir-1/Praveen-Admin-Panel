/** @format */

import React, { useCallback, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { ContainerS } from "../../Common/CommonStyling";
import HOC from "../../Common/HOC";
import { useReducer, useEffect } from "react";
import axios from "axios";

const Notify = () => {
  const token = localStorage.getItem("token");
  const [users, setUsers] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      const { data } = await axios.get(
        "http://ec2-15-206-210-177.ap-south-1.compute.amazonaws.com:3003/api/admin/users",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsers(data);
    } catch (err) {
      console.log(err);
    }
  }, [token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const [title, setTitle] = useState("");
  const [message, setMes] = useState("");
  const [name, setName] = useState([]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://fast-auto-praveen.herokuapp.com/api/admin/users/notifications",
        {
          users: [name],
          title,
          message,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
    } catch (err) {
      console.log(err);
    }
    alert("Notification has been created");
  };

  return (
    <>
      <ContainerS>
        <h3>Add Notifucation for Users</h3>
        <Container style={{ width: "600px", marginTop: "5%" }}>
          <Form onSubmit={submitHandler}>
            <select
              onChange={(e) => setName(e.target.value)}
              style={{ width: "300px", padding: "10px"}}
            >
              <option>Select User</option>
              {users.requiredUsers?.map((i, index) => (
                <option key={index} value={i._id}>
                  {i.fullName}{" "}
                </option>
              ))}
            </select>

            <Form.Group className="mb-3" controlId="fullName">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="An other test notification"
                required
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="fullName">
              <Form.Label>Message</Form.Label>
              <Form.Control
                type="text"
                placeholder="An other test notification"
                required
                onChange={(e) => setMes(e.target.value)}
              />
            </Form.Group>
            <Button type="submit" variant="outline-success">
              Submit
            </Button>
          </Form>
        </Container>
      </ContainerS>
    </>
  );
};

export default HOC(Notify);
