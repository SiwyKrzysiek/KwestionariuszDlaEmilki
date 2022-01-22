import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

import 'survey-react/modern.min.css';
import { StylesManager } from 'survey-react';

StylesManager.applyTheme("modern");

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
