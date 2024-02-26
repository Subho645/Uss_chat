import React, { useState } from 'react';
import logo from "../../images/logo1.png";
import "./join.css";
import { Link } from 'react-router-dom';

let user;

const Join = () => {
  const [userName, setUserName] = useState('');

  const sendUser = () => {
    user = userName;
    setUserName('');
  };

  return (
    <div className="JoinPage">
      <div className="JoinContainer">
        <img src={logo} alt="logo" />
        <h1>USS CHAT</h1>
        <form>
          <input placeholder='Enter your Name' type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
          <Link to={{ pathname: "/chat", state: { user } }}><button onClick={sendUser} className="joinbtn">LOGIN</button></Link>
        </form>
      </div>
    </div>
  );
}

export default Join;
export { user }; // Export user as a named export
