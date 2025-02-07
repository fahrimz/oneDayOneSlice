import React from 'react';
import {Animated, Pressable, PressableProps, ViewStyle} from 'react-native';
import styles from './styles';

type IconButtonProps = {
  children: React.ReactNode;
  noPadding?: boolean;
  style?: ViewStyle;

  // other style
  backgroundColor?:
    | ViewStyle['backgroundColor']
    | Animated.AnimatedInterpolation<string | number>;
  overflow?: ViewStyle['overflow'];
} & PressableProps;

const IconButton = ({
  children,
  noPadding,
  style,
  backgroundColor,
  overflow,
  ...pressableProps
}: IconButtonProps) => {
  return (
    <Pressable {...pressableProps}>
      <Animated.View
        style={[
          styles.container,
          style,
          backgroundColor && {backgroundColor},
          overflow && {overflow},
          noPadding && styles.noPadding,
        ]}>
        {children}
      </Animated.View>
    </Pressable>
  );
};

export default IconButton;
