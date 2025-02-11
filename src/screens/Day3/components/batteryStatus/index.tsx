import React from 'react';
import {View} from 'react-native';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import Svg, { Circle } from 'react-native-svg';
import { Colors } from '../../constants';
import styles from './styles';

const BatteryStatus = ({
  status,
}: {
  status: [boolean, boolean, boolean, boolean];
}) => {
  const strokeWidth = 8;
  const radius = 46;
  const circumference = 2 * Math.PI * radius;
  const segmentLength = circumference / 4; // Each segment is 25%
  const gapSize = 12; // Space between segments

  return (
    <View
      style={styles.container}>
      <Svg width={56} height={56} viewBox="0 0 100 100">
        {status.map((active: boolean, index: number) => {
          const rotation = 188; // Rotate each segment 90 degrees

          return (
            <Circle
              key={index}
              cx="50"
              cy="50"
              r={radius}
              stroke={active ? Colors.energyGreen : Colors.backgroundGray}
              strokeWidth={strokeWidth}
              fill="none"
              strokeDasharray={`${segmentLength - gapSize} ${circumference}`} // Creates the gaps
              strokeDashoffset={-index * segmentLength} // Position each segment
              strokeLinecap="round"
              transform={`rotate(-90, 50, 50) rotate(${rotation}, 50, 50)`} // Align segments
            />
          );
        })}
      </Svg>
      {/* Center Icon */}
      <View style={styles.icon}>
        <MaterialIcons
          name="energy-savings-leaf"
          color={Colors.menuBgBlack}
          size={24}
        />
      </View>
    </View>
  );
};

export default BatteryStatus;
