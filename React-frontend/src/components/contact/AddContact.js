import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useStore from "../zustand/Store";
import { FaMapMarkedAlt } from 'react-icons/fa';
import { FaMailBulk } from 'react-icons/fa';
import { FaUserAlt } from 'react-icons/fa';
import { FaPhoneAlt } from 'react-icons/fa';
import { FaIdCard } from 'react-icons/fa';


const AddContact = () => {
  // const [editMode, setEditMode] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [relationship, setStatus] = useState("");
  const [email, setEmail] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [alert, setAlert] = useState(false);
  let navigate = useNavigate();

  //Testing Zustand
  // const bears = useStore(state => state.bears)
  // console.log("bears: ", bears);
  // useStore.setState({ fullName: "hamze" });
  // console.log(useStore.getState().fullName)
  // console.log(useStore.getState().phoneNumber)
  
  // onLoad fetch info from store/Zustand if any:
  useEffect(() => {
    setFullName(useStore.getState().fullName);
    setPhoneNumber(useStore.getState().phoneNumber);
    setStatus(useStore.getState().relationship);
    setEmail(useStore.getState().email);
    setLatitude(useStore.getState().latitude);
    setLongitude(useStore.getState().longitude);
  }, []);


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
  };

  const validate = (e) => {
    e.preventDefault();
    setAlert(false);
    if (!fullName || !phoneNumber || !relationship || !email || !latitude || !longitude) {
      setAlert(true);
      return;
    }
    // get the id from the local storage
    let user = localStorage.getItem("user_id");
    let location = {
      "type": "Point",
      "coordinates": [longitude, latitude]
    }
    saveToServer({ fullName, phoneNumber, relationship, email, location, user });
    setFullName("");
    setPhoneNumber("");
    setStatus("");
    setEmail("");
    setLatitude("");
    setLongitude("");
  };

  // Save info into store before navigate to map
  const saveInfo = () => {
    useStore.setState({ fullName });
    useStore.setState({ phoneNumber });
    useStore.setState({ relationship });
    useStore.setState({ email });
  }

  return (
    <div className="add-contact">
      <div className="container">
      <span className="close" onClick={()=>{navigate('/');}}>&times;</span>
        <h2>Add New Contact</h2>
        <p>Please Fill out all fields</p>
        <p className="alert">{alert && "All fields required"}</p>
        <form>
          <label htmlFor=""><FaUserAlt/> {" "} Full Name</label>
          <input
            value={fullName}
            type="text"
            placeholder="Full Name"
            onChange={(e) => {
              setFullName(e.target.value);
            }}
          />
          <label htmlFor=""><FaPhoneAlt/> {" "} Phone Number</label>
          <input
            value={phoneNumber}
            type="text"
            placeholder="Phone Number"
            onChange={(e) => {
              setPhoneNumber(e.target.value);
            }}
          />
          <label htmlFor=""><FaIdCard/> {" "} Relationship Status</label>
          <input
            value={relationship}
            type="text"
            placeholder="Relationship Status"
            onChange={(e) => {
              setStatus(e.target.value);
            }}
          />
          <label htmlFor=""><FaMailBulk/> {" "}Email</label>
          <input
            value={email}
            type="text"
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <label htmlFor="">
          <FaMapMarkedAlt />{" "}
            Location{" "}
            <a
              onClick={() => {
                saveInfo();
                navigate("/map1");
              }}
              className="location-arrow"
            >
              Choose Location
            </a>{" "}
          </label>
          <input type="text" value={latitude} placeholder="latitude " />
          <input type="text" value={longitude} placeholder="longitude" />
          <button type="submit" onClick={validate}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddContact;
