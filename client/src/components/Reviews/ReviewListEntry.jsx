import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StarRatings from 'react-star-ratings';
import moment from 'moment';

// total reviews will be the array length

export default function ReviewListEntry(props) {
  const [helpful, setHelpful] = useState(props.helpfulness);
  const [notHelpful, setNotHelpful] = useState(props.helpfulness);
  const [reviews, setReviews] = useState([]);
  const [recommend, setRecommend] = useState(props.recommend);
  //console.log(props.helpfulness)
  //console.log(recommend)

  let counter = helpful

  const helpfulCount = (id) => {
    // when clicked,
    // increment the count by 1
    counter++
    axios.put(`/reviews/${id}/helpful`, {helpfulness: counter})
    .then((response) => {
      //console.log(response)
      setHelpful(counter)
    })
    .catch((err) => console.log(err))
  }

  const helpfulDecrementer = (id) => {
    counter--
    axios.put(`/reviews/${id}/helpful`, {helpfulness: counter})
    .then((response) => {
      //console.log(response)
      setHelpful(counter)
    })
    .catch((err) => console.log(err))
  }

  const recommended = (bool) => {
    if (bool === true) {
      return (<div>I recommend this product</div>)
    }
  }

  //  need response
  // need verified icon
  
  return(
    <div className = "reviewItem">
      <StarRatings
      rating={props.rating}
      starDimension="10px"
      starSpacing="1px"
      starRatedColor="black"
    />

    <div className = "reviewDate">{props.name}, {moment(props.date).format("MMM Do, YYYY")}</div>
    <h1 className = "reviewTitle">{props.title}</h1>
    <div className = "reviewBody">{props.body}</div>
    <div className = "reviewRec">{recommended(recommend)}</div>
    <button id = "helpful" type="button" className = "helpfulButton" onClick={() => {helpfulCount(props.id)}}>Helpful? &nbsp;
    <u>Yes</u>
    <span> &nbsp; ( {helpful} )</span>
    </button>

    <span className = "helpfulButton">|</span>
    <button id = "report" type="button" className = "reportButton"
    onClick={() => {helpfulDecrementer(props.id)}}>
    <u>No</u>
    </button>
    </div>
  )
}