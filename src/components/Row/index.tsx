import React from 'react';
import {View} from 'react-native';
import {ContainerProps} from '../types';
import styles from './styles';

const Row = ({style, children, ...otherStyle}: ContainerProps) => {
  return <View style={[styles.root, style, otherStyle]}>{children}</View>;
};

export default Row;
