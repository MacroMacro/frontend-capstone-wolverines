import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StarRatings from 'react-star-ratings';
import moment from 'moment';

export default function ReviewListEntry(props) {
  const [helpful, setHelpful] = useState(props.helpfulness);
  const [notHelpful, setNotHelpful] = useState(props.helpfulness);
  const [reviews, setReviews] = useState([]);
  const [recommend, setRecommend] = useState(props.recommend);
  const [response, setResponse] = useState(props.response);
  const [fullRes, setFullRes] = useState('');

  let counter = helpful
  let photos = [];

  const helpfulCount = (id) => {
    counter++
    axios.put(`/reviews/${id}/helpful`, {helpfulness: counter})
    .then((response) => {
      setHelpful(counter)
    })
    .catch((err) => console.log(err))
  }

  const helpfulDecrementer = (id) => {
    counter--
    axios.put(`/reviews/${id}/helpful`, {helpfulness: counter})
    .then((response) => {
      setHelpful(counter)
    })
    .catch((err) => console.log(err))
  }

  const recommended = (bool) => {
    if (bool === true) {
      return (<div>✔ I recommend this product</div>)
    }
  }

  const responded = () => {
    if (response) {
      return (<div>{props.response}</div>)
    }
  }

  useEffect(() => {
    if (props.photos.length !== 0) {
      for (var i = 0; i < props.photos.length; i++) {
        photos.push(props.photos[i].url)
      }
    }

  }, [photos])

  return(
    <div className="reviewItem">
      <div className="stars">
      <StarRatings
      rating={props.rating}
      starDimension="20px"
      starSpacing="1px"
      starRatedColor="gold"
    />
      </div>

    <div className="reviewDate">☑ {props.name}, {moment(props.date).format("MMM Do, YYYY")}</div>
    <br></br>
    <h1 className="reviewTitle">{props.title}</h1>
    <br></br>
    <div className="reviewBody">{props.body}</div>
    <br></br>
    <div className="response">{responded()}</div>
    <br></br>
    <div className="reviewRec">{recommended(recommend)}</div>
    <br></br>
    <div className="photoAlign">

    {props.photos.length !== 0 ?
    props.photos.map((item) => (
      <div><img src={item.url} className="reviewThumbnails" onClick ={() => {setFullRes(item.url)}}></img></div>
    )) : null}
  </div>

  {fullRes === '' ? null :
  <div onClick = {() => {setFullRes('')}}>
    <img src={fullRes}></img>
    </div>
}

    <button id="helpful" type="button" className="helpfulButton" onClick={() => {helpfulCount(props.id)}}>Helpful? &nbsp;
    <u>Yes</u>
    <span> &nbsp; ( {helpful} )</span>
    </button>

    <span className="helpfulButton">|</span>
    <button id="report" type="button" className="reportButton"
    onClick={() => {helpfulDecrementer(props.id)}}>
    <u>No</u>
    </button>
    </div>

  )
}
