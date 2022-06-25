import { useState } from "react";

const AddContact = () => {
  const [full_name, setFullName] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [status, setStatus] = useState("");
  const [email, setEmail] = useState("");
  const [alert, setAlert] = useState(false);

  const validate = (e) => {
    e.preventDefault();
    setAlert(false);
    if (!full_name || !phone_number || !status || !email){
      setAlert(true);
      return;
    }
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
            type="text"
            placeholder="Full Name"
            onChange={(e) => {
              setFullName(e.target.value);
            }}
          />
          <label htmlFor="">Phone Number</label>
          <input
            type="text"
            placeholder="Phone Number"
            onChange={(e) => {
              setPhoneNumber(e.target.value);
            }}
          />
          <label htmlFor="">Relationship Status</label>
          <input
            type="text"
            placeholder="Relationship Status"
            onChange={(e) => {
              setStatus(e.target.value);
            }}
          />
          <label htmlFor="">Email</label>
          <input
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
