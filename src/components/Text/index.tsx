import React from 'react';
import {Text as TextDefault, TextStyle} from 'react-native';

type TextProps = TextDefault['props'] & {
  color?: TextStyle['color'];
  fontSize?: TextStyle['fontSize'];
  textTransform?: TextStyle['textTransform'];
};

const Text = ({color, fontSize, textTransform, style, ...props}: TextProps) => {
  return (
    <TextDefault {...props} style={[style, {color, fontSize, textTransform}]} />
  );
};

export default Text;
