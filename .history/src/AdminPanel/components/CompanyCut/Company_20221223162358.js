/** @format */

import React, { useCallback, useState } from "react";
import { ContainerS } from "../../Common/CommonStyling";
import HOC from "../../Common/HOC";
import { Table } from "react-bootstrap";
import editSvg from "../../Image/edit.svg";
import { useEffect } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";

const Company = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const token = localStorage.getItem("token");
  const [data, setData] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `http://ec2-15-206-210-177.ap-south-1.compute.amazonaws.com:3003/api/admin/companyCut`,
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
  }, [token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Centered Modal</h4>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
            ac consectetur ac, vestibulum at eros.
          </p>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    );
  }

  return (
    <>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <ContainerS>
        <div>
          <p style={{ fontSize: "1.3rem" }}>Company Cut</p>
        </div>

        <Table striped bordered hover>
          <thead>
            <th>Company Cut</th>
            <th>Action </th>
          </thead>
          <tbody>
            <tr>
              <td>{data?.companyCut?.companyCut}</td>
              <td>
                <img
                  src={editSvg}
                  alt=""
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: "100%",
                    width: "30px",
                    padding: "5px",
                    height: "30px",
                  }}
                  onClick={() => setModalShow(true)}
                />
              </td>
            </tr>
          </tbody>
        </Table>
      </ContainerS>
    </>
  );
};

export default HOC(Company);
