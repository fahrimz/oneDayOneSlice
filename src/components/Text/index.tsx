import React from 'react';
import {Animated, Text as TextDefault, TextStyle} from 'react-native';

type TextProps = TextDefault['props'] & {
  color?: TextStyle['color'];
  family?: TextStyle['fontFamily'];
  size?: TextStyle['fontSize'];
  weight?: TextStyle['fontWeight'];
  textTransform?: TextStyle['textTransform'];
  animated?: boolean;
  align?: TextStyle['textAlign'];
};

export const Text = ({
  color,
  family,
  size,
  weight,
  textTransform,
  style,
  align,
  ...props
}: TextProps) => {
  return (
    <TextDefault
      {...props}
      style={[
        style,
        {
          fontFamily: family,
          fontSize: size,
          textTransform,
          fontWeight: weight,
          color,
          textAlign: align,
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
  family,
  size,
  weight,
  textTransform,
  style,
  align,
  ...props
}: AnimatedTextProps) => {
  return (
    <Animated.Text
      {...props}
      style={[
        style,
        {
          fontFamily: family,
          fontSize: size,
          textTransform,
          fontWeight: weight,
          color,
          textAlign: align,
        },
      ]}
    />
  );
};
