import React, { useState, useEffect } from "react";
import Row from "./Row";
import ConfirmDelete from "./ConfirmDelete";
import { FaFilter } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";

const ShowContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [reload, setReload] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [filter, setFilter] = useState("");
  const [option, setOption] = useState("");
  const [spare, setSpare] = useState([]);
  //Delete confirmation states
  const [showDelete, setShowDelete] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deletedId, setDeletedId] = useState("");

  //Filtering
  // let counter=0;
  const runSearch =  (e) => {
    e.preventDefault();

    // lets try one more time=====
    // if (!contacts.length){
    //   console.log('empty');
    //   console.log('option', option);
    //   console.log('filter', filter);
    //    setContacts(spare);
    //   if (counter<10){counter++; runSearch(e);}
    // }
    
    //End trial===================

    if (option === "all" || !filter) {
      setContacts(spare);
    }
    if (filter) {
      if (option === "start") {
        setContacts(
        contacts.filter((contact) =>
          String(contact.fullName).startsWith(String(filter))
        )
        );
      } else if (option === "end") {
        setContacts(
          contacts.filter((contact) =>
            String(contact.fullName).endsWith(String(filter))
          )
        );
      } else if (option === "include") {
        setContacts(
          contacts.filter((contact) =>
            String(contact.fullName).includes(String(filter))
          )
        );
      }
    }
  
  };

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

  // Dropdown filter inline
  const [displayDropdownStatus, setDisplayDropdownStatus] = useState(false);
  const toggleClassDropdown = () => {
    setDisplayDropdownStatus(!displayDropdownStatus);
    console.log(displayDropdownStatus);
  };

  // Dropdown Status filter search function
  const runFilterSearch = (status) => {
    if (status === "married" && contacts) {
      console.log("from married ", contacts);
      //   setContacts(spare);
      setContacts(
        contacts.filter((contact) => String(contact.relationship) === "married")
      );
    } else if (status === "single") {
      setContacts(
        contacts.filter((contact) => String(contact.relationship) === "single")
      );
    } else if (status === "divorced") {
      setContacts(
        contacts.filter(
          (contact) => String(contact.relationship) === "divorced"
        )
      );
    } else {
      setContacts(spare);
    }
    setDisplayDropdownStatus(!displayDropdownStatus);
  };


  // The Main Search Bar
  const [showLoopIcon, setShowLoopIcon] = useState(true);
  const [searchBarInput, setSearchBarInput] = useState('');
  const runSearchBar = (e) => {
    // console.log(e.target.value);
    if (e.target.value){
      setShowLoopIcon(false);
      // setOption("include");
      // setFilter(e.target.value);
      setSearchBarInput(e.target.value);
      // runSearch(e);
    }
    else{
      setShowLoopIcon(true);
    }
  }
  useEffect(() => {
    // setContacts(spare);
    // setContacts(
    //   contacts.filter((contact) =>
    //     String(contact.fullName).includes(String(searchBarInput))
    //   )
    // );
    //console.log(contacts)
  }, [searchBarInput]);
  //End main search bar

  return (
    <div className="container show-contact">
      <div className="header">
        <h1>Contacts List</h1>
        <div className="search-bar">
          <input type="search" placeholder="Search..." onChange={(e)=>{runSearchBar(e)}}/>
          {showLoopIcon && <span className="span-search-icon"><FaSearch/></span>}
        </div>
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
                setFilter(e.target.value);
              }}
            />
          )}{" "}
          {showSearch && (
            <input className="select" type="submit" value={"Filter"} />
          )}
        </form>
      </div>
      <hr />
      <div className="table">
        <table>
          <tr>
            <th>Full Name</th>
            <th>Phone Number</th>
            <th>
              Status{" "}
              <div className="dropdown-filter">
                {" "}
                <span className="filter-icon" onClick={toggleClassDropdown}>
                  <FaFilter />
                </span>
                <div
                  className={`dropdown-content ${
                    displayDropdownStatus ? "showMe" : ""
                  }`}
                >
                  <a
                    onClick={() => {
                      runFilterSearch("married");
                    }}
                  >
                    Married
                  </a>
                  <a
                    onClick={() => {
                      runFilterSearch("single");
                    }}
                  >
                    Single
                  </a>
                  <a
                    onClick={() => {
                      runFilterSearch("divorced");
                    }}
                  >
                    Divorced
                  </a>
                  <a
                    onClick={() => {
                      runFilterSearch("all");
                    }}
                  >
                    All
                  </a>
                </div>
              </div>
            </th>
            <th>Email</th>
            <th colSpan="2" className="col-times2">
              Location
            </th>
            <th></th>
          </tr>
          <tbody>
          {contacts && showLoopIcon ?
            contacts.map((contact, index) => {
              return (
                <Row
                  key={index}
                  contact={contact}
                  setReload={setReload}
                  setShowDelete={setShowDelete}
                  confirmDelete={confirmDelete}
                  setConfirmDelete={setConfirmDelete}
                  deletedId={deletedId}
                  setDeletedId={setDeletedId}
                />
              );
            })
            :
            contacts.filter((contact) =>
                String(contact.fullName).includes(String(searchBarInput))
              ).map((contact, index) => {
                return (
                  <Row
                    key={index}
                    contact={contact}
                    setReload={setReload}
                    setShowDelete={setShowDelete}
                    confirmDelete={confirmDelete}
                    setConfirmDelete={setConfirmDelete}
                    deletedId={deletedId}
                    setDeletedId={setDeletedId}
                  />
                );
              })
          }

            </tbody>
        </table>
      </div>
      {showDelete && (
        <ConfirmDelete
          setShowDelete={setShowDelete}
          setConfirmDelete={setConfirmDelete}
        />
      )}
    </div>
  );
};

export default ShowContacts;
