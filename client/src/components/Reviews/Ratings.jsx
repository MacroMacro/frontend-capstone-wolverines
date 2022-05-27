import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StarRatings from 'react-star-ratings';

export default function Ratings(props) {
  // needs ratings
  // rating average
  // percentage of people that reccomend this product
    // function for adding all reccomended in the array and dividing it by how many reviews there are
  //console.log(props.rating)
  // console.log(Number(props.avgReview))
  // //const [rating, setRating] = useState(props.rating);
  // let number = Number(props.avgReview)
  // console.log(typeof number)

  // axios.get(`/reviews/${id}`)
  // .then((response) => {
  //   //console.log(response.data.results)
  //   return response.data.results.reduce((prev, cur) => prev = prev + cur.rating, 0)/ response.data.results.length
  // })
  // .then((avgrating) => {
  //   setRating(avgrating)
  // console.log(rating)})
  // .catch(err => console.log(err));

 return (
  <div>
    <div>{props.rating}</div>
    <div>
    <StarRatings
      rating={props.rating}
      // starDimension="10px"
      // starSpacing="1px"
      // starRatedColor="black"
    />
    </div>
    <div>{props.percentHelpful}% of reviews recommend this product</div>
  </div>
 )
}