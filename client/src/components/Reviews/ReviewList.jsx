import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReviewListEntry from './ReviewListEntry.jsx';
import Ratings from './Ratings.jsx';
import StarRatings from 'react-star-ratings';
import Popup from 'reactjs-popup';
import moment from 'moment';
// list will map and pass to list entry to have the individual data
// ratings bar will be own seperate component
// make reviews scrollable

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
  const [recommend, setRecommend] = useState(true);
  const [rating, setRating] = useState(0);
  const [name, setName] = useState("");
  const [comfort, setComfort] = useState(0);
  const [size, setSize] = useState(0);
  const [averageRate, setAverageRate] = useState(0);
  const [changeRating, setChangeRating] = useState(()=>{});
  const [email, setEmail] = useState('');
  const [option, setOption] = useState('Relevance');
  const [starReview, setStarReview] = useState({});
  const [reviewState, setReviewState] = useState([]);

  // create a state here to pass down to reviewListEntry
  // write a function here for maintaining rating state
  // pass the state down to ratings

  //console.log(reviews)
  const getReviews = () =>
  {axios.get(`/reviews/${id}`)
  .then((response) => {
    let reviews = response.data.results;
    // need to figure out how to sort by both values
    reviews.sort((a, b) => (a['helpfulness'] < b['helpfulness']) ? 1 : -1)
    setReviews(reviews)
    setReviewState(reviews)
  })
  .catch(err => console.log(err));
  }

  const getReviewMeta = () => {
    axios.get(`/reviews/meta/${id}`)
    .then((response) => {
      setComfort(response.data.characteristics.Comfort.value)
      setSize(response.data.characteristics.Fit.value)
    })
    .catch(err => console.log(err))
  }

  useEffect(() => {
    getReviews();
    getReviewMeta();
  }, [])

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
        if (drop[i].classList.contains('display')) {
          drop[i].classList.remove('display');
        }
      }
    }
  }

  const submitFn = (event) => {
    event.preventDefault()
    axios.post(`/reviews/${id}`,
    {
      //obtain metadata for characteristics
      // grab the characteristic id if you fetch for the metadata
      // refernce getreviewmeta func
      // take local file, send to 3rd party api, and grab the url to import here
      product_id: id,
      rating: Number(rating),
      summary: title,
      body: body,
      recommend: recommend,
      name: name,
      email: "hi@gmail.com",
      photos: ['text'],
      characteristics: {'135219': 5, '135220': 5}
    })
    .then((response) => {
      if (body.length === 0) {
        alert('You must enter the following: Review')
      } else if (title.length === 0) {
        alert('You must enter the following: Title')
      } else if (name.length === 0) {
        alert('You must enter the following: Name')
      } else if (body.length < 50) {
        alert('Body cannot be less than 50 characters')
      } else if (email.length > 60) {
        alert('Email length is too long')
      } else if (name.length > 60) {
        alert('Name input is too long')
      } else if (body.length > 1000) {
        alert('Review input is too long')
      } else if (title.length > 60) {
        alert('Title input is too long')
      }

      //console.log(body.length)
      getReviews()
    })
    .catch((err) => console.log(err))
  }

  const percentRec = (array) => {
    let sum = 0;
    let arr = [];

    array.forEach((item) => {
      if (item.recommend === true) {
        sum++
      }
    })

    let divide = sum / array.length;
    let percent = divide * 100;
    arr.push(percent);
    return percent;
  }
  let percentHelpful = percentRec(reviews)

  axios.get(`/reviews/${id}`)
  .then((response) => {
    return response.data.results.reduce((prev, curr) => prev = prev + curr.rating, 0)/ response.data.results.length
  })
  .then((avgRating) => {
    setAverageRate(avgRating)})
  .catch(err => console.log(err));

  function showDiv() {
  document.getElementById('welcomeDiv').style.display = "block";
  }

  const helpfulSort = () => {
    let helpfulReview = reviews.slice()
    helpfulReview.sort((a, b) => (a['helpfulness'] < b['helpfulness']) ? 1 : -1)
    setReviews(helpfulReview)
  }

  const newestSort = () => {
    let newReview = reviews.slice()
    newReview.sort((a, b) => {
      // compare with &&
      return (a.date < b.date) ? 1 : -1
    })
    setReviews(newReview)
  }

  const changeOption = (event) => {
    //console.log(event.target.value)
    if (event.target.value === 'Helpful') {
      helpfulSort()
    } else if (event.target.value === 'Newest') {
      newestSort()
    }
    setOption(event.target.value)
  }

  // const [starReview, setStarReview] = useState(0);

  // create a state here to pass down to reviewListEntry
  // write a function here for maintaining rating state
  // pass the state down to ratings

  // create a func for a button for each star rating to filter
  // const starRate = (event) => {
  //   //.rating
  //   setStarReview(event.target.value)
  //   // useeffect if the user clicks on a different rating, then i filter
  //   // if (event.target.value === "5") {
  //   //   let rate = reviews.filter((item) => {
  //   //     item.rating === 5
  //   //   })
  //   //   setStarReview(rate)
  //   // }
  // }

  useEffect(() => {
    let objLength = Object.keys(starReview).length

    if (objLength > 0) {
    let rate = reviews.filter((item) =>
        item.rating === starReview[String(item.rating)]
    )
    console.log(rate)
    setReviewState(rate)
    } else {
      console.log('reached')
      setReviewState(reviews)
    }
  }, [starReview])

  return(
  formView ? (
    <div className = "reviewBox">
  <div id = "list" className = "reviewList">
  <div>

  <div className = "dropdown">
    <div className = "reviewTitle">
      {reviews.length} reviews, sorted by
      <select value={option} onChange={changeOption} className = "dropbutton">
      <option value='Relevance' >Relevance</option>
      <option value= 'Helpful' >Helpful</option>
      <option value='Newest' >Newest</option>
      </select>
      </div>
    </div>

    {<Ratings
      averageRate = {averageRate}
      percentHelpful = {percentHelpful}
      reviews = {reviews}
      comfort = {comfort}
      size = {size}
      rating = {rating}
      setStarReview = {setStarReview}
      starReview = {starReview}

    />}
    {reviewState.map((info)=> (
      <ReviewListEntry
        body = {info.body}
        title = {info.summary}
        rating = {info.rating}
        helpfulness = {info.helpfulness}
        name = {info.reviewer_name}
        id = {info.review_id}
        date = {info.date}
        recommend = {info.recommend}
        key = {info.review_id}
      />
    ))}

  </div>
  <button className = "reviewButton">MORE REVIEWS</button>
  <button onClick={handleFormView} className = "reviewButton">ADD A REVIEW +</button>

  <Popup trigger={
    <div className = "overlay">
      <div className = "testing" onClick = {() => {
      // event.stopPropagation();
      // console.log('clicked');
      // setFormView(!formView);
    }}>
    <div className = "box" >
      <form onSubmit = {submitFn}>
      <div>Write Your Review</div>
      <div className = "productTitle">About the Product</div>
      <br></br>
    <label className = "addReview">Review Summary: *</label>
    <br></br>
    <input type="text" value={title} placeholder="Example: Best purchase ever!" onChange={e => {setTitle(e.target.value)}} maxLength = {5}></input>
    <br></br>
    <label className = "addReview">Review Body: *</label>
    <br></br>
    <textarea cols="40" rows="4" value={body} placeholder="Why did you like the product or not?" onChange={e => {setBody(e.target.value)}}></textarea>
    <br></br>

    <label className = "addReview">Overall Rating: *</label>
    <br></br>
    {/* <input type="text" value= {rating} onChange={e => {setRating(e.target.value)}}></input> */}
    <StarRatings
      rating={rating}
      starRatedColor="black"
      changeRating={e => {setRating(e)}}
      numberOfStars={5}
      starDimension = {`15px`}
      starSpacing = {`2px`}
      starEmptyColor = {`white`}
      starHoverColor = {`black`}
      starRate = {starRate}
      />

    {rating > 0 ?
    (<div>hi</div>) : null
    }

    <br></br>
    <label className = "addReview">What Is Your Nickname: *</label>
    <br></br>
    <input type="text" value={name} placeholder="Example: jackson11!" onChange={e => {setName(e.target.value)}}></input>
    <div className = "auth">For privacy reasons, do not use your full name or email address</div>
    <br></br>
    <label className = "addReview">Your Email: *</label>
    <br></br>
    <input type="email" placeholder="Example: jackson11@email.com"></input>
    <div className = "auth">For authentication reasons, you will not be emailed</div>
    <br></br>

    <label className = "addReview">Do You Recommend This Product? *</label>
    <br></br>
    <input type="checkbox" name = "rec" value={recommend} onClick={e => {setRecommend(true)}}></input>Yes
    <input type="checkbox" name = "rec" value={recommend} onClick={e => {setRecommend(false)}}></input>No
    <br></br>
    <input type="submit" value="Submit Review"></input>
  </form>
  </div>
  </div>
  </div>
  } position="top center">
  </Popup>


  </div>
  </div>) : (

<div className = "reviewBox">
  <div id = "list"  className = "reviewList">
  <div>

  <div className = "dropdown">
    <div className = "reviewTitle">
      {reviews.length} reviews, sorted by
      <select value={option} onChange={changeOption} className = "dropbutton">
      <option value='Relevance' >Relevance</option>
      <option value= 'Helpful' >Helpful</option>
      <option value='Newest' >Newest</option>
      </select>
      </div>
    </div>

    {<Ratings
      averageRate = {averageRate}
      percentHelpful = {percentHelpful}
      reviews = {reviews}
      comfort = {comfort}
      size = {size}
      rating = {rating}
      setStarReview = {setStarReview}
      starReview = {starReview}
    />}
    {reviewState.map((info)=> (
      <ReviewListEntry
        body = {info.body}
        title = {info.summary}
        rating = {info.rating}
        helpfulness = {info.helpfulness}
        name = {info.reviewer_name}
        id = {info.review_id}
        date = {info.date}
        recommend = {info.recommend}
        key = {info.review_id}
      />
    ))}
  </div>
  <div>
  <button className = "reviewButton">MORE REVIEWS</button>
  <button onClick={handleFormView} className = "reviewButton">ADD A REVIEW +</button>
  </div>
  </div>
  </div>)
  )
}
