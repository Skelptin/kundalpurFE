import { useState } from 'react';
import VerifyForgot from './verifyForgot';
import logo from '../../../../assets/sideimg.jpeg';
import axios from 'axios';
import { backendApiUrl } from '../../../../config/config';
import Swal from 'sweetalert2';
import './forgot.scss';
const Forgot = () => {
  const [verify, setVerify] = useState(false);
  const [email, setEmail] = useState('');

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await axios.post(`${backendApiUrl}user/forgot-password`, {
      email: email,
    });

    if (data.status) {
      Swal.fire('Great!', data.message, 'success');
    }
  };

  const handleVerify = async (otp) => {
    setVerify(false);

    const { data } = await axios.post(`${backendApiUrl}user/forgot-password`, {
      email: email,
    });

    setEmail(emailAddress);
  };

  const EmailInput = () => {
    return (
      <div className="mainlogin-div">
        <img className="img-container" src={logo} alt="logo " />

        <div className="forgot-container">
          <form onSubmit={handleSubmit} className="forgot-form">
            <div className="heading">Forgot Password</div>
            <p>Enter the registered phone number .</p>
            <div className="sendotp">
              <div className="input-group">
                <label htmlFor="email">Phone Number</label>
                <input
                  required
                  className="remove_underline"
                  name="email"
             
                  id="email"
                  value={email}
                  onChange={handleInputChange}
                  placeholder="enter email"
                />
              </div>
            </div>

            <div className="input-group">
              <button type="submit" className="login-btn">
                continue
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  return (
    <>
      {!verify ? (
        <EmailInput />
      ) : (
        <VerifyForgot
          title={'Verification required'}
          description={
            "To continue, complete this verification step. We've sent an OTP to the email"
          }
          emaildesc={email}
          handleVerify={handleVerify}
        />
      )}
    </>
  );
};

export default Forgot;
