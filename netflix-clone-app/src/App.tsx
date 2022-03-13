import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import Home from './routes/Home';
import Search from './routes/Search';
import Tv from './routes/Tv';
 
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/search?keyword=:name" element={<Search />} />
          <Route path="/tv" element={<Tv />} />
          <Route path="/*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
