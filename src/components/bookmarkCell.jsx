import React from 'react';
import '../styles/bookmarkCell.scss'

function BookmarkCell({ bookmark: { name, uri, tags } }) {
  return (
    <div className="bookmark-cell">
      <a href={uri} target="_blank" rel="noopener noreferrer">
        <span className="bookmark-title">{name}</span>
        <span className="bookmark-uri">{uri}</span>
      </a>
      <div className="bookmark-tags">
        {tags && tags.map(tag => (
          <span className="bookmark-tag" key={tag}>#{tag}</span>
        ))}
      </div>
    </div>
  );
}

export default BookmarkCell;
