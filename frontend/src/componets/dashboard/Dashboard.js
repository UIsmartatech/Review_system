import SidebarComponent from "../sidebar/sidebar";
import Dashboards from "../../pages/Dashboards";
import "./dashboard.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function DashboardComponent() {
  const [data, setData] = useState(null);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [profileImageUrl, setProfileImageUrl] = useState(null);

  //token variable
  const token = sessionStorage.getItem("token");
  const decoded = jwtDecode(token);



  useEffect(() => {

    axios
      .get("http://192.168.1.133:3000", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        
        if (response.data && response.data.token) {
          setData(response.data.token);
         
        } else {
          setMessage("login succusfull");
        }
      })
      .catch((err) => {
        setMessage("Unauthorized access");
      });
  }, []);
  useEffect(() => {
    fetchProfileImage();
  }, []);

  const fetchProfileImage = () => {
    
    axios
      .get("http://192.168.1.133:3000/profile/image", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        const imageUrl = response.data.imageUrl; 
        console.log(imageUrl);
        const filtertoken = decoded.name;
         setName(filtertoken);
         setProfileImageUrl(imageUrl);
      })
      .catch(error => {
        console.error('Error fetching profile image:', error);
      });
  };


  
  return (
    <div className="DashboardContainer">
      <div className="sidebar">
          <SidebarComponent />
      </div>
      <div className="mainContent">
        <div className="welcome-section">
          <div className="wecome-text">
            <h5> Hi, {name} </h5>
            {/* {data ? <p>Data: {data}</p> : <p>{message}</p>} */}
            <p>Welcome to the dashboard</p>
          </div>
          <div className="profile-part">
            <p> {name}</p>
            <img src={ profileImageUrl } className="responsive-circle" alt="Profile" />
          </div>
        </div>
        <div className="">
          <Dashboards />
        </div>
      </div>
    </div>
  );
}
export default DashboardComponent;
