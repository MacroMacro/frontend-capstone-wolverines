import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AddQuestion(product_id) {
  const [responses, setResponses] = useState({
    question_id: '',
    asker_name: '',
    question_body: '',
    question_date: '',
    question_helpfulness: 0,
    reported: false,
    answers: '',
  });

  console.log('responses: ', responses);

  const onChange = (e) => {
    const { name, value } = e.target
    setResponses({...responses, [name]: value});
  }
  /*
  TODO on submit, do an axios post to the questions endpoint using the props
  on submit add a question id, and capture the date
  */
  return(
    <div>
      <form onSubmit={() => {console.log('submitted')}}>
        <label>
          Name:
          <input
          onChange={onChange}
          type="text"
          name="asker_name"
          value={responses.asker_name}
          onChange={(e) => onChange(e)}
          />
        </label>
        {' '}
        <label>
          Question:
          <input
          onChange={onChange}
          type="text"
          name="question_body"
          value={responses.question_body}
          onChange={(e) => {onChange(e)}}
          />
        </label>
        {' '}
        <input
        type="submit"
        value="Submit"
        />
      </form>
    </div>
  );
}

export default AddQuestion