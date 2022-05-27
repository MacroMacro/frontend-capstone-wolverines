import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReviewListEntry from './ReviewListEntry.jsx';
import Ratings from './Ratings.jsx';
import StarRatings from 'react-star-ratings';
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

  const [countFive, setCountFive] = useState(0);
  const [countFour, setCountFour] = useState(0);
  const [countThree, setCountThree] = useState(0);
  const [countTwo, setCountTwo] = useState(0);
  const [countOne, setCountOne] = useState(0);

  const getReviews = () =>
  {axios.get(`/reviews/${id}`)
  .then((response) => {
    let reviews = response.data.results;
    //console.log(reviews);
    reviews.sort((a, b) => (a['helpfulness'] < b['helpfulness']) ? 1 : -1)
    setReviews(reviews);
  })
  .catch(err => console.log(err));
  }

  const getReviewMeta = () => {
    axios.get(`/reviews/meta/${id}`)
    .then((response) => {
      console.log(response)
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
        //var openDropdown = drop[i];
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
      email: 'test@gmail.com',
      photos: ['text'],
      characteristics: {'135219': 5, '135220': 5}
    })
    .then((response) => {
      getReviews()
    })
    .catch((err) => console.log(err))

    //console.log(title, body);
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
    //console.log(arr);
    return percent;
  }
  let percentHelpful = percentRec(reviews)

  axios.get(`/reviews/${id}`)
  .then((response) => {
    //console.log(response.data.results)
    return response.data.results.reduce((prev, curr) => prev = prev + curr.rating, 0)/ response.data.results.length
  })
  .then((avgRating) => {
    setRating(avgRating)})
  .catch(err => console.log(err));

  // COUNT FOR RATINGS OF 5
  axios.get(`/reviews/${id}`)
  .then((response) => {
    let count = 0;
    response.data.results.forEach((item) => {
      if (item.rating === 5) {
        count++
      }
    })
    let div = count/ response.data.results.length * (100)
    return div;
  })
  .then((perc) => {
    setCountFive(perc)
  })
  .catch(err => console.log(err));

  // COUNT FOR RATINGS OF 4
  axios.get(`/reviews/${id}`)
  .then((response) => {
    let count = 0;
    response.data.results.forEach((item) => {
      if (item.rating === 4) {
        count++
      }
    })
    let div = count/ response.data.results.length * (100)
    return div;
  })
  .then((perc) => {
    setCountFour(perc)
  })
  .catch(err => console.log(err));

  // COUNT FOR RATINGS OF 3
  axios.get(`/reviews/${id}`)
  .then((response) => {
    let count = 0;
    response.data.results.forEach((item) => {
      if (item.rating === 3) {
        count++
      }
    })
    let div = count/ response.data.results.length * (100)
    return div;
  })
  .then((perc) => {
    setCountThree(perc)
  })
  .catch(err => console.log(err));

  // COUNT FOR RATINGS OF 2
  axios.get(`/reviews/${id}`)
  .then((response) => {
    let count = 0;
    response.data.results.forEach((item) => {
      if (item.rating === 2) {
        count++
      }
    })
    let div = count/ response.data.results.length * (100)
    return div;
  })
  .then((perc) => {
    setCountTwo(perc)
  })
  .catch(err => console.log(err));

  // COUNT FOR RATINGS OF 1
  axios.get(`/reviews/${id}`)
  .then((response) => {
    let count = 0;
    response.data.results.forEach((item) => {
      if (item.rating === 1) {
        count++
      }
    })
    let div = count/ response.data.results.length * (100)
    return div;
  })
  .then((perc) => {
    setCountOne(perc)
  })
  .catch(err => console.log(err));

  return(
  formView ? (
  <div id = "list" className = "reviewList">
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
    {<Ratings
      rating = {rating}
      percentHelpful = {percentHelpful}
      reviews = {reviews}
      countFive = {countFive}
      countFour = {countFour}
      countThree = {countThree}
      countTwo = {countTwo}
      countOne = {countOne}
    />}
    {reviews.map((info)=> (
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

  <form onSubmit = {submitFn}>
    <label className = "addReview">Add a title:</label>
    <br></br>
    <input type="text" value={title} onChange={e => {setTitle(e.target.value)}}></input>
    <br></br>
    <label className = "addReview">Add a written review:</label>
    <br></br>
    <input type="text" value={body} onChange={e => {setBody(e.target.value)}}></input>
    <br></br>
    <label className = "addReview">Add a rating:</label>
    <br></br>
    <input type="text" onChange={e => {setRating(e.target.value)}}></input>
    <br></br>
    <label className = "addReview">Name:</label>
    <br></br>
    <input type="text" value={name} onChange={e => {setName(e.target.value)}}></input>
    <br></br>
    <label className = "addReview">Recommend?</label>
    <br></br>
    <input type="checkbox" name = "rec" value={recommend} onClick={e => {setRecommend(true)}}></input>Yes
    <input type="checkbox" name = "rec" value={recommend} onClick={e => {setRecommend(false)}}></input>No
    <br></br>
    <input type="submit" value="Submit"></input>
  </form>

  <button className = "reviewButton">MORE REVIEWS</button>
  <button onClick={handleFormView} className = "reviewButton">ADD A REVIEW +</button>
  </div>
  </div>) : (<div id = "list"  className = "reviewList">
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
    {<Ratings
      rating = {rating}
      percentHelpful = {percentHelpful}
      reviews = {reviews}
      countFive = {countFive}
      countFour = {countFour}
      countThree = {countThree}
      countTwo = {countTwo}
      countOne = {countOne}
    />}
    {reviews.map((info)=> (
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
  </div>)
  )
}
