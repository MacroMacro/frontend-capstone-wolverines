import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddQuestion from './AddQuestion.jsx'
import Question from './Question.jsx'
import SearchQuestions from './SearchQuestions.jsx';
import AddAnswer from './AddAnswer.jsx';

function QandAs ({ product_id, product_name }) {
  // State
  const [qnaFirstFour, setQnaFirstFour] = useState([]);
  const [qnaRest, setQnaRest] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showMoreAnswers, setShowMoreAnswers] = useState(false);
  const [
    hasComponentSearched,
    setHasComponentSearched
  ] = useState(false)
  const [showQuestionForm, setShowQuestionForm] = useState(false);

  const [showAnswerForm, setShowAnswerForm] = useState(false);

  const [currentQID, setCurrentQID] = useState(0);

  const [currentQBody, setCurrentQBody] = useState('');


    //toggle for states
    const toggleQuestionForm = () => {
      setShowQuestionForm(!showQuestionForm);
    }

    const toggleAnswerForm = (id, body) => {
      setShowAnswerForm(!showAnswerForm);
      setCurrentQID(id);
      setCurrentQBody(body);
    }

    //submission Fns
    const questionSubmit = () => {
      setShowQuestionForm(false);
      getQuestions();
      // console.log('question submitted');
    }

    const answerSubmit = () => {
      setShowAnswerForm(false);
      getQuestions();
      // console.log('answer submitted');
    }

    //set states to false
    const setQFalse = () => {
      setShowQuestionForm(false);
    }

    const setAFalse = () => {
      setShowAnswerForm(false);
    }

    //update question ID for answer modal
    const updateAnswerID = (id) => {
      setCurrentQID(id);
    }



  // setState
  const changeShowMoreAnswers = () =>
    setShowMoreAnswers(!showMoreAnswers);

    const changeShowForm = () =>
      setShowForm(!showForm);
  // Component Methods
  const createQuestionStateObj = (questions) => {
    const result = []
    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      let { answers } = question
      answers = Object.values(answers);
      // console.log(answers)
      answers.sort(function(a, b) {
        return b.helpfulness - a.helpfulness;
      });
      let firstArr = [];
      let secondArr = [];
      for (let i = 0; i < answers.length; i++) {
        if (answers[i].answerer_name.toLowerCase().includes('seller')) {
          firstArr.push(answers[i]);
        } else {
          secondArr.push(answers[i]);
        }
      }
      let finalArr = firstArr.concat(secondArr);
      // console.log('first and second arr: ', firstArr, secondArr);
      // let filtered = answers.filter(answer => answer.answerer_name.toLowerCase().includes('seller'));
      // firstArr.push(filtered);
      // first take all the answers and filter by seller
      //take the rest, sort by helpfulness
      //then make one list
      //then you can proceed with the following code
      const firstTwoAnswers = finalArr.slice(0,2);
      const restOfAnswers = finalArr.slice(2);

      result.push({
        'question_body': question.question_body,
        'question_date': question.question_date,
        'asker_name': question.asker_name,
        'question_helpfulness': question.question_helpfulness,
        'question_id': question.question_id,
        'reported': question.reported,
        'firstTwoAnswers': firstTwoAnswers,
        'restOfAnswers': restOfAnswers,
        'showMoreAnswers': false,
      })
    }

    return result;
  }

  const getQuestions = (search = null) => {
    axios.get(`/qa/questions/?product_id=${product_id}&search=${search}`)
    .then((res) => {
      const { results: questions } = res.data;
      // console.log(res.data);
      let firstFour = questions.slice(0, 4);
      let rest = questions.slice(4);

      setQnaFirstFour(createQuestionStateObj(firstFour));
      setQnaRest(createQuestionStateObj(rest));
    })
    .catch(err => console.log('error fetching from qna, ', err));
  }

  const searchQuestions = (search) => {
    // console.log(hasComponentSearched, search);
    if (!hasComponentSearched && !search) {
      return;
    }

    if (hasComponentSearched && !search) {
        setHasComponentSearched(false)
    } else if (!hasComponentSearched && search) {
      setHasComponentSearched(true)
    }

    getQuestions(search);
  }

  const qSubmit = () => {
    setShowForm(false);
    getQuestions();
  }

  useEffect(getQuestions, [product_id]);

  // console.log(showForm);
  return(
    <div className="qnas">
      {showQuestionForm && !showAnswerForm ? (
        <AddQuestion
          product_id={product_id}
          questionSubmit={questionSubmit}
          product_name={product_name}
          setQFalse={setQFalse}/>
          ) : null}

      {!showQuestionForm && showAnswerForm ? (
        <AddAnswer
          product_name={product_name}
          question_id={currentQID}
          currentQBody={currentQBody}
          reloadFn={answerSubmit}
          setAFalse={setAFalse}
        />
        ) : null}
      <h1 data-testid="test1" className="qna-header">Questions & Answers</h1>
      <SearchQuestions searchQuestions={searchQuestions} product_id={product_id}/>
      {qnaFirstFour.length ? (
        <>
          <div className="qna-box">
            {qnaFirstFour.map(oneQna => (
              <div className="questions-box" key={oneQna.question_id}>
                <Question
                  reloadFn={() => getQuestions()}
                  question={oneQna}
                  updateAnswerID={updateAnswerID} toggleAnswerForm={toggleAnswerForm}
                />
              </div>
            ))}
            {showMoreAnswers && qnaRest.map(restQna => (
              <div key={restQna.question_id}>
                <Question reloadFn={() => getQuestions()} question={restQna} updateAnswerID={updateAnswerID} toggleAnswerForm={toggleAnswerForm}/>
              </div>
            ))}
          </div>
          <div className="qna-buttons">
            <button
              type='button'
              onClick={changeShowMoreAnswers}
            >
              {`${showMoreAnswers ? 'Hide More' : 'More'} Answered Questions`}
            </button>
            <button
              onClick={toggleQuestionForm}
            >
              Add a Question
            {/* <span class="material-symbols-outlined">
              add
            </span> */}
            </button>
          </div>
        </>
      ) : <div>
            <button onClick={toggleQuestionForm}>Add a Question</button>
        </div>}
        {/* {showForm ? <AddQuestion product_id={product_id} qSubmit={qSubmit}/> : null} */}
    </div>
  );
}

export default QandAs