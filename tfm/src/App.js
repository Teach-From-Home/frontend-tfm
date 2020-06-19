import React, { Fragment, useState, useMemo } from 'react';
import './App.css';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import Login from './components/login/login';
import JitsiVideo from './components/jitsi/jitsi';
import PersistentDrawerLeft from './components/drawer/drawer';
import Home from './components/home/home';
import Homework from './components/homework/homework';
import Forum from './components/forum/forum';
import Profile from './components/profile/profile';
import { UserContext } from './userContext';
import PrivateRoute from './privateRoute'
import StudentsHomework from './components/homework/studentsHomework';

function App() {
  const [user, setUser] = useState('');
  const providerValue = useMemo(() => ({user, setUser}), [user, setUser]);

  return (
    <Router>
		<div className="App">
			<UserContext.Provider value={providerValue}> 
				<PersistentDrawerLeft/>
				<div style={{marginTop: 64}}>
					<Route exact path="/login" component={Login} />
					<PrivateRoute exact path="/call" component={JitsiVideo} />
					<PrivateRoute exact path="/homework" component={Homework} />
					<PrivateRoute exact path="/forum" component={Forum} />
					<PrivateRoute exact path="/profile" component={Profile} />
					<PrivateRoute exact path="/studentsHomework" component={StudentsHomework} />
					<PrivateRoute exact path="/" component={Home} />
				</div>
			</UserContext.Provider>
		</div>
	</Router>
  );
}

export default App;
