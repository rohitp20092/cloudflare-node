import React, { useEffect, useState } from "react";
import axios from "axios";
const CryptoJS = require("crypto-js");




const Home = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [ipAddress, setApiAddress] = useState("");
console.log(ipAddress,"ip ip ip ip ip ip ip ip ip ip ip ip ip ip ip ip ip ip")

  const handleForm = async (e) => {
    e.preventDefault()
    let string = password.replace(/\s+/g, '');
    let hash = CryptoJS.MD5(string).toString();
     
    const data = {email:email,username: username ,password:hash,ipAdd:ipAddress?ipAddress:""};
    const res = await axios.post("http://localhost:8443/user",data);
        setUsername("")
        setEmail("")
        setPassword("")
    alert("data saved successfully")
  };


  const getIpAddress = async () => {
    const res = await axios.get("https://geolocation-db.com/json/");
    console.log(res.data,"datata dat data data dtata")
    setApiAddress(res.data.IPv4);
 };

  useEffect(() => {
    getIpAddress();
  }, []);

  return (
    <form>
      <div className="abc">
        <div className="container">
          <label>
            <b>Email</b>
          </label>
          <input
            type="text"
            placeholder="Enter Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>
            <b>username</b>
          </label>
          <input
            type="text"
            placeholder="Enter Username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label>
            <b>Password</b>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" onClick={handleForm}>
            Login
          </button>
          <label></label>
        </div>
      </div>
    </form>
  );
};

export default Home;
