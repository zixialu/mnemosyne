import React from 'react';
import '../styles/bookmarkList.scss';

function BookmarkList(props) {
  return (
    <main className="bookmark-list">
      Bookmark List
      {JSON.stringify(props.bookmarks)}
    </main>
  );
}

export default BookmarkList;
