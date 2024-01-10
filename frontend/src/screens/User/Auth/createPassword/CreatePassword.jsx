import React from 'react';
import { Link } from 'react-router-dom';
import './CreatePassword.scss';

const CreatePassword = () => {
  const handleSubmit = () => {};
  return (
    <div className="create-container">
      <form onSubmit={handleSubmit} className="create-form">
        <div className="heading">Create Password</div>
        <p>Password must have</p>
        <ul className="unorderlist">
          <li>have at least 8 character</li>
          <li>have at least one upper case</li>
          <li>have at least one special character (!, %, @, #, etc.)</li>
        </ul>
        <div className="sendotp">
          <div className="input-group">
            <label htmlFor="password">New Password</label>
            <input
              required
              type="password"
              name="password"
              id="password"
              placeholder="Enter New Password"
            />
          </div>
          <div className="input-group">
            <label htmlFor="conpassword">Confirm New Password</label>
            <input
              required
              type="password"
              name="conpassword"
              id="conpassword"
              placeholder="ERnter Confirn New Password"
            />
          </div>
        </div>

        <div className="input-group">
          <Link to="/home" className="login-btn">
            Save
          </Link>
        </div>
      </form>
    </div>
  );
};

export default CreatePassword;
