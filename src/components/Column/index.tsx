import React from 'react';
import {Animated, View} from 'react-native';
import {ContainerProps} from '../types';
import styles from './styles';

const Column = ({style, children, animated, ...otherStyle}: ContainerProps) => {
  const Comp = animated ? Animated.View : View;

  return <Comp style={[styles.root, style, otherStyle]}>{children}</Comp>;
};

export default Column;
