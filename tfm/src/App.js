import React from 'react';
import './App.css';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import Login from './components/login/login'

function App() {
  return (
    <Router>
			<div className="App">
				{/*<Appbar />*/}
				<Route exact path="/login" component={Login} />
			</div>
		</Router>
  );
}

export default App;
