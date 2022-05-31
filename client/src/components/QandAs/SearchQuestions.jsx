import React, { useState, useEffect} from 'react';
import axios from 'axios';

/*After the user types 3 or more characters into the search bar the results will begin to filter to only those containing matching text.

The filter should continue to update as the user adds or removes characters.

If the user clears the search term, or removes characters so that less than 3 remain, the list should return to the state where it is not filtered to matching text.

The search filter should work with any other filters or sorts that have been applied, and narrow the results further. Changes to the sort and rating filters should not remove the search term filter.*/

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