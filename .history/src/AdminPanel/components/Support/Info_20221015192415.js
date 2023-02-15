import axios from "axios";
import React, { useEffect } from "react";
import { ContainerS } from "../../Common/CommonStyling";
import HOC from "../../Common/HOC";
import { useReducer } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: false, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, error: "", Info: action.payload };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const Info = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const [{ loading, error, Info }, dispatch] = useReducer(reducer, {
    Info: [],
    loading: false,
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          "https://fast-auto-praveen.herokuapp.com/api/admin/support",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  });

  return (
    <>
      <ContainerS>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {" "}
          <h2>Support Info</h2>
          <Button
            variant="outline-dark"
            onClick={() => navigate("/updateInfo")}
          >
            Update Info
          </Button>
        </div>

        <div style={{ marginTop: "5%", marginLeft: "5%" }}>
          <h5>ID</h5>
          <p
            style={{ border: "2px solid black", padding: "5px ", width: "40%" }}
          >
         {Info._id}
          </p>
          <h5>Email</h5>
          <p
            style={{ border: "2px solid black", padding: "5px ", width: "40%" }}
          >
           {Info.email}
          </p>
          <h5>Conatct Details</h5>
          <p
            style={{ border: "2px solid black", padding: "5px ", width: "40%" }}
          >
          {Info.phone}
          </p>
          <h5>Address</h5>
          <p
            style={{ border: "2px solid black", padding: "5px ", width: "40%" }}
          >
           {Info.address}
          </p>
        </div>
      </ContainerS>
    </>
  );
};

export default HOC(Info);
