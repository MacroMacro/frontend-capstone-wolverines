import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import './questionFormStyles.css'

function AddQuestion({ product_id, questionSubmit, product_name, setQFalse }) {
  const [responses, setResponses] = useState({
    name: '',
    email: '',
    question: '',
    'product_id': product_id,
  });

  console.log('responses: ', responses);

  const onChange = (e) => {
    const { name, value } = e.target
    setResponses({...responses, [name]: value});
  }

  const submitQuestion = (e) => {
    e.preventDefault();
    console.log('question submitted');

    axios.post(`/qa/questions`, { responses })
      .then(() => questionSubmit())
      .catch(err => console.log('err', err));
  }

  //ESC key functionality
  const closeOnEscKey = (e) => {
    if((e.charCode || e.keyCode) === 27) {
      setQFalse();
    }
  }

  useEffect (() => {
    document.body.addEventListener('keydown', closeOnEscKey)
    return function cleanup() {
      document.body.removeEventListener('keydown', closeOnEscKey)
    }
  }, []);

  return(
    <div className="question-modal" onClick={(e) => setQFalse(e)}>
      <div className="question-modal-content" onClick={(e) => {e.stopPropagation()}}>
        <div className="question-modal-header">
        <button className="close-button" type="button" onClick={(e) => questionSubmit(e)}>X</button>
          <h3 className="question-modal-title">Ask Your Question</h3>
          <h4 className="question-modal-subtitle">About the {product_name}</h4>
        </div>
        <div className="question-modal-body">
          <form onSubmit={(e) => {submitQuestion(e)}}>
            <label>
              Name*
              <input
                className="input input-name"
                type="text"
                name="name"
                placeholder="Example: jackson11"
                value={responses.name}
                onChange={(e) => onChange(e)}
                required
              />
            </label>
            <p className="name-message">For privacy reasons, do not use your full name or email address</p>
            <label>
              Question*
              <textarea
                className="input input-body"
                type="text"
                name="question"
                value={responses.question}
                onChange={(e) => onChange(e)}
                required
              />
            </label>
            <label>
              Email*
              <input
                className="input input-email"
                type="email"
                name="email"
                value={responses.email}
                onChange={(e) => onChange(e)}
                required
              />
            </label>
            <p className="email-message">For authentication reasons, you will not be emailed</p>
            <br />
            <div className="question-modal-footer">
              <input type="submit" value='Submit' />
            </div>
        </form>
      </div>
      </div>
    </div>
  );
}

export default AddQuestion