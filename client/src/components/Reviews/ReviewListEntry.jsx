import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StarRatings from 'react-star-ratings';

// total reviews will be the array length

export default function ReviewListEntry(props) {
 //console.log('body', props.body);
  //console.log(id);
  //console.log(props.id);
  // console.log('summary', props.title);
  //console.log('rating', props.rating);
  //console.log(props);
  //console.log(props.helpfulness);
  const [helpful, setHelpful] = useState(props.helpfulness);
  const [reviews, setReviews] = useState([]);
  const [recommend, setRecommend] = useState(props.recommend);
  //console.log(props.helpfulness)
  console.log(recommend)

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

  const recommended = (bool) => {
    if (bool === true) {
      return (<div>I recommend this product</div>)
    }
  }

  return(
    <div className = "reviewItem">
      <StarRatings
      rating={props.rating}
      starDimension="10px"
      starSpacing="1px"
      starRatedColor="black"
    />

    <div className = "reviewDate">{props.date}</div>
    <h1 className = "reviewTitle">{props.title}</h1>
    <div className = "reviewBody">{props.body}</div>
    <div className = "reviewRec">{recommended(recommend)}</div>
    <button id = "helpful" type="button" className = "helpfulButton" onClick={() => {helpfulCount(props.id)}}>Helpful? &nbsp;
    <u>Yes</u>
    <span> &nbsp; ( {helpful} )</span>
    </button>
    <span className = "helpfulButton">|</span>
    <button id = "report" type="button" className = "reportButton"><u>Report</u></button>
    </div>
  )
}