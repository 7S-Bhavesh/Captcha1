import React from 'react'
import Image from './Image'


function Header() {
  return (
    <>
      <section className="section primary-background bg-svg-1">
    <div id="home"></div>
    <header id="main-header" className="main-header section-content">
      <div className="main-header-content">
        <br/>
        <h2>Invisible Guardian</h2>
        <p>
          An AI-driven system analyzes environmental parameters, mouse movements, typing cadence, and device orientation in real-time to assess authenticity using behavioral biometrics and contextual cues.
          Modular and privacy-compliant, it integrates seamlessly with UIDAI's systems, offering a passive, real-time alternative to traditional CAPTCHA methods.
        </p>
      </div>
      <Image/>
    </header>
  </section>

    </>
  )
}


export default Header;
