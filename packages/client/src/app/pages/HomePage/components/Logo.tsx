import Icon from '@ant-design/icons';
import * as React from 'react';
import { ReactComponent as LogoSvg } from '../assets/logo.svg';

export const Logo = () => {
  return <Icon component={LogoSvg} style={{ fontSize: 66 }} />;
};
