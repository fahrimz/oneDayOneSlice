import React from 'react';
import {View} from 'react-native';

type GapProps = {
  width?: number;
  height?: number;
};

const Gap = ({width, height}: GapProps) => {
  return <View style={{width, height}} />;
};

export default Gap;
