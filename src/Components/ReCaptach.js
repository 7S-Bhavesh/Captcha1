import React, { useRef, useState, useEffect } from 'react';

const generateCaptchaText = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let captcha = '';
  for (let i = 0; i < 6; i++) {
    captcha += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return captcha;
};

const Captcha = ({ onCaptchaChange }) => {
  const [captchaText, setCaptchaText] = useState(generateCaptchaText());
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    canvas.width = 200;
    canvas.height = 80;

    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = '36px Arial';
    ctx.fillStyle = '#000';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(captchaText, canvas.width / 2, canvas.height / 2);

    // Add noise or distortion
    ctx.strokeStyle = 'rgba(0,0,0,0.1)';
    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.stroke();
    }

    // Notify parent of the new CAPTCHA text
    onCaptchaChange(captchaText);
  }, [captchaText, onCaptchaChange]);

  const refreshCaptcha = () => {
    const newCaptchaText = generateCaptchaText();
    setCaptchaText(newCaptchaText);
  };

  return (
    <div>
      <canvas ref={canvasRef} />
      <button type="button"  style={{fontSize:'15px'}} onClick={refreshCaptcha}>Refresh CAPTCHA</button>
    </div>
  );
};

export default Captcha;
