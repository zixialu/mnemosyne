import React from 'react';
import '../styles/bookmarkList.scss';
import BookmarkCell from './BookmarkCell';

function BookmarkList({ bookmarks }) {
  return (
    <main className="bookmark-list">
      {bookmarks && bookmarks.map(bookmark => (
        <BookmarkCell bookmark={bookmark} key={bookmark.id} />
      ))}
    </main>
  );
}

export default BookmarkList;
