import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Game } from './components/game';
import { App } from './App';
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
  ,
  document.getElementById('root')
);