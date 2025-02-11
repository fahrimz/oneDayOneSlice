import React from 'react';
import {View, ViewStyle} from 'react-native';

type GapProps = {
  width?: number;
  height?: number;
  color?: ViewStyle['backgroundColor'];
};

const Gap = ({width, height, color}: GapProps) => {
  return <View style={{width, height, backgroundColor: color}} />;
};

export default Gap;
