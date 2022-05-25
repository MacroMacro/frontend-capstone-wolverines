import React, { useState } from 'react';


const Question = ({ key, question }) => {

  const [showMoreAs, setShowMoreAs] = useState(false);

  const changeQuestions = () => {
    setShowMoreAs(!showMoreAs);
  }

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
            <span type='button' onClick={()=>{console.log('question helpfulness click')}} style={{ textDecoration: "underline" }}>Yes</span>
            {` (${question.question_helpfulness})`}
          </span>
          |
          <span onClick={()=>{console.log('add answer click')}}style={{paddingLeft: '10px'}}>
            Add Answer
          </span>
        </div>
      </div>
      {question.firstTwoAnswers.map(oneAnswer => (
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
                onClick={()=>{console.log('Answer helpfulness click')}}
                style={{ textDecoration: "underline" }}
              >
                Yes
              </span>
              {` (${oneAnswer.helpfulness}) | `}
              <span
                type='button'
                onClick={()=>{console.log('Answer Report Click')}}
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
                onClick={()=>{console.log('click')}}
                style={{ textDecoration: "underline" }}
              >
                Yes
              </span>
              {` (${oneAnswer.helpfulness}) | `}
              <span
                type='button'
                onClick={()=>{console.log('click')}}
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
            {`${showMoreAs ? 'Hide' : 'Load More'} Answers`}
          </span>
        </div>
      ) : null }
    </>
  )
}

export default Question;