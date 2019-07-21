import React, { useState } from 'react';
import '../styles/bookmarkSearch.scss';

function BookmarkSearch({ update }) {
  const [searchText, setSearchText] = useState('');

  const handleInputChange = ({ target: { value } }) => {
    setSearchText(value);

    // TODO: set debounce
    update(value);
  }

  return (
    <div className="bookmark-search">
      <input
        className="search-input"
        type="text"
        value={searchText}
        onChange={handleInputChange}
        placeholder="Search"
      />
    </div>
  );
}

export default BookmarkSearch;
