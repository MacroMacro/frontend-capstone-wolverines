import React, { useState, useEffect } from 'react';
import axios from 'axios';

// total reviews will be the array length
//

export default function ReviewListEntry(props) {
  // console.log('body', props.body);
  // console.log('summary', props.title);
  console.log('rating', props.rating);

  return(
    <div className = "reviewItem">
    <div className = "reviewRating">{props.rating} stars</div>
    <div className = "reviewTitle">{props.title}</div>
    <div className = "reviewBody">{props.body}</div>
    </div>
  )
}