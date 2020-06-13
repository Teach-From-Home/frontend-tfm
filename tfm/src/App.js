import React, { Fragment } from 'react';
import './App.css';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import Login from './components/login/login';
import JitsiVideo from './components/jitsi/jitsi';
import PersistentDrawerLeft from './components/drawer/drawer';
import Home from './components/home/home';
import Homework from './components/homework/homework';

function App() {
  return (
    <Router>
		<div className="App">
			<PersistentDrawerLeft />
			<div style={{marginTop: 70}}>
				<Route exact path="/login" component={Login} />
				<Route exact path="/call" component={JitsiVideo} />
				<Route exact path="/" component={Home} />
				<Route exact path="/homework" component={Homework} />
			</div>	
		</div>
	</Router>
  );
}

export default App;
