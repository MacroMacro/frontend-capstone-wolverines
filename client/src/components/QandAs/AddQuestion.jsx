import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  name: Yup.string()
    .max(60, 'Must be 60 characters or less')
    .required('Required'),
  question: Yup.string()
    .max(1000, 'Must be 1000 characters or less')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Required'),
})


function AddQuestion({ product_id, questionSubmit, product_name, setQFalse }) {
  //leaving this in case I have to undo Formik
  // const [responses, setResponses] = useState({
  //   name: '',
  //   email: '',
  //   question: '',
  // });

  // console.log('responses: ', values);

  // const onChange = (e) => {
  //   const { name, value } = e.target
  //   setResponses({...responses, [name]: value});
  // }

  const submitQuestion = (values) => {
    console.log('question submitted');

    axios.post(`/qa/questions`, { ...values, ['product_id']: product_id })
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
  }, [product_id]);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      question: '',
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      submitQuestion(values);
    }
  })

  return(
    <div className="modal question-modal" onClick={(e) => setQFalse(e)}>
      <div className="modal-content question-modal-content" onClick={(e) => {e.stopPropagation()}}>
        <div className="question-modal-header">
        <button className="close-button" type="button" onClick={(e) => questionSubmit(e)}>X</button>
          <h3 className="question-modal-title">Ask Your Question</h3>
          <h4 className="question-modal-subtitle">About the {product_name}</h4>
        </div>
        <div className="question-modal-body">
          <form onSubmit={formik.handleSubmit}>
              <label htmlFor="question-name">Name*</label>
              <input
                id="question-name"
                className="input input-name"
                type="text"
                name="name"
                placeholder="Example: jackson11"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                // value={responses.name}
                // onChange={(e) => onChange(e)}
                // required
              />
              {formik.touched.name && formik.errors.name ? (
              <div className="error-message">{formik.errors.name}</div>
              ) : null}
            <p className="name-message">For privacy reasons, do not use your full name or email address</p>
            <label>
              Question*
              <textarea
                className="input input-body"
                type="text"
                name="question"
                value={formik.values.question}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                // value={responses.question}
                // onChange={(e) => onChange(e)}
                // required
              />
            </label>
            {formik.touched.question && formik.errors.question ? (
            <div className="error-message">{formik.errors.question}</div>
          ) : null}
            <label>
              Email*
              <input
                className="input input-email"
                type="email"
                name="email"
                placeholder="jack@email.com"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                // value={responses.email}
                // onChange={(e) => onChange(e)}
                // required
              />
            </label>
            {formik.touched.email && formik.errors.email ? (
            <div className="error-message">{formik.errors.email}</div>
          ) : null}
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