import React, { useState, useEffect} from 'react';
import axios from 'axios';


function SearchQuestions({ searchQuestions, product_id }) {

  const [searchInput, setSearchInput] = useState('');

  const searchChange = (e) => {
    const { value } = e.target;
    setSearchInput(value)

    if (value.length >= 3) {
      searchQuestions(value)
    } else {
      searchQuestions()
    }
  }

  const searchSubmit = (e) => {
    e.preventDefault();
    console.log('submitted question')
  }

  return(
    <div>
    <form className="search-bar" onSubmit={(e) => searchSubmit(e)}>
      <input style={{width: '100vw'}}
        type="text"
        placeholder="Have a question? Search for answers..."
        value={searchInput}
        onChange={(e) => searchChange(e)}
      />
      <input type="submit" value="Search"/>
    </form>
    </div>
  );
}

export default SearchQuestions;