import React, { useState } from 'react';
import axios from 'axios';
// import AddAnswer from './AddAnswer.jsx';
import {format, parseISO} from 'date-fns';

//States
const Question = ({ question, qHelpfulness, updateAnswerID, toggleAnswerForm }) => {
  //commented out stuff is bc i had to move functionality from this component to app.jsx

  const [showMoreAs, setShowMoreAs] = useState(false);

  const [helpfulnessClick, setHelpfulnessClick] = useState(false);

  // const [addAnswerClick, setAddAnswerClick] = useState(false);

  const [answerHelpfulnessClick, setAnswerHelpfulnessClick] = useState(false);

  const [qReportClick, setQReportClick] = useState(false);

  const [aReportClick, setAReportClick] = useState(false);

  const changeQuestions = () => {
    setShowMoreAs(!showMoreAs);
  }
  //TODO probs will need to delete these next 2 fns
  const changeAddAnswer = () => setAddAnswerClick(!addAnswerClick);

  const addAnswerFn = () => {
    console.log('jksdahjkrl');
    qHelpfulness();
  }

  const helpfulnessFn = (id) => {
    if (!helpfulnessClick) {
      console.log(id);
      setHelpfulnessClick(true);
      axios.put(`/qa/questions/${id}/helpful`)
        .then(() => qHelpfulness())
        .catch(err => console.log('error putting', err));
    } else if (helpfulnessClick) {
      console.log('button already been clicked!')
    }
  }

  const answersHelpfulnessFn = (answerID) => {
    if (!answerHelpfulnessClick) {
      console.log(answerID);
      setAnswerHelpfulnessClick(true);
      axios.put(`/qa/answers/${answerID}/helpful`)
        .then(() => qHelpfulness())
        .catch(err => console.log('error incrementing helpful for answers', err));
    } else if (answerHelpfulnessClick) {
      console.log('answer helpfulness button already clicked!');
    }
   }

   const answerReportFn = (answerID) => {
     if (!aReportClick) {
       console.log(answerID);
       setAReportClick(true);
       axios.put(`/qa/answers/${answerID}/report`)
        .then(() => qHelpfulness())
        .catch(err => console.log('error reporting this answer', err));
     } else if (aReportClick) {
       console.log('report button already clicked');
     }
   }
  // console.log(question.question_id);
  return (
    <>
      <div style={{ display: "flex", justifyContent: 'space-between' }}>
        <h2 style={{ margin: 0 }}>
          Q:{' '}{question.question_body}
        </h2>
        <div style={{ marginTop: '6px' }}>
          <span style={{paddingRight: '10px'}}>
            Helpful?
            {' '}
            <span type='button' onClick={() => helpfulnessFn(question.question_id)} style={{ textDecoration: "underline" }}>Yes</span>
            {` (${question.question_helpfulness})`}
          </span>
          |
          <span type="button" onClick={() => {toggleAnswerForm(question.question_id, question.question_body)}} style={{paddingLeft: '10px'}}>
            Add Answer
          </span>
          {/* {addAnswerClick ? <AddAnswer question_id={question.question_id} reloadFn={qHelpfulness}/> : null} */}
        </div>
      </div>
      {question.firstTwoAnswers.map(oneAnswer => (
        <div key={oneAnswer.id}>
          <h3>
            A:{' '}{oneAnswer.body}
          </h3>
          <div>
            <span>
              {`by ${oneAnswer.answerer_name}, ${format(parseISO(oneAnswer.date), 'MMMM do, yyyy')} `}
            </span>
              | Helpful?
              {' '}
              <span
                type='button'
                onClick={()=>{answersHelpfulnessFn(oneAnswer.id)}}
                style={{ textDecoration: "underline" }}
              >
                Yes
              </span>
              {` (${oneAnswer.helpfulness}) | `}
              <span
                type='button'
                onClick={()=>{answerReportFn(oneAnswer.id)}}
                style={{ textDecoration: "underline"}}
                >
                  Report
                </span>
          </div>
        </div>
      ))}
      {showMoreAs && question.restOfAnswers.map(oneAnswer => (
        <div key={oneAnswer.id}>
          <h3>
            A:{' '}{oneAnswer.body}
          </h3>
          <div>
            <span>
              {`by ${oneAnswer.answerer_name}, ${oneAnswer.date} `}
            </span>
              | Helpful?
              {' '}
              <span
                type='button'
                onClick={()=>{answersHelpfulnessFn(oneAnswer.id)}}
                style={{ textDecoration: "underline" }}
              >
                Yes
              </span>
              {` (${oneAnswer.helpfulness}) | `}
              <span
                type='button'
                onClick={()=>{answerReportFn(oneAnswer.id)}}
                style={{ textDecoration: "underline"}}
                >
                  Report
                </span>
          </div>
        </div>
      ))}
      {question.restOfAnswers.length ? (
        <div>
          <span
          type="button"
          onClick={changeQuestions}
          >
            {`${showMoreAs ? 'Collapse' : 'See More'} Answers`}
          </span>
        </div>
      ) : null }
    </>
  )
}

export default Question;