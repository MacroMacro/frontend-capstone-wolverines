import React, { useState } from 'react';
import styled from 'styled-components';
import emailjs from 'emailjs-com';

export default function footer () {

  const [values, setValues] = useState({
    'Name': '',
    'Email': '',
    'Feedback': ''
  });

  const handleChange = (e) => {
    e.persist();
    console.log('form', e.target.name, e.target.value)
    setValues(values => ({
      ...values,
      [e.target.name]: e.target.value
    }));
  }

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.send('service_4ivfdel', 'template_dyy1k7x', values, 'PXqCpmXEpADRW8mqu')
    .then((response)=> {console.log('success')})
    .catch((err) => {console.log('ERR', err)})
    .then(() => setValues({
      'Name': '',
      'Email': '',
      'Feedback': ''
    }));
  }
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
              <form onSubmit = {sendEmail}>
                <FormLabel>First Name</FormLabel>
                <input type = 'text' onChange = {handleChange} value = {values['Name']} name = 'Name' placeholder = 'Your Name'></input>
                <FormLabel>Email</FormLabel>
                <input type = 'text' onChange = {handleChange} value = {values['Email']} name = 'Email' placeholder = 'Your Email'></input>
                <FormLabel>Subject</FormLabel>
                <textarea onChange = {handleChange} value = {values['Feedback']} name = 'Feedback' placeholder = 'Your Feedback Here'></textarea>
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

const FormLabel = styled.label`
  text-transform: capitalize;
  font-weight: 500;
  letter-spacing: 3px;
`;
