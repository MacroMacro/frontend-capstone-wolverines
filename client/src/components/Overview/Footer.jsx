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
    <FooterContainer>
      <FooterItem id ='box'>
        <a href ='#ContactUsForm'>Contact us</a>
      </FooterItem>
      <Overlay id = 'ContactUsForm'>
        <Wrapper id = 'formbackground'>
          <h2>Contact the Wolverines</h2>
          <Close href='#box'>&times;</Close>
            <Container>
              <form onSubmit = {sendEmail} id = 'contact'>
                <FormLabel>First Name</FormLabel>
                <Input type = 'text' onChange = {handleChange} value = {values['Name']} name = 'Name' placeholder = 'Your Name'></Input >
                <FormLabel>Email</FormLabel>
                <Input  type = 'text' onChange = {handleChange} value = {values['Email']} name = 'Email' placeholder = 'Your Email'></Input >
                <FormLabel>Subject</FormLabel>
                <TextArea id = 'contact' onChange = {handleChange} value = {values['Feedback']} name = 'Feedback' placeholder = 'Your Feedback Here'></TextArea>
                <Submit type = 'submit' value ='Submit'></Submit>
              </form>
            </Container>
          </Wrapper>

      </Overlay>
      <FooterItem><a href="#Nav">Back to top</a></FooterItem>
      <FooterItem>Team Wolverine @MacroMacro All rights reserved</FooterItem>
    </FooterContainer>
  );
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0,0,0,0.8);
  transition: opacity 500ms;
  visibility: hidden;
  opacity: 0;
  &:target {
    visibility: visible;
    opacity: 1;
  }
`;

const Close = styled.a`
  position: absolute;
  top: 20px;
  right: 30px;
  transition: all 200ms;
  font-size: 30px;
  font-weight: bold;
`;

const Container = styled.div`
  border-radius: 5px;
  padding: 20px 0;
`;

const Wrapper = styled.div`
  margin: 70px auto;
  padding: 20px;
  background: #e7e7e7;
  border-radius: 5px;
  width: 30%;
  position: relative;
  transition: all 2s ease-in-out;
  z-index: 100000;
`;

const FormLabel = styled.label`
  text-transform: capitalize;
  font-weight: 500;
  letter-spacing: 3px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid;
  border-radius: 5px;
  box-sizing: border-box;
  margin-top: 6px;
  margin-bottom: 16px;
  resize: vertical;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 1px solid;
  border-radius: 5px;
  box-sizing: border-box;
  margin-top: 6px;
  margin-bottom: 16px;
  resize: vertical;
`;

const Submit = styled.input`
  padding: 15px 50px;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-size: 15px;
  text-transform: uppercase;
  letter-spacing: 3px;
`;

const FooterContainer = styled.div`
  border-top: 2px solid;
  width: 100%;
  display: flex;
  margin: 20px 80px 0px 80px;
  padding-top: 10px;
`;

const FooterItem = styled.div`
  width : 33%;
  text-align: center;
`;