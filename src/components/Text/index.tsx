import React from 'react';
import {Animated, Text as TextDefault, TextStyle} from 'react-native';

type TextProps = TextDefault['props'] & {
  color?: TextStyle['color'];
  size?: TextStyle['fontSize'];
  weight?: TextStyle['fontWeight'];
  textTransform?: TextStyle['textTransform'];
  animated?: boolean;
};

export const Text = ({
  color,
  size,
  weight,
  textTransform,
  style,
  ...props
}: TextProps) => {
  return (
    <TextDefault
      {...props}
      style={[
        style,
        {
          fontSize: size,
          textTransform,
          fontWeight: weight,
          color,
        },
      ]}
    />
  );
};

type AnimatedTextProps = Omit<TextProps, 'color'> & {
  color?: Animated.AnimatedInterpolation<string | number>;
};

export const AnimatedText = ({
  color,
  size,
  weight,
  textTransform,
  style,
  ...props
}: AnimatedTextProps) => {
  return (
    <Animated.Text
      {...props}
      style={[
        style,
        {
          fontSize: size,
          textTransform,
          fontWeight: weight,
          color,
        },
      ]}
    />
  );
};
