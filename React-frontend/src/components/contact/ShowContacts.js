import React, { useState, useEffect } from "react";
import Row from "./Row";

const ShowContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [reload, setReload] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [filter, setFilter] = useState("");
  const [option, setOption] = useState("");
  const [spare, setSpare] = useState([]);
//   console.log(filter);
//   console.log(option);

  //Filtering
  const runSearch = (e) => {
    e.preventDefault();
    console.log(e);
    if (option==="all" || !filter){
        setContacts(spare);
    }
    if (filter) {
      if (option === "start") {
        setContacts(
          contacts.filter(
            (contact) => String(contact.fullName).startsWith(String(filter))
          )
        );
      }
      else if (option==="end"){
        setContacts(
            contacts.filter(
              (contact) => String(contact.fullName).endsWith(String(filter))
            )
          );
      }
      else if (option==="include"){
        setContacts(
            contacts.filter(
              (contact) => String(contact.fullName).includes(String(filter))
            )
          );
      }
      }
    }
  

  // Initialize all tasks into state from backend at component load
  useEffect(() => {
    const getContacts = async () => {
      const contactsFromServer = await fetchContacts();
      setContacts(contactsFromServer);
      setSpare(contactsFromServer);
    };
    getContacts();
    //console.log(contacts)
  }, [reload]);

  const fetchContacts = async () => {
    try {
      let id = localStorage.getItem("user_id");
      const res = await fetch(
        `http://localhost:3001/api/contact/getByUserID?id=${id}`,
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

  return (
    <div className="container show-contact">
      <div className="header">
        <h1>Contacts List</h1>
        <form onSubmit={runSearch}>
          <label htmlFor="">Filter Names By</label>{" "}
          <select
            className="select"
            id="search-type"
            name="search-type"
            onChange={(e) => {
              setShowSearch(true);
              setOption(e.target.value);
            }}
          >
            <option value="">--Select--</option>
            <option value="start">Start With</option>
            <option value="end">End With</option>
            <option value="include">Include</option>
            <option value="all">Display all</option>
          </select>{" "}
          {showSearch && (
            <input
              className="select"
              type="search"
              name="filter"
              value={filter}
              onChange={(e) => {
                console.log("hi");
                setFilter(e.target.value);
              }}
            />
          )}{" "}
          {showSearch && <input className="select" type="submit" />}
        </form>
      </div>
      <hr />
      <div className="table">
        <table>
          <tr>
            <th>Full Name</th>
            <th>Phone Number</th>
            <th>Status</th>
            <th>Email</th>
            <th colspan="2">Location</th>
            <th>...</th>
          </tr>
          {contacts &&
            contacts.map((contact) => {
              return <Row contact={contact} setReload={setReload} />;
            })}
          {/* {contacts.filter((contact)=> contact.fullName == filter ).length} */}
        </table>
      </div>
    </div>
  );
};

export default ShowContacts;
