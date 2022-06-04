import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  name: Yup.string()
    .max(60, 'Must be 60 characters or less')
    .required('Required'),
  body: Yup.string()
    .max(1000, 'Must be 1000 characters or less')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Required'),
})

const AddAnswer = ({ product_name, question_id, currentQBody, reloadFn, setAFalse}) => {

  //leaving this in case I have to undo Formik
  // const [answerResponses, setAnswerResponses] = useState({
  //   name: '',
  //   email: '',
  //   body: '',
  // });

  const [selectedFile, setSelectedFile] = useState('');
  const [previewSource, setPreviewSource] = useState([]);

  // const onAnswerChange = (e) => {
  //   const { name, value } = e.target;
  //   setAnswerResponses({...answerResponses, [name]: value});
  // }

  const submitAnswer = (values) => {
    // e.preventDefault();
    // console.log(values);

    axios.post('/api/upload', {data: previewSource})
      .then(res => {
        // console.log('res', res.data)

        axios.post(
          `/qa/questions/${question_id}/answers`,
          { ...values, ['photos']: res.data.data }
        )
          .then(() => reloadFn())
          .catch(err => console.log('err posting answer', err));

      })
      .catch(err => console.log('err', err))


      // console.log('answer submitted');
  }

  //formik code
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      body: '',
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      submitAnswer(values);
    }
  })

  //ESC key functionality
  const closeOnEscKey = (e) => {
    if((e.charCode || e.keyCode) === 27) {
      setAFalse();
    }
  }

  //cloudinary code
  const handleFileInputChange = (e) => {
    const files = e.target.files;
    // console.log(files);
    const fileArray = Object.values(files);
    fileArray.forEach(file => {
      // console.log(file);

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPreviewSource([...previewSource, reader.result]);
      }

    })
  }

  const uploadImage = (base64EncodedImage) => {
    // console.log(base64EncodedImage);
    axios.post('/api/upload', {data: base64EncodedImage})
  }

  useEffect (() => {
    document.body.addEventListener('keydown', closeOnEscKey)
    return function cleanup() {
      document.body.removeEventListener('keydown', closeOnEscKey)
    }
  }, [product_name]);


  return (
    <div className="modal answer-modal" onClick={(e) => setAFalse(e)}>
      <div className="modal-content answer-modal-content" onClick={(e) => {e.stopPropagation()}}>
        <div className="modal-header answer-modal-header">
        <button className="close-button" type="button" onClick={(e) => {reloadFn(e)}}>X</button>
          <h3 className="modal-title answer-modal-title">Submit your Answer</h3>
          <h4 className="modal-subtitle answer-modal-subtitle">{product_name}: {currentQBody}</h4>
        </div>
        <div className="modal-body answer-modal-body">
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="answer-name">Name*</label>
          <input
            className="qna-input input-name"
            id="answer-name"
            type="text"
            name="name"
            placeholder="Example: jackson543!"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="error-message">{formik.errors.name}</div>
          ) : null}
          <p className="name-message">For privacy reasons, do not use your full name or email address</p>
          <label className="label-titles">
            Answer*
              <textarea
                className="qna-input input-body"
                type="text"
                name="body"
                value={formik.values.body}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
          </label>
          {formik.touched.body && formik.errors.body ? (
            <div className="error-message">{formik.errors.body}</div>
          ) : null}
          <label className="label-titles">
            email*
              <input
                className="qna-input input-email"
                type="email"
                name="email"
                placeholder="jack@email.com"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
          </label>
          {formik.touched.email && formik.errors.email ? (
            <div className="error-message">{formik.errors.email}</div>
          ) : null}
          <p className="email-message">
            For authentication reasons, you will not be emailed
          </p>
          {previewSource.length <= 4 ? (
            <label className="label-titles">
              Upload Your Photos
                <input
                  className="form-input"
                  type="file"
                  name="photos"
                  onChange={handleFileInputChange}
                />
            </label>
          ) : null}

          {previewSource.length ?
            <div className="images">
              {previewSource.map(singleSource => (
                <img
                  key={singleSource}
                  src={singleSource}
                  alt="chosen"
                  style={{height: '100px'}}
                />
              ))}
            </div>
          : null}
          <br/>
          <div className="modal-footer answer-modal-footer">
            <input type="submit" value="submit"/>
          </div>
        </form>
      </div>
      </div>
    </div>
  );
}

export default AddAnswer;