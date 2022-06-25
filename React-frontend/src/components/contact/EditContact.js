import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const EditContact = () => {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [relationship, setStatus] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState({});

  //get the contact id:
  const { id } = useParams();
  console.log(id);

  // Lets first fetch the contact info and fill the form
  // Initialize all tasks into state from backend at component load
  useEffect(() => {
    const getContact = async () => {
      const contactFromServer = await fetchContact();
      setContact(contactFromServer);

      console.log("hello");
    };
    getContact();
  }, [id]);

  useEffect(() => {
    console.log("heeyyoppwww");
    setFullName(contact.fullName);
    setPhoneNumber(contact.phoneNumber);
    setStatus(contact.relationship);
    setEmail(contact.email);
  }, [contact]);

  // Get contact by its id
  const fetchContact = async () => {
    try {
      const res = await fetch(
        `http://localhost:3001/api/contact/getOne/?id=${id}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            "x-access-token": localStorage.getItem("access_token"),
          },
          // body: JSON.stringify(data),
        }
      );
      const response = await res.json();
      return response;
    } catch (err) {
      console.log(err);
    }
  };

  const saveToServer = async (data) => {
    console.log(data);
    const res = await fetch(
      `http://localhost:3001/api/contact/update/?id=${id}`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          "x-access-token": localStorage.getItem("access_token"),
        },
        body: JSON.stringify(data),
      }
    );
    const response = await res.json();
    console.log(response);
  };

  const validate = (e) => {
    e.preventDefault();

    // get the id from the local storage
    let user = localStorage.getItem("user_id");
    saveToServer({ fullName, phoneNumber, relationship, email, user });
    setFullName("");
    setPhoneNumber("");
    setStatus("");
    setEmail("");
  };

  return (
    <div className="add-contact">
      <div className="container">
        <h2>Update Contact</h2>
        <form>
          <label htmlFor="">Full Name</label>
          <input
            value={fullName}
            type="text"
            placeholder="Full Name"
            onChange={(e) => {
              setFullName(e.target.value);
            }}
          />
          <label htmlFor="">Phone Number</label>
          <input
            value={phoneNumber}
            type="text"
            placeholder="Phone Number"
            onChange={(e) => {
              setPhoneNumber(e.target.value);
            }}
          />
          <label htmlFor="">Relationship Status</label>
          <input
            value={relationship}
            type="text"
            placeholder="Relationship Status"
            onChange={(e) => {
              setStatus(e.target.value);
            }}
          />
          <label htmlFor="">Email</label>
          <input
            value={email}
            type="text"
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <label htmlFor="">Location</label>
          <input type="text" />
          <button type="submit" onClick={validate}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditContact;
