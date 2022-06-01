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
  // const [loadPhotos, setLoadPhotos] = useState(props.photos);

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
      // let mounted = true;
      if (props.photos.length !== 0) {
        //console.log(props.photos[0].url)
        for (var i = 0; i < props.photos.length; i++) {
          photos.push(props.photos[i].url)
        }
      }

      // return () => mounted = false;
    }, [photos])

  // console.log(props.body)
  // const bodyChars = () => {
  //   if (props.body > )
  // }
  console.log('Leia: ', props.photos, props.id)

  return(
    <div className = "reviewItem">
      <StarRatings
      rating={props.rating}
      starDimension="10px"
      starSpacing="1px"
      starRatedColor="black"
    />

    <div className = "reviewDate">☑ {props.name}, {moment(props.date).format("MMM Do, YYYY")}</div>
    <h1 className = "reviewTitle">{props.title}</h1>
    <div className = "reviewBody">{props.body}</div>
    <div className = "response">{responded()}</div>
    <div className = "reviewRec">{recommended(recommend)}</div>
    <div>

      {
      props.photos.length !== 0 ?
      props.photos.map((item) => (
        //hello
        <div>hello<img src={item.url}></img></div>
      )) : <div>bai</div>}
    </div>
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
