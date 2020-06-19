import React, { useContext } from 'react';
import Jitsi from 'react-jitsi'
import { UserContext } from '../../userContext';


const roomName = 'my-super-secret-meeting-123e4567-e89b-12d3-a456-426655440000'


const JitsiVideo = () => {

  const {user, setUser} = useContext(UserContext);

  const userFullName = `${user.name} ${user.lastName}`;

    return(
      <div style={{marginTop: 60}}>
          <Jitsi
            config={{
              disableDeepLinking: true
            }}
            containerStyle={{ width: '100%', height: '1000px' }}
            interfaceConfig={{    
              SHOW_JITSI_WATERMARK: false,
              TOOLBAR_BUTTONS: [
                'microphone', 'camera', 'closedcaptions', 'desktop',
                'fodeviceselection', 'hangup', 'profile', 'chat', 'recording', 'etherpad',
                'filmstrip', 'invite', 'feedback',
                'tileview', 'download', 'help', 'mute-everyone',
                'security'
              ],
            }}
            roomName={roomName}
            displayName={userFullName} 
        />
      </div>

    )
}

export default JitsiVideo;