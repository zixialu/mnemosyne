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
  const [search, setSearch] = useState('');
  const [filteredBookmarks, setFilteredBookmarks] = useState(null);

  // Get bookmarks
  useEffect(() => {
    let ignore = false;

    async function getBookmarks() {
      const bookmarks = await BookmarkService.getBookmarks();
      if (!ignore) setBookmarks(bookmarks);
    }
    getBookmarks();

    return () => { ignore = true; };
  }, [])

  // Filter bookmarks
  useEffect(() => {
    function filterBookmarks() {
      setFilteredBookmarks(bookmarks && bookmarks.filter(bookmark => (
        bookmark.name
          .toLowerCase()
          .includes(search.toLowerCase())
      )));
    }
    filterBookmarks();
  }, [bookmarks, search])

  return (
    <div className="app">
      <Header />
      <Sidebar />
      <BookmarkSearch update={setSearch} />
      <BookmarkList bookmarks={filteredBookmarks} />
      <DetailsPane />
    </div>
  );
}

export default App;
