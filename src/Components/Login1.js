import React from 'react'
import { useState } from 'react';
import ReCaptach from './ReCaptach';

function Login1() {
    const [captchaValue, setCaptchaValue] = useState('');
  const [userInput, setUserInput] = useState('');
  const [message, setMessage] = useState('');
  const [captcha1, setCaptcha1] = useState(false);

  const handleCaptchaChange = (newCaptcha) => {
    setCaptchaValue(newCaptcha);
  };

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleCaptchaValidation = () => {
    const normalizedUserInput = userInput.trim().toUpperCase();
    const normalizedCaptchaValue = captchaValue.toUpperCase();
    
    if (normalizedUserInput === normalizedCaptchaValue) {
      setCaptcha1(true);
      setMessage('CAPTCHA correct!');
    } else {
      setCaptcha1(false);
      setMessage('CAPTCHA incorrect. Please try again.');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!captcha1) {
      setMessage('Please verify the CAPTCHA before submitting.');
      return;
    }
    setMessage('Form submitted successfully!');
  };
  return (

    <div className="container-lg">
    <div className="row">
      <div style={{ width: "40%", margin: "25px auto" }}>
        <h3 style={{ fontSize:'34px', textAlign: "center" }}>Login Page</h3>
        
        
        <form method="POST" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>UserName:</label>
            <input
              type="text"
              name="UserName"
              className="form-control"
             placeholder='UserName'
              required
            />
          </div>
          <br/>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="Password"
              className="form-control"
              placeholder="Password"
              required
            />
          </div>
          <br/>

          <label>Enter Captcha</label>
          <div className="form-row">
                <div>
                  <ReCaptach onCaptchaChange={handleCaptchaChange} />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter CAPTCHA"
                    value={userInput}
                    onChange={handleInputChange}
                    required
                  />
                  <br/>
                  <button style={{fontSize:'18px'}}
                    type="button"
                    className="btn btn-primary mt-3"
                    onClick={handleCaptchaValidation}
                   >
                    Check Captcha
                  </button>
                </div>
              </div>
              <div className="message">
                {message}
              </div>

              <div className="form-group">
                <button style={{fontSize:'18px'}}
                  type="submit"
                  className="btn btn-lg btn-success btn-block mt-3"
                  disabled={!captcha1}
                >
                  Submit
                </button>
                <br/><br/><br/><br/><br/><br/>
              </div>
            </form>
            
          </div>
          
        </div>
        
      </div>
      
      
  )
}

export default Login1
