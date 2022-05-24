import React, { useState, useEffect } from 'react';
import axios from 'axios';

// total reviews will be the array length
//

export default function ReviewListEntry(props) {
  // console.log('body', props.body);
  // console.log('summary', props.title);
  //console.log('rating', props.rating);
  //console.log(props);

  return(
    <div className = "reviewItem">
    <div className = "reviewRating">{props.rating} stars</div>
    <h1 className = "reviewTitle">{props.title}</h1>
    <div className = "reviewBody">{props.body}</div>
    <button type="button" className = "helpfulButton">Helpful? &nbsp;
    <u>Yes</u>
    <span> &nbsp; ( {props.helpfulness} )</span>
    </button>
    <span className = "helpfulButton">|</span>
    <button type="button" className = "reportButton"><u>Report</u></button>
    </div>
  )
}