import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import HomeScreen from './components/HomeScreen';
import Landing from './components/Landing';
import MarketPlace from './components/MarketPlace';
import Selection from './components/Selection';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import WarRoom from './components/WarRoom';
import Game from './components/Game';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/play/battle/:id" element={<Game />} />
        <Route exact path="/play" element={<HomeScreen />} />
        <Route exact path="/warroom" element={<WarRoom />} />
        <Route exact path="/marketplace" element={<MarketPlace />} />
        <Route exact path="/select" element={<Selection />} />
        <Route exact path="/" element={<Landing />} />
      </Routes>
    </Router>    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
