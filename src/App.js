import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Authentication from './Pages/Authentication';
import Home from './Pages/Home';
import Post from './Pages/Post';



const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Authentication />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Post" element={<Post />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
