import * as React from 'react';
import { Button } from 'antd';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';

const Join = () => {
  const history = useHistory();

  const handleJoin = () => {
    Axios.get(`http://localhost:5000/join`).then(res => {
      history?.push(`/session/${res.data.link}?`);
    });
  };
  return <Button onClick={handleJoin}>Join</Button>;
};

export default Join;
