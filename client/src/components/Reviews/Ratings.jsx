import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StarRatings from 'react-star-ratings';
import ProgressBar from "@ramonak/react-progress-bar";

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
  //console.log(props)
  // console.log(props.ratingTotal)

  // const calc = () => {
  //   let div = props.ratingTotal/ props.reviews;
  //   console.log(div);
  // }


 return (
  <div>
    <div className = "avgRating">{props.rating}</div>
    <div className = "starRating">
    <StarRatings
      rating={props.rating}
      starDimension="11px"
      starSpacing="1px"
      starRatedColor="black"
    />
    </div>

    <br></br>
    <div className = "rateNum">5 stars</div>
    <div className = "progBar">
    <ProgressBar
    completed={props.countFive}
    isLabelVisible = {false}
    bgColor = {`green`}
    width = {`50%`}
    />
    </div>
  <br></br>
  <div className = "rateNum">4 stars</div>
  <div className = "progBar">
    <ProgressBar
    completed={props.countFour}
    isLabelVisible = {false}
    bgColor = {`green`}
    width = {`50%`}
    />
    </div>
    <br></br>

    <div className = "rateNum">4 stars</div>
    <div className = "progBar">
    <ProgressBar
    completed={props.countFour}
    isLabelVisible = {false}
    bgColor = {`green`}
    width = {`50%`}
    />
    </div>
    <br></br>


    <div className = "percentRating">{props.percentHelpful}% of reviews recommend this product</div>
    <br></br>
  </div>
 )
}