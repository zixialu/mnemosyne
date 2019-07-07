import React from 'react';
import Header from './header';
import Sidebar from './sidebar';
import BookmarkList from './bookmarkList';
import DetailsPane from './detailsPane';
import '../styles/app.scss';

function App() {
  return (
    <div className="app">
      <Header />
      <Sidebar />
      <BookmarkList />
      <DetailsPane />
    </div>
  );
}

export default App;
