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
  const [dataCount, setDataCount] = useState(2);

  const [radioSize, setRadioSize] = useState('');
  const [radioWidth, setRadioWidth] = useState('');
  const [radioComfort, setRadioComfort] = useState('');
  const [radioQuality, setRadioQuality] = useState('');
  const [radioLength, setRadioLength] = useState('');
  const [radioFit, setRadioFit] = useState('');
  const [bodyChar, setBodyChar] = useState(0);

  // create a state here to pass down to reviewListEntry
  // write a function here for maintaining rating state
  // pass the state down to ratings

  //console.log(reviews)
  // can i slice the data array here to load 2 and then 2 again?
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
      return (a.date < b.date) ? 1 : -1
    })
    setReviews(newReview)
  }

  const changeOption = (event) => {
    if (event.target.value === 'Helpful') {
      helpfulSort()
    } else if (event.target.value === 'Newest') {
      newestSort()
    }
    setOption(event.target.value)
  }

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

  const reviewCounter = (e) => {
    if (e.target.value.length < 50) {
      document.getElementById('counter').innerHTML = 'Minimum required characters left:' + (50 - e.target.value.length)
    } else {
      document.getElementById('counter').innerHTML = 'Minimum reached'
    }
  }

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

    <nav>
    {reviews.slice(0, dataCount).map((info)=> (
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
    </nav>
  </div>


  {dataCount < reviews.length && reviews.length > 2 && reviews.length !== 101 ?
  <button className = "reviewButton" onClick = {() => {setDataCount(dataCount + 2)}}>MORE REVIEWS</button> : null }
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
    <input type="text" value={title} placeholder="Example: Best purchase ever!" onChange={e => {setTitle(e.target.value)}}></input>
    <br></br>

    {/* here */}
    <label className = "addReview">Review Body: *</label>
    <br></br>
    <textarea cols="40" rows="4" value={body} id = "bodyBox" placeholder="Why did you like the product or not?" onChange={e => {setBody(e.target.value)}} onKeyUp = {(e) => reviewCounter(e)} minLength = "50" maxLength = "1000"></textarea>
    <div id = "counter"></div>
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

    <label className = "addReview">Characteristics*</label>
    <br></br>
    <br></br>

    <div>
     {radioSize.length > 0 ?
      <div className = "radioTitle">Size &nbsp; {radioSize}</div> : <div className = "radioTitle">Size &nbsp; none selected</div>}
    <label className = "radioButton" onClick = {() => {setRadioSize('A size too small')}}><input type="radio" />A size too small &nbsp;</label>
    <label className = "radioButton"><input type="radio" onClick = {() => {
      setRadioSize('½ a size too small')
    }}/>½ a size too small &nbsp;</label>
    <label className = "radioButton" onClick = {() => {
      setRadioSize('Perfect')
    }}><input type="radio" />Perfect &nbsp;</label>
    <label className = "radioButton" onClick = {() => {
      setRadioSize('½ a size too big')
    }}><input type="radio" />½ a size too big &nbsp;</label>
    <label className = "radioButton" onClick = {() => {
      setRadioSize('A size too wide')
    }}><input type="radio" />A size too wide &nbsp;</label>
    </div>
    <br></br>

    <div>
    {radioWidth.length > 0 ?
      <div className = "radioTitle">Width &nbsp; {radioWidth}</div> : <div className = "radioTitle">Width &nbsp; none selected</div>}
    <label className = "radioButton" onClick = {() => {setRadioWidth('Too narrow')}}><input type="radio" />Too narrow &nbsp;</label>
    <label className = "radioButton"><input type="radio" onClick = {() => {
      setRadioWidth('Slightly narrow')
    }}/>Slightly narrow &nbsp;</label>
    <label className = "radioButton" onClick = {() => {
      setRadioWidth('Perfect')
    }}><input type="radio" />Perfect &nbsp;</label>
    <label className = "radioButton" onClick = {() => {
      setRadioWidth('Slightly wide')
    }}><input type="radio" />Slightly wide &nbsp;</label>
    <label className = "radioButton" onClick = {() => {
      setRadioWidth('Too wide')
    }}><input type="radio" />Too wide &nbsp;</label>
    </div>
    <br></br>

    <div>
    {radioComfort.length > 0 ?
      <div className = "radioTitle">Comfort &nbsp; {radioComfort}</div> : <div className = "radioTitle">Comfort &nbsp; none selected</div>}
    <label className = "radioButton" onClick = {() => {setRadioComfort('Uncomfortable')}}><input type="radio" />Uncomfortable &nbsp;</label>
    <label className = "radioButton"><input type="radio" onClick = {() => {
      setRadioComfort('Slightly uncomfortable')
    }}/>Slightly uncomfortable &nbsp;</label>
    <label className = "radioButton" onClick = {() => {
      setRadioComfort('Ok')
    }}><input type="radio" />Ok &nbsp;</label>
    <label className = "radioButton" onClick = {() => {
      setRadioComfort('Comfortable')
    }}><input type="radio" />Comfortable &nbsp;</label>
    <label className = "radioButton" onClick = {() => {
      setRadioComfort('Perfect')
    }}><input type="radio" />Perfect &nbsp;</label>
    </div>
    <br></br>

    <div>
    {radioQuality.length > 0 ?
      <div className = "radioTitle">Quality &nbsp; {radioQuality}</div> : <div className = "radioTitle">Quality &nbsp; none selected</div>}
    <label className = "radioButton" onClick = {() => {setRadioQuality('Poor')}}><input type="radio" />Poor &nbsp;</label>
    <label className = "radioButton"><input type="radio" onClick = {() => {
      setRadioQuality('Below average')
    }}/>Below average &nbsp;</label>
    <label className = "radioButton" onClick = {() => {
      setRadioQuality('What I expected')
    }}><input type="radio" />What I expected &nbsp;</label>
    <label className = "radioButton" onClick = {() => {
      setRadioQuality('Pretty great')
    }}><input type="radio" />Pretty great &nbsp;</label>
    <label className = "radioButton" onClick = {() => {
      setRadioQuality('Perfect')
    }}><input type="radio" />Perfect &nbsp;</label>
    </div>
    <br></br>

    <div>
    {radioLength.length > 0 ?
      <div className = "radioTitle">Length &nbsp; {radioLength}</div> : <div className = "radioTitle">Length &nbsp; none selected</div>}
    <label className = "radioButton" onClick = {() => {setRadioLength('Runs Short')}}><input type="radio" />Runs Short &nbsp;</label>
    <label className = "radioButton"><input type="radio" onClick = {() => {
      setRadioLength('Runs slightly short')
    }}/>Runs slightly short &nbsp;</label>
    <label className = "radioButton" onClick = {() => {
      setRadioLength('Perfect')
    }}><input type="radio" />Perfect &nbsp;</label>
    <label className = "radioButton" onClick = {() => {
      setRadioLength('Runs slightly long')
    }}><input type="radio" />Runs slightly long &nbsp;</label>
    <label className = "radioButton" onClick = {() => {
      setRadioLength('Runs long')
    }}><input type="radio" />Runs long &nbsp;</label>
    </div>
    <br></br>

    <div>
    {radioFit.length > 0 ?
      <div className = "radioTitle">Fit &nbsp; {radioFit}</div> : <div className = "radioTitle">Fit &nbsp; none selected</div>}
    <label className = "radioButton" onClick = {() => {setRadioFit('Runs Short')}}><input type="radio" />Runs Short &nbsp;</label>
    <label className = "radioButton"><input type="radio" onClick = {() => {
      setRadioFit('Runs slightly short')
    }}/>Runs slightly short &nbsp;</label>
    <label className = "radioButton" onClick = {() => {
      setRadioFit('Perfect')
    }}><input type="radio" />Perfect &nbsp;</label>
    <label className = "radioButton" onClick = {() => {
      setRadioFit('Runs slightly long')
    }}><input type="radio" />Runs slightly long &nbsp;</label>
    <label className = "radioButton" onClick = {() => {
      setRadioFit('Runs long')
    }}><input type="radio" />Runs long &nbsp;</label>
    </div>
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
    
    <nav>
    {reviews.slice(0, dataCount).map((info)=> (
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
    </nav>
  </div>
  <div>

  {dataCount < reviews.length && reviews.length > 2  && reviews.length !== 101 ?
  <button className = "reviewButton" onClick = {() => {setDataCount(dataCount + 2)}}>MORE REVIEWS</button> : null }

  <button onClick={handleFormView} className = "reviewButton">ADD A REVIEW +</button>
  </div>
  </div>
  </div>)
  )
}
