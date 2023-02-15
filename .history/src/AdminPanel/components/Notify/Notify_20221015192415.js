import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { ContainerS } from "../../Common/CommonStyling";
import HOC from "../../Common/HOC";
import { useReducer, useEffect } from "react";
import axios from "axios";
import { display } from "@mui/system";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: false, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, error: "", Users: action.payload };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const Notify = () => {
  const token = localStorage.getItem("token");

  const [{ loading, error, Users }, dispatch] = useReducer(reducer, {
    Users: [],
    loading: false,
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          "https://fast-auto-praveen.herokuapp.com/api/admin/users",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        dispatch({ type: "FETCH_SUCCESS", payload: data });
        console.log("dadsad");
        console.log(data.headers);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [axios, dispatch]);

  const [users, setUsers] = useState([]);
  const [title, setTitle] = useState("");
  const [message, setMes] = useState("");
  const [name, setName] = useState([]);

  console.log(name);
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
        <h2>Add Notifucation for Users</h2>
        <Container style={{ width: "600px", marginTop: "5%" }}>
          <Form onSubmit={submitHandler}>
            <p>Select User</p>
            {Users?.requiredUsers?.map((i) => (
              <>
                <Form.Group className="mb-3" controlId="fullName">
                  <Form.Check
                    type="radio"
                    required
                    value={i._id}
                    label={i.fullName}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>
              </>
            ))}
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
