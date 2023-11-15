import * as React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Review from '../Review';
import Landing from '../Landing';
import WatchList  from '../WatchList';
import Search from '../Search';



const App = () => {


  return (
    <Router>
      <div>
        <Routes>
          <Route path="/Search" element={<Search />} />
          <Route path="/Review" element={<Review />} />
          <Route path="/WatchList" element={<WatchList />} />
          <Route path="/" element={<Landing />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;