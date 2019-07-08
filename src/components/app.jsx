import React, { useState, useEffect } from 'react';
import BookmarkService from '../services/BookmarkServices';
import Header from './header';
import Sidebar from './sidebar';
import BookmarkSearch from './bookmarkSearch';
import BookmarkList from './bookmarkList';
import DetailsPane from './detailsPane';
import '../styles/app.scss';

function App() {
  const [bookmarks, setBookmarks] = useState(null);

  useEffect(() => {
    let ignore = false;

    async function getBookmarks() {
      const bookmarks = await BookmarkService.getBookmarks();
      if (!ignore) setBookmarks(bookmarks);
    }
    getBookmarks();

    return () => { ignore = true; };
  }, [])

  return (
    <div className="app">
      <Header />
      <Sidebar />
      <BookmarkSearch />
      <BookmarkList bookmarks={bookmarks} />
      <DetailsPane />
    </div>
  );
}

export default App;
