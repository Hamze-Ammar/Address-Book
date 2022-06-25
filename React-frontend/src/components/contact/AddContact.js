import { useState } from "react";


const AddContact = () => {
  // const [editMode, setEditMode] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [relationship, setStatus] = useState("");
  const [email, setEmail] = useState("");
  const [alert, setAlert] = useState(false);


  const saveToServer = async (data) => {
    console.log(data);
    const res = await fetch("http://localhost:3001/api/contact/add", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "x-access-token": localStorage.getItem("access_token"),
      },
      body: JSON.stringify(data),
    });
    const response = await res.json();
    console.log(response);
  }

  const validate = (e) => {
    e.preventDefault();
    setAlert(false);
    if (!fullName || !phoneNumber || !relationship || !email){
      setAlert(true);
      return;
    }
    // get the id from the local storage
    let user = localStorage.getItem("user_id");
    saveToServer({fullName, phoneNumber, relationship, email, user });
    setFullName('');
    setPhoneNumber('');
    setStatus('');
    setEmail('');
  }

  return (
    <div className="add-contact">
      <div className="container">
        <h2>Add New Contact</h2>
        <p>Please Fill out all fields</p>
        <p className="alert">{alert && "All fields required" }</p> 
        <form>
          <label htmlFor="">Full Name</label>
          <input
            value = {fullName}
            type="text"
            placeholder="Full Name"
            onChange={(e) => {
              setFullName(e.target.value);
            }}
          />
          <label htmlFor="">Phone Number</label>
          <input
          value = {phoneNumber}
            type="text"
            placeholder="Phone Number"
            onChange={(e) => {
              setPhoneNumber(e.target.value);
            }}
          />
          <label htmlFor="">Relationship Status</label>
          <input
          value = {relationship}
            type="text"
            placeholder="Relationship Status"
            onChange={(e) => {
              setStatus(e.target.value);
            }}
          />
          <label htmlFor="">Email</label>
          <input
          value = {email}
            type="text"
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <label htmlFor="">Location</label>
          <input type="text" />
          <button type="submit" onClick={validate}>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddContact;
