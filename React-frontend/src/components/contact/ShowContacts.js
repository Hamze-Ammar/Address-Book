import React, { useState, useEffect } from 'react'
import Row from './Row';

const ShowContacts = () => {
    const [contacts, setContacts] = useState([]);
    const [reload, setReload] = useState("");

    // Initialize all tasks into state from backend at component load
  useEffect(() => {
    const getContacts = async () => {
      const contactsFromServer = await fetchContacts();
      setContacts(contactsFromServer);
    };
    getContacts();
    console.log(contacts)
  }, [reload]);


  const fetchContacts = async () => {
    try {
        let id = localStorage.getItem("user_id")
        const res = await fetch(`http://localhost:3001/api/contact/getByUserID?id=${id}`, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "x-access-token": localStorage.getItem("access_token"),
            },
            // body: JSON.stringify(data),
        });
        const response = await res.json();
        return response;
    }
    catch (err){
        console.log(err);
    }
  };

  return (
    <div className='container show-contact'>
        <div className="header">
            <h1>Contacts List</h1>
            <label htmlFor="">Search</label>
            <input type="search" />
        </div>
        <hr />
        <div className="table">
        <table>
            <tr>
                <th>Full Name</th>
                <th>Phone Number</th>
                <th>Status</th>
                <th>Email</th>
                <th>Location</th>
                <th>...</th>
            </tr>
            {contacts && contacts.map((contact)=>{
               return <Row contact={contact} setReload={setReload} />
            })}
            </table>
        </div>
    </div>
  )
}

export default ShowContacts