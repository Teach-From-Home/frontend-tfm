import React, { useContext, useState, useEffect } from 'react';
import Jitsi from 'react-jitsi'
import { UserContext } from '../../userContext';

const studentButtons = ['microphone', 'camera', 'desktop','hangup', 'chat','tileview'];

const teacherButtons = ['microphone', 'camera', 'closedcaptions', 'desktop',
'fodeviceselection', 'hangup', 'profile', 'chat', 'recording', 'etherpad',
'filmstrip', 'invite', 'feedback',
'tileview', 'download', 'help', 'mute-everyone',
'security'];

const JitsiVideo = () => {

  const {user, setUser} = useContext(UserContext);
  const userFullName = `${user.name} ${user.lastName}`;

  const roomName = user.selectedClassroom.keyName;

  return(
    <div style={{marginTop: 60}}>
        <Jitsi
          config={{
            disableDeepLinking: true
          }}
          containerStyle={{ width: '100%', height: '1000px' }}
          interfaceConfig={{    
            SHOW_JITSI_WATERMARK: false,
            TOOLBAR_BUTTONS: user.role === 'STUDENT' ? studentButtons : teacherButtons
          }}
          roomName={roomName}
          displayName={userFullName} 
        />
    </div>

  )
}

export default JitsiVideo;