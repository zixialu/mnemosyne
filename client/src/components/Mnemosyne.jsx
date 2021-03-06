import React, { useState, useEffect } from 'react';
import BookmarkService from '../services/BookmarkServices';
import Header from './Header';
import Sidebar from './Sidebar';
import BookmarkSearch from './BookmarkSearch';
import BookmarkList from './BookmarkList';
import DetailsPane from './DetailsPane';
import '../styles/mnemosyne.scss';

function Mnemosyne() {
  const [bookmarks, setBookmarks] = useState(null);
  const [search, setSearch] = useState('');
  const [filteredBookmarks, setFilteredBookmarks] = useState(null);
  const [selectedBookmark, setSelectedBookmark] = useState(null);

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
      const lowerCaseSearch = search.toLowerCase()
      setFilteredBookmarks(bookmarks && bookmarks.filter(bookmark => (
        bookmark.name
          .toLowerCase()
          .includes(lowerCaseSearch)
        || bookmark.tags
          .map(tag => tag.toLowerCase())
          .includes(lowerCaseSearch)
      )));
    }
    filterBookmarks();
  }, [bookmarks, search])

  const closeDetailsPane = () => setSelectedBookmark(null);

  return (
    <div className="mnemosyne">
      <Header />
      <Sidebar />
      <BookmarkSearch update={setSearch} />
      <BookmarkList
        bookmarks={filteredBookmarks}
        selectBookmark={setSelectedBookmark} />
      <DetailsPane bookmark={selectedBookmark} close={closeDetailsPane} />
    </div>
  );
}

export default Mnemosyne;
