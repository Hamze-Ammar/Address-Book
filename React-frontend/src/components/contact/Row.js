import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { FaPen, FaTrashAlt } from "react-icons/fa";
import { useEffect } from "react";

const Row = ({
  contact,
  setReload,
  setShowDelete,
  confirmDelete,
  setConfirmDelete,
  deletedId,
  setDeletedId,
}) => {
  const navigate = useNavigate();
  //   console.log("1: ",String(contact.location.coordinates[0]));
  let id = contact._id;

  //Confirm delete:
  const askToConfirm = () => {
    setShowDelete(true);
  };

  useEffect(() => {
    if (confirmDelete && deletedId === id) {
      deleteContact();
    }
  }, [confirmDelete]);

  //Delete contact
  const deleteContact = async () => {
    try {
      const res = await fetch(
        `http://localhost:3001/api/contact/delete?id=${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
            "x-access-token": localStorage.getItem("access_token"),
          },
        }
      );
      const response = await res.json();
      console.log(response);
      if (response.msg === "contact removed") {
        console.log("yes");
        setConfirmDelete(false);
        setReload(id);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <tr>
        <td>{contact.fullName}</td>
        <td>{contact.phoneNumber}</td>
        <td>{contact.relationship}</td>
        <td>{contact.email}</td>
        <td>
          {contact.location ? String(contact.location.coordinates[0]) : ""}
        </td>
        <td>
          {contact.location ? String(contact.location.coordinates[1]) : ""}
        </td>
        <td>
          <span
            className="icon red"
            onClick={() => {
              console.log("hiiii");
              askToConfirm();
              setDeletedId(id);
            }}
          >
            <FaTrashAlt />
          </span>
          <span
            className="icon green"
            onClick={() => {
              navigate(`/edit/${contact._id}`);
            }}
          >
            <FaPen />
          </span>
        </td>
      </tr>
    </>
  );
};

export default Row;
