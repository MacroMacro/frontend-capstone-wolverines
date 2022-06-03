import React, { useState } from 'react';
import axios from 'axios';
// import AddAnswer from './AddAnswer.jsx';
import {format, parseISO} from 'date-fns';

//States
const Question = ({ question, reloadFn, updateAnswerID, toggleAnswerForm }) => {
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
    // console.log('jksdahjkrl');
    reloadFn();
  }

  const helpfulnessFn = (id) => {
    if (!helpfulnessClick) {
      // console.log(id);
      setHelpfulnessClick(true);
      axios.put(`/qa/questions/${id}/helpful`)
        .then(() => reloadFn())
        .catch(err => console.log('error putting', err));
    } else if (helpfulnessClick) {
      console.log('button already been clicked!')
    }
  }

  const answersHelpfulnessFn = (answerID) => {
    if (!answerHelpfulnessClick) {
      // console.log(answerID);
      setAnswerHelpfulnessClick(true);
      axios.put(`/qa/answers/${answerID}/helpful`)
        .then(() => reloadFn())
        .catch(err => console.log('error incrementing helpful for answers', err));
    } else if (answerHelpfulnessClick) {
      console.log('answer helpfulness button already clicked!');
    }
   }

   const answerReportFn = (answerID) => {
     if (!aReportClick) {
      //  console.log(answerID);
       setAReportClick(true);
       axios.put(`/qa/answers/${answerID}/report`)
        .then(() => reloadFn())
        .catch(err => console.log('error reporting this answer', err));
     } else if (aReportClick) {
       console.log('report button already clicked');
     }
   }
  // console.log(question.question_id);
  return (
    <>
      <div style={{ display: "flex", justifyContent: 'space-between' }}>
        <h3 className="question-question"><span className="big-Q">Q: </span>
        <span className="question-body">
          {question.question_body}
        </span>
        </h3>
        <div style={{ marginTop: '6px' }}>
          <span className="right-side helpful">
            Helpful?
            {' '}
            <span type='button' onClick={() => helpfulnessFn(question.question_id)} style={{ textDecoration: "underline" }}>Yes</span>
            {` (${question.question_helpfulness})`}
          </span>
          |
          <span type="button" className="right-side add-answer" onClick={() => {toggleAnswerForm(question.question_id, question.question_body)}}>
            Add Answer
          </span>
        </div>
      </div>
      {question.firstTwoAnswers.map(oneAnswer => (
        <div key={oneAnswer.id}>
          <h4 className="question-answer">
            A:{' '}{oneAnswer.body}
          </h4>
          <div className="answer-images">
            {oneAnswer.photos.length ? (
              <>
                {oneAnswer.photos.map(url => (
                  <img className="thumbnail" alt="answerer's image" src={url} key={url}/>
                ))}
              </>
            ): null}
          </div>
          <div className="answer-subtext">
            <span>
              {`by `}
            </span>
              {oneAnswer.answerer_name.toLowerCase() === 'seller' ? (
                <span><strong>{`${oneAnswer.answerer_name}, `}</strong></span>
              ) : (
                <span>{`${oneAnswer.answerer_name}, `}</span>
              )}
              <span> {`${format(parseISO(oneAnswer.date), 'MMMM do, yyyy')} `}
            </span>
            <span className="answer-helpful">
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
              </span>
              <span
                className="answer-report"
                type='button'
                onClick={()=>{answerReportFn(oneAnswer.id)}}

                >
                  Report
                </span>
          </div>
        </div>
      ))}
      {showMoreAs && question.restOfAnswers.map(oneAnswer => (
        <div key={oneAnswer.id}>
          <h4 className="question-answer">
            A:{' '}{oneAnswer.body}
          </h4>
          <div className="answer-images">
            {oneAnswer.photos.length ? (
              <>
                {oneAnswer.photos.map(url => (
                  <img className="thumbnail" alt="answerer's image" src={url} key={url}/>
                ))}
              </>
            ): null}
          </div>
          <div className="answer-subtext">
            <span>
              {`by `}
            </span>
              {oneAnswer.answerer_name.toLowerCase() === 'seller' ? (
                <span><strong>{`${oneAnswer.answerer_name}, `}</strong></span>
              ) : (
                <span>{`${oneAnswer.answerer_name}, `}</span>
              )}
              <span> {`${format(parseISO(oneAnswer.date), 'MMMM do, yyyy')} `}
            </span>
              <span className="answer-helpful">
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
              </span>
              <span
                className="answer-report"
                type='button'
                onClick={()=>{answerReportFn(oneAnswer.id)}}
                >
                  Report
                </span>
          </div>
        </div>
      ))}
      {question.restOfAnswers.length ? (
        <div className="see-more-answers">
          <button
          type="button"
          onClick={changeQuestions}
          >
            {`${showMoreAs ? 'Collapse' : 'See More'} Answers`}
          </button>
        </div>
      ) : null }
    </>
  )
}

export default Question;