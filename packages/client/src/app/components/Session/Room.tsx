import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'antd';
import { useObjectFromUrl } from '../../../utils/hooks/useObjectFromUrl';
import { createSocketConnectionInstance } from '../../../services/connection';

const { useRef, useEffect, useState, useLayoutEffect } = React;

interface IProps {
  userName: string;
}

const Room = (props: IProps) => {
  const history = useHistory();
  let params = useObjectFromUrl();

  const { userName } = props;

  const [micStatus, setMicStatus] = useState(true);
  const [camStatus, setCamStatus] = useState(true);
  const [streaming, setStreaming] = useState(false);
  const [displayStream, setDisplayStream] = useState(false);

  const socketInstance: any = useRef(null);

  const handleDisconnect = () => {
    socketInstance?.current?.destroyConnection();
    history.push('/');
  };

  const startConnection = () => {
    if (!params) params = { quality: 12 };
    socketInstance.current = createSocketConnectionInstance({
      updateInstance: updateFromInstance,
      params,
      userName,
    });
  };

  const updateFromInstance = (key: string, value: any) => {
    if (key === 'streaming') setStreaming(value);
    if (key === 'displayStream') setDisplayStream(value);
  };

  useEffect(() => {
    const _socketInstance = socketInstance;
    return () => {
      _socketInstance.current?.destoryConnection();
    };
  }, []);

  useEffect(() => {
    if (userName) startConnection();
  }, [userName]);

  useLayoutEffect(() => {
    const appBar = document.getElementsByClassName('app-navbar');
    // @ts-ignore
    if (appBar && appBar[0]) appBar[0].style.display = 'none';
    return () => {
      // @ts-ignore
      if (appBar && appBar[0]) appBar[0].style.display = 'block';
    };
  });

  const handleMyMic = () => {
    const { getMyVideo, reInitializeStream } = socketInstance.current;
    const myVideo = getMyVideo();
    if (myVideo)
      myVideo.srcObject?.getAudioTracks().forEach((track: any) => {
        if (track.kind === 'audio')
          // track.enabled = !micStatus;
          micStatus ? track.stop() : reInitializeStream(camStatus, !micStatus);
      });
    setMicStatus(!micStatus);
  };

  const handleMyCam = () => {
    if (!displayStream) {
      const { toggleVideoTrack } = socketInstance.current;
      toggleVideoTrack({ video: !camStatus, audio: micStatus });
      setCamStatus(!camStatus);
    }
  };

  return (
    <>
      <div id="room-container" />
      <span>"Camera:" </span>
      {streaming && (
        <Button onClick={handleMyCam}>{camStatus ? 'Off' : 'On'}</Button>
      )}
      <span>"Mic:" </span>
      {streaming && (
        <Button onClick={handleMyMic}>{micStatus ? 'Off' : 'On'}</Button>
      )}

      <Button onClick={handleDisconnect}>Disconnect</Button>
    </>
  );
};

export default Room;
