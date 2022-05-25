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
  const [helpful, setHelpful] = useState(0);

  const helpfulCount = (id) => {
    // when clicked,
    // increment the count by 1
    setHelpful(props.helpfulness)
    helpful += 1
    axios.put(`/reviews/${id}/helpful`)
    .then((response) => {
      console.log(response)
    })
    .catch((err) => console.log(err))

  }

  return(
    <div className = "reviewItem">
      <StarRatings
      rating={props.rating}
      starDimension="10px"
      starSpacing="1px"
      starRatedColor="black"
    />
    <h1 className = "reviewTitle">{props.title}</h1>
    <div className = "reviewBody">{props.body}</div>
    <button type="button" className = "helpfulButton" onClick={() => {helpfulCount(props.id)}}>Helpful? &nbsp;
    <u>Yes</u>
    <span> &nbsp; ( {props.helpfulness} )</span>
    </button>
    <span className = "helpfulButton">|</span>
    <button type="button" className = "reportButton"><u>Report</u></button>
    </div>
  )
}