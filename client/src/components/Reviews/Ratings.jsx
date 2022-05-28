import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StarRatings from 'react-star-ratings';
import ProgressBar from "@ramonak/react-progress-bar";
import InputRange from 'react-input-range';


export default function Ratings(props) {

  const [ratePercent, setRatePercent] = useState({1: 0, 2: 0, 3: 0, 4: 0, 5: 0});
  const [changeComfort, setChangeComfort] = useState(0);

  useEffect(() => {
    let countOne = 0;
    let countTwo = 0;
    let countThree = 0;
    let countFour = 0;
    let countFive = 0;

    props.reviews.forEach((item) => {
      if (item.rating === 5) {
        countFive++
      } else if (item.rating=== 4) {
        countFour++
      } else if (item.rating === 3) {
        countThree++
      } else if (item.rating === 2) {
        countTwo++
      } else if (item.rating === 1) {
        countOne++
      }
    })
    // let div = count/ props.reviews.length * (100)
    let divOne = countOne/ props.reviews.length  * (100)
    let divTwo = countTwo / props.reviews.length  * (100)
    let divThree = countThree / props.reviews.length  * (100)
    let divFour = countFour / props.reviews.length  * (100)
    let divFive = countFive / props.reviews.length  * (100)

    setRatePercent({One: divOne, Two: divTwo, Three: divThree, Four: divFour, Five: divFive})

  }, [props.reviews])

 return (
  <div>
    <div>RATINGS & REVIEWS</div>
    <div className = "avgRating">{props.averageRate}</div>
    <div className = "starRating">
    <StarRatings
      rating={props.averageRate}
      starDimension="11px"
      starSpacing="1px"
      starRatedColor="black"
    />
    </div>
    <br></br>

    <div className = "percentRating">{props.percentHelpful}% of reviews recommend this product</div>

    <br></br>
    <div className = "rateNum">5 stars</div>
    <div className = "progBar">
    <ProgressBar
    completed={ratePercent.Five}
    isLabelVisible = {false}
    bgColor = {`green`}
    width = {`50%`}
    maxCompleted = {50}
    />
    </div>
  <br></br>
  <div className = "rateNum">4 stars</div>
  <div className = "progBar">
    <ProgressBar
    completed={ratePercent.Four}
    isLabelVisible = {false}
    bgColor = {`green`}
    width = {`50%`}
    maxCompleted = {50}
    />
    </div>
    <br></br>

    <div className = "rateNum">3 stars</div>
    <div className = "progBar">
    <ProgressBar
    completed={ratePercent.Three}
    isLabelVisible = {false}
    bgColor = {`green`}
    width = {`50%`}
    maxCompleted = {50}
    />
    </div>
    <br></br>

    <div className = "rateNum">2 stars</div>
    <div className = "progBar">
    <ProgressBar
    completed={ratePercent.Two}
    isLabelVisible = {false}
    bgColor = {`green`}
    width = {`50%`}
    maxCompleted = {50}
    />
    </div>
    <br></br>

    <div className = "rateNum">1 stars</div>
    <div className = "progBar">
    <ProgressBar
    completed={ratePercent.One}
    isLabelVisible = {false}
    bgColor = {`green`}
    width = {`50%`}
    maxCompleted = {50}
    />
    </div>
    <br></br>

    <div>Size</div>
    <div>
    <input className = "slider"
        max = {5}
        type = 'range'
        value={Number(props.comfort)}
        disabled
        />
    </div>
    <div className = "fit">Too small &nbsp; &nbsp;Perfect &nbsp; &nbsp;Too large</div>
    <br></br>

    <div>Comfort</div>
    <div>
    <input className = "slider"
        max = {5}
        type = 'range'
        value={Number(props.size)}
        disabled
        />
    </div>
    <div className = "fit">Poor &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Perfect</div>
    <br></br>

  </div>
 )
}