import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReviewListEntry from './ReviewListEntry.jsx';
import Ratings from './Ratings.jsx';
import StarRatings from 'react-star-ratings';
import Popup from 'reactjs-popup';
import moment from 'moment';
import { Image } from 'cloudinary-react';
// list will map and pass to list entry to have the individual data
// ratings bar will be own seperate component
// make reviews scrollable

export default function ReviewList({ id }) {
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
  const [changeRating, setChangeRating] = useState(() => { });
  const [email, setEmail] = useState('');
  const [option, setOption] = useState('Relevance');
  const [starReview, setStarReview] = useState({});
  const [reviewState, setReviewState] = useState([]);
  const [dataCount, setDataCount] = useState(2);
  const [imageSelected, setImageSelected] = useState([]);

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

  // console.log(reviews)
  // can i slice the data array here to load 2 and then 2 again?
  const getReviews = () => {
    axios.get(`/reviews/${id}?sort=relevant`)
      .then((response) => {
        let reviews = response.data.results;
        // console.log(reviews);
        // need to figure out how to sort by both values
        // reviews.sort((a, b) => (a['helpfulness'] < b['helpfulness']) ? 1 : -1)
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
  }, [id])

  const handleFormView = (event) => {
    event.stopPropagation();
    setFormView(!formView);
  }

  const myFunction = () => {
    document.getElementById("theDropdown").classList.toggle("display");
  }

  // Close the dropdown menu if the user clicks outside of it
  window.onclick = function (event) {
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
    let formObj = {
      product_id: id,
      rating: Number(rating),
      summary: title,
      body: body,
      recommend: recommend,
      name: name,
      email: "hi@gmail.com",
      photos: imageSelected, // ['test']
      characteristics: { '135219': 5, '135220': 5 }
    }
    axios.post(`/reviews/${id}`, formObj)
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
      .catch((err) => { console.log(formObj); console.log(err) })
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
      return response.data.results.reduce((prev, curr) => prev = prev + curr.rating, 0) / response.data.results.length
    })
    .then((avgRating) => {
      setAverageRate(avgRating)
    })
    .catch(err => console.log(err));

  function showDiv() {
    document.getElementById('welcomeDiv').style.display = "block";
  }

  const helpfulSort = () => {
    let helpfulReview = reviews.slice()
    helpfulReview.sort((a, b) => (a['helpfulness'] < b['helpfulness']) ? 1 : -1)
    setReviewState(helpfulReview)
  }

  const newestSort = () => {
    let newReview = reviews.slice()
    newReview.sort((a, b) => {
      return (a.date < b.date) ? 1 : -1
    })
    setReviewState(newReview)
  }

  const changeOption = (event) => {
    if (event.target.value === 'Helpful') {
      helpfulSort()
    } else if (event.target.value === 'Newest') {
      newestSort()
    } else if (event.target.value === 'Relevance') {
      setReviewState(reviews)
    }
    setOption(event.target.value)
  }

  useEffect(() => {
    let objLength = Object.keys(starReview).length

    if (objLength > 0) {
      let rate = reviews.filter((item) =>
        item.rating === starReview[String(item.rating)]
      )
      //console.log(rate)
      setReviewState(rate)
    } else {
      // console.log('reached')
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

  const uploadImage = (event) => {
    //console.log(files[0]);
    const formData = new FormData()
    formData.append("file", event.target.files[0])
    formData.append("upload_preset", "d3rcyhun")

    axios.post("https://api.cloudinary.com/v1_1/djmupj0f5/image/upload",
      formData)
      .then((response) => { console.log(response.data.url); setImageSelected([...imageSelected, response.data.url]) })
  }

  return (
    formView ? (

      <div className="reviewWrapper">

        <div className="ratingsWrapper">
          <Ratings
            averageRate={averageRate}
            percentHelpful={percentHelpful}
            reviews={reviews}
            comfort={comfort}
            size={size}
            rating={rating}
            setStarReview={setStarReview}
            starReview={starReview}
            reviewState={reviewState}
          />
        </div>
        <div id="list" className="reviewList">
          <div>

            <div className="dropdown">
              <div className="reviewTitle">
                {reviews.length} reviews, sorted by
                <select value={option} onChange={changeOption} className="dropbutton">
                  <option value='Relevance' >Relevance</option>
                  <option value='Helpful' >Helpful</option>
                  <option value='Newest' >Newest</option>
                </select>
              </div>
            </div>



            <div className="reviewBox">
              <nav className="nav">
                {reviewState.slice(0, dataCount).map((info, index) => (
                  <ReviewListEntry
                    body={info.body}
                    title={info.summary}
                    rating={info.rating}
                    helpfulness={info.helpfulness}
                    name={info.reviewer_name}
                    id={info.review_id}
                    date={info.date}
                    recommend={info.recommend}
                    response={info.response}
                    photos={info.photos}
                    key={info.review_id}
                  />
                ))}
              </nav>
            </div>
          </div>
          <div>

            {dataCount < reviews.length && reviews.length > 2 && reviews.length !== 101 ?
              <button className="reviewButton" onClick={() => { setDataCount(dataCount + 2) }}>MORE REVIEWS</button> : null}

            <button onClick={handleFormView} className="reviewButton">ADD A REVIEW +</button>
          </div>
        </div>


        <div className="overlay-review" onClick={handleFormView}></div>

        <div className="box">
          <form onSubmit={submitFn}>
            <div className ="productTitle">Write Your Review</div>
            <div className="productSubTitle">About the Product</div>
            <br></br>
            <label className="addReview">Review Summary: *</label>
            <br></br>
            <input type="text" value={title} placeholder="Example: Best purchase ever!" onChange={e => {setTitle(e.target.value)}}></input>
            <br></br>

            <label className="addReview">Review Body: *</label>
            <br></br>
            <textarea cols="40" rows="4" value={body} id="bodyBox" placeholder="Why did you like the product or not?" onChange={e => { setBody(e.target.value) }} onKeyUp={(e) => reviewCounter(e)} minLength="50" maxLength="1000"></textarea>
            <div id="counter"></div>
            <br></br>

            <label className="addReview">Overall Rating: *</label>
            <br></br>

            <StarRatings
              rating={rating}
              starRatedColor="gold"
              changeRating={e => { setRating(e) }}
              numberOfStars={5}
              starDimension={`15px`}
              starSpacing={`2px`}
              starEmptyColor={`black`}
              starHoverColor={`gold`}
            />

            <br></br>
            <br></br>
            <label className="addReview">What Is Your Nickname: *</label>
            <br></br>
            <input type="text" value={name} placeholder="Example: jackson11!" onChange={e => { setName(e.target.value) }}></input>
            <div className="auth">For privacy reasons, do not use your full name or email address</div>
            <br></br>
            <label className="addReview">Your Email: *</label>
            <br></br>
            <input type="email" placeholder="Example: jackson11@email.com"></input>
            <div className="auth">For authentication reasons, you will not be emailed</div>
            <br></br>

            <div className="addReview">Upload your photos:</div>
            <br></br>
            <div>
              <input type="file" onChange={uploadImage} />
              <img src={imageSelected[0]} className="imgPreview"></img>
              <input type="file" onChange={uploadImage} />
              <img src={imageSelected[1]} className="imgPreview"></img>
              <input type="file" onChange={uploadImage} />
              <img src={imageSelected[2]} className="imgPreview"></img>
              <input type="file" onChange={uploadImage} />
              <img src={imageSelected[3]} className="imgPreview"></img>
              <input type="file" onChange={uploadImage} />
              <img src={imageSelected[4]} className="imgPreview"></img>
            </div>
            <br></br>

            <label className="addReview">Characteristics*</label>
            <br></br>
            <br></br>

              {radioSize.length > 0 ?
                <div className="radioTitle">Size &nbsp; {radioSize}</div> : <div className="radioTitle">Size &nbsp; none selected</div>}
              <div className="rBList">
                <label className="radioButton" onClick={() => { setRadioSize('A size too small') }}><input type="radio" />A size too small &nbsp;</label>
                <label className="radioButton"><input type="radio" onClick={() => {
                  setRadioSize('½ a size too small')
                }} />½ a size too small &nbsp;</label>
                <label className="radioButton" onClick={() => {
                  setRadioSize('Perfect')
                }}><input type="radio" />Perfect &nbsp;</label>
                <label className="radioButton" onClick={() => {
                  setRadioSize('½ a size too big')
                }}><input type="radio" />½ a size too big &nbsp;</label>
                <label className="radioButton" onClick={() => {
                  setRadioSize('A size too wide')
                }}><input type="radio" />A size too wide &nbsp;</label>
              </div>
            <br></br>

            <div>
              {radioWidth.length > 0 ?
                <div className="radioTitle">Width &nbsp; {radioWidth}</div> : <div className="radioTitle">Width &nbsp; none selected</div>}
              <div className="rBList">
                <label className="radioButton" onClick={() => { setRadioWidth('Too narrow') }}><input type="radio" />Too narrow &nbsp;</label>
                <label className="radioButton"><input type="radio" onClick={() => {
                  setRadioWidth('Slightly narrow')
                }} />Slightly narrow &nbsp;</label>
                <label className="radioButton" onClick={() => {
                  setRadioWidth('Perfect')
                }}><input type="radio" />Perfect &nbsp;</label>
                <label className="radioButton" onClick={() => {
                  setRadioWidth('Slightly wide')
                }}><input type="radio" />Slightly wide &nbsp;</label>
                <label className="radioButton" onClick={() => {
                  setRadioWidth('Too wide')
                }}><input type="radio" />Too wide &nbsp;</label>
              </div>
            </div>
            <br></br>

            <div>
              {radioComfort.length > 0 ?
                <div className="radioTitle">Comfort &nbsp; {radioComfort}</div> : <div className="radioTitle">Comfort &nbsp; none selected</div>}
              <div className="rBList">
                <label className="radioButton" onClick={() => { setRadioComfort('Uncomfortable') }}><input type="radio" />Uncomfortable &nbsp;</label>
                <label className="radioButton"><input type="radio" onClick={() => {
                  setRadioComfort('Slightly uncomfortable')
                }} />Slightly uncomfortable &nbsp;</label>
                <label className="radioButton" onClick={() => {
                  setRadioComfort('Ok')
                }}><input type="radio" />Ok &nbsp;</label>
                <label className="radioButton" onClick={() => {
                  setRadioComfort('Comfortable')
                }}><input type="radio" />Comfortable &nbsp;</label>
                <label className="radioButton" onClick={() => {
                  setRadioComfort('Perfect')
                }}><input type="radio" />Perfect &nbsp;</label>
              </div>
            </div>
            <br></br>

            <div>
              {radioQuality.length > 0 ?
                <div className="radioTitle">Quality &nbsp; {radioQuality}</div> : <div className="radioTitle">Quality &nbsp; none selected</div>}
              <div className="rBList">
                <label className="radioButton" onClick={() => { setRadioQuality('Poor') }}><input type="radio" />Poor &nbsp;</label>
                <label className="radioButton"><input type="radio" onClick={() => {
                  setRadioQuality('Below average')
                }} />Below average &nbsp;</label>
                <label className="radioButton" onClick={() => {
                  setRadioQuality('What I expected')
                }}><input type="radio" />What I expected &nbsp;</label>
                <label className="radioButton" onClick={() => {
                  setRadioQuality('Pretty great')
                }}><input type="radio" />Pretty great &nbsp;</label>
                <label className="radioButton" onClick={() => {
                  setRadioQuality('Perfect')
                }}><input type="radio" />Perfect &nbsp;</label>
              </div>
            </div>
            <br></br>

            <div>
              {radioLength.length > 0 ?
                <div className="radioTitle">Length &nbsp; {radioLength}</div> : <div className="radioTitle">Length &nbsp; none selected</div>}
              <div className="rBList">
                <label className="radioButton" onClick={() => { setRadioLength('Runs Short') }}><input type="radio" />Runs Short &nbsp;</label>
                <label className="radioButton"><input type="radio" onClick={() => {
                  setRadioLength('Runs slightly short')
                }} />Runs slightly short &nbsp;</label>
                <label className="radioButton" onClick={() => {
                  setRadioLength('Perfect')
                }}><input type="radio" />Perfect &nbsp;</label>
                <label className="radioButton" onClick={() => {
                  setRadioLength('Runs slightly long')
                }}><input type="radio" />Runs slightly long &nbsp;</label>
                <label className="radioButton" onClick={() => {
                  setRadioLength('Runs long')
                }}><input type="radio" />Runs long &nbsp;</label>
              </div>
            </div>
            <br></br>

            <div>
              {radioFit.length > 0 ?
                <div className="radioTitle">Fit &nbsp; {radioFit}</div> : <div className="radioTitle">Fit &nbsp; none selected</div>}
              <div className="rBList">
                <label className="radioButton" onClick={() => { setRadioFit('Runs Short') }}><input type="radio" />Runs Short &nbsp;</label>
                <label className="radioButton"><input type="radio" onClick={() => {
                  setRadioFit('Runs slightly short')
                }} />Runs slightly short &nbsp;</label>
                <label className="radioButton" onClick={() => {
                  setRadioFit('Perfect')
                }}><input type="radio" />Perfect &nbsp;</label>
                <label className="radioButton" onClick={() => {
                  setRadioFit('Runs slightly long')
                }}><input type="radio" />Runs slightly long &nbsp;</label>
                <label className="radioButton" onClick={() => {
                  setRadioFit('Runs long')
                }}><input type="radio" />Runs long &nbsp;</label>
              </div>
            </div>
            <br></br>

            <label className="addReview">Do You Recommend This Product? *</label>
            <br></br>

            <div className="checkAlign">
              <input type="checkbox" name="rec" value={recommend} onClick={e => { setRecommend(true) }}></input><div className="checkLabel">Yes</div>
              <input type="checkbox" name="rec" value={recommend} onClick={e => { setRecommend(false) }}></input><div className="checkLabel">No</div>
            </div>
            <br></br>
            <input type="submit" value="Submit Review"></input>
          </form>
        </div>
      </div>

    ) : (

      <div className="reviewWrapper">
        <div className="ratingsWrapper">
          <Ratings
            averageRate={averageRate}
            percentHelpful={percentHelpful}
            reviews={reviews}
            comfort={comfort}
            size={size}
            rating={rating}
            setStarReview={setStarReview}
            starReview={starReview}
            reviewState={reviewState}
          />
        </div>
        <div id="list" className="reviewList">
          <div>

            <div className="dropdown">
              <div className="reviewTitle">
                {reviews.length} reviews, sorted by
                <select value={option} onChange={changeOption} className="dropbutton">
                  <option value='Relevance' >Relevance</option>
                  <option value='Helpful' >Helpful</option>
                  <option value='Newest' >Newest</option>
                </select>
              </div>
            </div>



            <div className="reviewBox">
              <nav className="nav">
                {reviewState.slice(0, dataCount).map((info, index) => (
                  <ReviewListEntry
                    body={info.body}
                    title={info.summary}
                    rating={info.rating}
                    helpfulness={info.helpfulness}
                    name={info.reviewer_name}
                    id={info.review_id}
                    date={info.date}
                    recommend={info.recommend}
                    response={info.response}
                    photos={info.photos}
                    key={info.review_id}
                  />
                ))}
              </nav>
            </div>
          </div>
          <div>

            {dataCount < reviews.length && reviews.length > 2 && reviews.length !== 101 ?
              <button className="reviewButton" onClick={() => { setDataCount(dataCount + 2) }}>MORE REVIEWS</button> : null}

            <button onClick={handleFormView} className="reviewButton">ADD A REVIEW +</button>
          </div>
        </div>
      </div>)
  )
}
