import React from 'react';
import {Image} from 'react-native';
import styles from './styles';
import IconButton from '../iconButton';

type AvatarProps = {
  size: number;
  image: any;
};

const Avatar = ({size, image}: AvatarProps) => {
  return (
    <IconButton noPadding overflow="hidden">
      <Image
        source={image}
        style={[styles.avatar, {width: size, height: size}]}
      />
    </IconButton>
  );
};

export default Avatar;
