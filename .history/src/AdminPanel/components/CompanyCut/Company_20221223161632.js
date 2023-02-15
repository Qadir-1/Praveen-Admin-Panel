import React from "react";
import { ContainerS } from "../../Common/CommonStyling";
import HOC from "../../Common/HOC";
import { Button } from "react-bootstrap";
import { Table } from "react-bootstrap";
import { useEffect } from "react";
import axios from "axios";
import { useReducer } from "react";
import { useNavigate } from "react-router";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: false, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, error: "", cut: action.payload };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const Company = () => {

  const navigate = useNavigate()

  const token = localStorage.getItem("token");

  const [{ loading, error, cut }, dispatch] = useReducer(reducer, {
    cut: [],
    loading: false,
    error: "",
  });

  useEffect(() => {
    
    fetchData();
  }, [axios]);

  return (
    <>
      <ContainerS>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <h2>Company Cut</h2>
          <Button
            variant="outline-success"
            onClick={() => navigate("/addCompany")}
          >
            Update Company Cut
          </Button>
        </div>
        <div style={{ marginTop: "5%" }}>
          <p
            style={{ border: "2px solid black", width: "40%", padding: "5px" }}
          >
            ID : {cut?.companyCut?._id}{" "}
          </p>
          <p
            style={{ border: "2px solid black", width: "40%", padding: "5px" }}
          >
            ID : {cut?.companyCut?.companyCut}{" "}
          </p>
        </div>
      </ContainerS>
    </>
  );
};

export default HOC(Company);
