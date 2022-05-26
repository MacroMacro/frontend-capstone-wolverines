import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReviewListEntry from './ReviewListEntry.jsx';
import StarRatings from 'react-star-ratings';
// list will map and pass to list entry to have the individual data
// ratings bar will be own seperate component

export default function ReviewList({id}) {
 /* this.state = {
   reviews: [],
   formView: false,
   title: '',
   body: ''
 }*/
  const [reviews, setReviews] = useState([]);
  const [formView, setFormView] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState("");

  useEffect(() => {
    function getReviews() {axios.get(`/reviews/${id}`)
    .then((response) => {
      console.log(response.data.results);
      let reviews = response.data.results;
      reviews.sort((a, b) => (a['helpfulness'] < b['helpfulness']) ? 1 : -1)
      setReviews(reviews);
    })
    .catch(err => console.log(err));
    }
    getReviews();
  }, [])

  const newReview = (review) => {
    axios.post(`/reviews/${id}`, review)
    .then(() => {
      getReviews();
    })
    .catch(err => console.log(err));
  }

  const handleFormView = () => {
    setFormView(!formView);
  }

  const myFunction = () => {
    document.getElementById("theDropdown").classList.toggle("display");
  }

  // Close the dropdown menu if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.dropbutton')) {
      var drop = document.getElementsByClassName("contentDropdown");
      for (var i = 0; i < drop.length; i++) {
        //var openDropdown = drop[i];
        if (drop[i].classList.contains('display')) {
          drop[i].classList.remove('display');
        }
      }
    }
  }

  const submitFn = (event) => {
    // takes in values from input fields
    // prevent default
    // create object
    // {
      // rating:
      // summary:
    //}
    // send object to post
    // dont need to worry about state or hooks
    // pass into post
    // invoke a .get
    console.log(title, body);
  }

  //console.log(reviews.helpfulness);

  // will be mapping:
  // review body
  // review title
  // reviews.body, reviews.summary, reviews.review_id
  // get the length of the reviews array\// helpful report buttons

  return(

  formView ? (
  <div className = "reviewList">
  <div>
  <div className = "dropdown">
    <div className = "reviewTitle">
      {reviews.length} reviews, sorted by
      <button onClick={myFunction} className = "dropbutton">relevance ∨</button>
      <div id = "theDropdown" className="contentDropdown">
      <a href="#">Relevant</a>
      <a href="#">Helpful</a>
      <a href="#">Newest</a>
      </div>
      </div>
    </div>
    {reviews.map((info)=> (
      <ReviewListEntry
        body = {info.body}
        title = {info.summary}
        rating = {info.rating}
        helpfulness = {info.helpfulness}
        name = {info.reviewer_name}
        id = {info.review_id}
        key = {info.review_id}
      />
    ))}

  </div>
  <div>
  <form onSubmit = {submitFn}>
    <label className = "addReview">Add a title:</label>
    <br></br>
    <input type="text" value={title} onChange={e => {setTitle(e.target.value)}}></input>
    <br></br>
    <label className = "addReview">Add a written review:</label>
    <br></br>
    <input type="text" value={body} onChange={e => {setBody(e.target.value)}}></input>
    <br></br>
    <input type="submit" value="Submit"></input>
  </form>
  <button className = "reviewButton">MORE REVIEWS</button>
  <button onClick={handleFormView} className = "reviewButton">ADD A REVIEW +</button>
  </div>
  </div>) : (<div className = "reviewList">
  <div>
  <div className = "dropdown">
    <div className = "reviewTitle">
      {reviews.length} reviews, sorted by
      <button onClick={myFunction} className = "dropbutton">relevance ∨</button>
      <div id = "theDropdown" className="contentDropdown">
      <a href="#">Relevant</a>
      <a href="#">Helpful</a>
      <a href="#">Newest</a>
      </div>
      </div>
    </div>
    {reviews.map((info)=> (
      <ReviewListEntry
        body = {info.body}
        title = {info.summary}
        rating = {info.rating}
        helpfulness = {info.helpfulness}
        name = {info.reviewer_name}
        id = {info.review_id}
        key = {info.review_id}
      />
    ))}
  </div>
  <div>
  <button className = "reviewButton">MORE REVIEWS</button>
  <button onClick={handleFormView} className = "reviewButton">ADD A REVIEW +</button>
  </div>
  </div>)

  )
}
