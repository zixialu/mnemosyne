import React from 'react';
import Header from './header';
import Sidebar from './sidebar';
import BookmarkSearch from './bookmarkSearch';
import BookmarkList from './bookmarkList';
import DetailsPane from './detailsPane';
import '../styles/app.scss';

function App() {
  return (
    <div className="app">
      <Header />
      <Sidebar />
      <BookmarkSearch />
      <BookmarkList />
      <DetailsPane />
    </div>
  );
}

export default App;
