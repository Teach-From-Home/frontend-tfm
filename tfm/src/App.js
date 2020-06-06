import React from 'react';
import './App.css';
import Jitsi from 'react-jitsi'

const roomName = 'my-super-secret-meeting-123e4567-e89b-12d3-a456-426655440000'
const userFullName = 'Joseph Strawberry'

function App() {
  return (
    <div className="App">
      <Jitsi containerStyle={{ width: '100%', height: '1000px' }} roomName={roomName} displayName={userFullName} />
    </div>
  );
}

export default App;
