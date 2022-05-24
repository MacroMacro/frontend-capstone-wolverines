import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReviewListEntry from './ReviewListEntry.jsx';
// list will map and pass to list entry to have the individual data
// ratings bar will be own seperate component

export default function ReviewList({id}) {
  const [reviews, setReviews] = useState([]);

  <div>{console.log(id)}</div>

  useEffect(() => {
    axios.get(`/reviews/${id}`)
    .then((response) => {
      console.log(response);
      setReviews(response.data.results)
    })
    .catch(err => console.log(err));
  }, [])

  // will be mapping:
  // review body
  // review title
  // reviews.body, reviews.summary, reviews.review_id

  console.log(reviews);
  return(
    <div>
      {reviews.map((info)=> (
        <ReviewListEntry
          body = {info.body}
          title = {info.summary}
          key = {info.review_id}
        />
      ))}
    </div>
  )
}
