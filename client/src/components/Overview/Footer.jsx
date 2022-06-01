import React, { useState } from 'react';
import styled from 'styled-components';

export default function footer () {
  return (
    <div className = 'footer'>
      <div className = 'footer-item' id ='box'>
        <a href ='#ContactUsForm'>Contact us</a>
      </div>
      <div className = 'overlay' id = 'ContactUsForm'>
        <div className = 'wrapper' id = 'formbackground'>
          <h2>Contact the Wolverines</h2>
          <a href='#' className='close'>&times;</a>
          <div className = 'ContactContent'></div>
            <div className = 'contactContainer'>
              <form>
                <label>First Name</label>
                <input type = 'text' placeholder = 'Your First Name'></input>
                <label>Last Name</label>
                <input type = 'text' placeholder = 'Your Last Name'></input>
                <label>Email</label>
                <input type = 'text' placeholder = 'Your Email'></input>
                <label>Subject</label>
                <textarea placeholder = 'Your Feedback Here'></textarea>
                <input type = 'submit' value ='Submit'></input>
              </form>
            </div>
          </div>

      </div>
      <div className = 'footer-item'><a href="#Nav">Back to top</a></div>
      <div className = 'footer-item'>Team Wolverine @MacroMacro All rights reserved</div>
    </div>
  );
}
