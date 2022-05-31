import React, { useState, useEffect } from 'react';
import axios from 'axios';

//in terms of loading the photos, this will be done in the questions file I think, and it will need the info in the array, in order to make cloudinary requests for that specific photo.

const AddAnswer = ({ product_name, question_id, currentQBody, reloadFn, setAFalse, answerSubmit}) => {
  const [answerResponses, setAnswerResponses] = useState({
    name: '',
    email: '',
    body: '',
    photos: []
  });

  const [selectedFile, setSelectedFile] = useState('');
//TODO might have to change preview source to an object containing a photos:[] so that it does not begin as uncontrolled
  const [previewSource, setPreviewSource] = useState([]);

  const [fileInputState, setFileInputState] = useState('');


  const onAnswerChange = (e) => {
    const { name, value } = e.target;
    setAnswerResponses({...answerResponses, [name]: value});
  }

  const submitAnswer = (e) => {
    e.preventDefault();
    // console.log('preview source from onsubmit fn', previewSource);
    axios.post(`/qa/questions/${question_id}/answers`, { answerResponses })
      .then(() => reloadFn())
      .catch(err => console.log('err posting answer', err));
      console.log('answer submitted');
  }

  //ESC key functionality
  const closeOnEscKey = (e) => {
    if((e.charCode || e.keyCode) === 27) {
      setAFalse();
    }
  }

  //cloudinary code
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      console.log(reader.result, previewSource)
      let newArr = [...previewSource];
      newArr = newArr.concat(reader.result);
      console.log(newArr);
      setPreviewSource(newArr);
      //TODO - unsure about where this funciton goes tbh
      setAnswerResponses([...answerResponses.photos, previewSource]);
      uploadImage(newArr);

      // setAnswerResponses({...answerResponses, photos: reader.result});
    }
  }

  const handleFileInputChange = (e) => {
    const files = e.target.files;
    console.log(files);
    const fileArray = Object.values(files);
    fileArray.forEach(file => {
      console.log(file);
      previewFile(file);

    })
  }

  // const handleSubmitFile = (e) => {
  //   e.preventDefault();
  //   if(!previewSource) return;
  //   uploadImage(previewSource);
  // }

  const uploadImage = (base64EncodedImage) => {
    console.log(base64EncodedImage);
    axios.post('/api/upload', {data: base64EncodedImage})
      // .then((result) => previewFile(result.base64EncodedImage));
      // .catch((err) => console.log('error posting from FE', err));
  }

  useEffect (() => {
    document.body.addEventListener('keydown', closeOnEscKey)
    return function cleanup() {
      document.body.removeEventListener('keydown', closeOnEscKey)
    }
  }, []);


  return (
    <div className="modal answer-modal" onClick={(e) => setAFalse(e)}>
      <div className="modal-content answer-modal-content" onClick={(e) => {e.stopPropagation()}}>
        <div className="modal-header answer-modal-header">
        <button className="close-button" type="button" onClick={(e) => {reloadFn(e)}}>X</button>
          <h3 className="modal-title answer-modal-title">Submit your Answer</h3>
          <h4 className="modal-subtitle answer-modal-subtitle">{product_name}: {currentQBody}</h4>
        </div>
        <div className="modal-body answer-modal-body">
        <form onSubmit={(e) => {submitAnswer(e)}}>
          <label>
            Name*
              <input
                className="input input-name"
                type="text"
                name="name"
                placeholder="Example: jackson543!"
                value={answerResponses.name}
                onChange={(e) => onAnswerChange(e)}
                maxLength="60"
                required
              />
          </label>
          <p className="name-message">For privacy reasons, do not use your full name or email address</p>
          <label>
            Answer*
              <textarea
                className="input input-body"
                type="text"
                name="body"
                value={answerResponses.body}
                onChange={(e) => onAnswerChange(e)}
                maxLength="1000"
                required
              />
          </label>
          <label>
            email*
              <input
                className="input input-email"
                type="email"
                name="email"
                placeholder="jack@email.com"
                value={answerResponses.email}
                onChange={(e) => onAnswerChange(e)}
                maxLength="60"
                required
              />
          </label>
          <p className="email-message">For authentication reasons, you will not be emailed</p>
          {previewSource.length <= 5 ? (<label>
            Upload Your Photos
              <input
                className="form-input"
                type="file"
                name="photos"
                onChange={handleFileInputChange}
                // value={fileInputState}
                multiple
              />
          </label>) : (null)}

          {previewSource.length ?
            <div className="images">
            {previewSource.map(singleSource => (<img
            key={singleSource}
            src={singleSource}
              alt="chosen"
              style={{height: '100px'}}
              />))}
            </div>
          : (
            null)}
          <br/>
          <div className="modal-footer answer-modal-footer">
            {/* {answerResponses.photos.length <= 5 ? (
            <input type="submit" value="submit"/>
            ) : (
              null
            )} */}
            <input type="submit" value="submit"/>
          </div>
        </form>
      </div>
      </div>
    </div>
  );
}

export default AddAnswer;