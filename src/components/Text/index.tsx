import React from 'react';
import {Text as TextDefault, TextStyle} from 'react-native';

type TextProps = TextDefault['props'] & {
  color?: TextStyle['color'];
  size?: TextStyle['fontSize'];
  weight?: TextStyle['fontWeight'];
  textTransform?: TextStyle['textTransform'];
};

const Text = ({
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
        {color, fontSize: size, textTransform, fontWeight: weight},
      ]}
    />
  );
};

export default Text;
