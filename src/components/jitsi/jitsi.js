import React, { useContext } from 'react';
import Jitsi from 'react-jitsi'
import { UserContext } from '../../userContext';
import { CircularProgress } from '@material-ui/core';


const studentButtons = ['microphone', 'camera', 'desktop', 'chat', 'fullscreen', 'videobackgroundblur','raisehand'];
const teacherButtons = ['microphone', 'camera', 'desktop', 'videobackgroundblur', 'fullscreen', 'recording', 'etherpad', 'mute-everyone','raisehand',];

const JitsiVideo = () => {

  const { user } = useContext(UserContext);

  const userFullName = `${user.name} ${user.lastName}`;

  const roomName = `TFM--${user.selectedClassroom.keyName}`;

  const loader = () => { return (<span style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><CircularProgress /> </span>) }

  return (
    <div style={{ marginTop: 60, width: '100vw', height: '92vh' }}>
      <Jitsi
        config={{
          disableDeepLinking: true,
          startWithVideoMuted: true,
          startWithAudioMuted: user.role === 'STUDENT',
          disableRemoteMute: user.role === 'STUDENT',
          remoteVideoMenu: {
            disableKick: user.role === 'STUDENT',
          },
        }}
        containerStyle={{ width: '100%', height: '100%' }}
        interfaceConfig={{
          SHOW_JITSI_WATERMARK: false,
          TOOLBAR_BUTTONS: user.role === 'STUDENT' ? studentButtons : teacherButtons
        }}
        roomName={`TFM--${roomName}`}
        password={`${roomName}-_-TFM-proyecto`}
        displayName={userFullName}
        loadingComponent={loader}
      />
    </div>

  )
}

export default JitsiVideo;