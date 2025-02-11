import React, {useCallback} from 'react';
import {PanResponder, GestureResponderEvent} from 'react-native';
import Svg, {Circle, G, Rect, Text} from 'react-native-svg';
import {Colors} from '../../constants';

const MIN_TEMP = 16;
const MAX_TEMP = 30;
const STEP = MAX_TEMP - MIN_TEMP;
const STEP_SIZE = 360 / STEP;
const ANGLE_RANGE = 360 - STEP_SIZE;
const START_ANGLE = STEP_SIZE;

interface CircularSliderProps {
  width: number;
  height: number;
  value: number; // should be between MIN_TEMP and MAX_TEMP;
  onValueChange: (value: number) => void;
}


const CircularSlider: React.FC<CircularSliderProps> = ({
  width,
  height,
  value,
  onValueChange,
}) => {
  const smallestSide = Math.min(width, height);
  const cx = width / 2;
  const cy = height / 2;
  const r = (smallestSide / 2) * 0.85;

  const tempToAngle = useCallback((temp: number) => {
    const normalizedTemp = Math.min(Math.max(temp, MIN_TEMP), MAX_TEMP);
    const percentage = (normalizedTemp - MIN_TEMP) / (MAX_TEMP - MIN_TEMP);
    return START_ANGLE + percentage * ANGLE_RANGE;
  }, []);

  const angleToTemp = useCallback(
    (angle: number) => {
      let normalizedAngle = angle % 360;
      if (normalizedAngle < 0) normalizedAngle += 360;

      if (
        normalizedAngle > (START_ANGLE + ANGLE_RANGE) % 360 &&
        normalizedAngle < START_ANGLE
      ) {
        return value;
      }

      let relativeAngle = normalizedAngle - START_ANGLE;
      if (relativeAngle < 0) relativeAngle += 360;
      if (relativeAngle > ANGLE_RANGE) relativeAngle = ANGLE_RANGE;

      const percentage = relativeAngle / ANGLE_RANGE;
      const temp = MIN_TEMP + percentage * (MAX_TEMP - MIN_TEMP);
      return Math.round(Math.min(Math.max(temp, MIN_TEMP), MAX_TEMP));
    },
    [value],
  );

  const polarToCartesian = useCallback(
    (angle: number) => {
      const a = ((angle - 270) * Math.PI) / 180.0;
      const x = cx + r * Math.cos(a);
      const y = cy + r * Math.sin(a);
      return {x, y};
    },
    [cx, cy, r],
  );

  const cartesianToPolar = useCallback(
    (x: number, y: number) => {
      return Math.round(
        Math.atan((y - cy) / (x - cx)) / (Math.PI / 180) + (x > cx ? 270 : 90),
      );
    },
    [cx, cy],
  );

  const handlePanResponderMove = useCallback(
    ({nativeEvent: {locationX, locationY}}: GestureResponderEvent) => {
      const angle = cartesianToPolar(locationX, locationY);
      const newTemp = angleToTemp(angle);
      onValueChange(newTemp);
    },
    [cartesianToPolar, angleToTemp, onValueChange],
  );

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: handlePanResponderMove,
  });

  const sliderAngle = tempToAngle(value);
  const endCoord = polarToCartesian(sliderAngle);

  return (
    <Svg width={width} height={height} {...panResponder.panHandlers}>
      <Circle
        cx={cx}
        cy={cy}
        r={r}
        stroke="#eee"
        strokeWidth={10}
        fill="none"
      />
      <G x={endCoord.x} y={endCoord.y} origin={`${endCoord.x}, ${endCoord.y}`}>
        <Rect
          x={-3}
          y={-12}
          width={6}
          height={24}
          rx={3}
          rotation={sliderAngle}
          fill="rgba(0, 0, 0, 0.1)"
        />
        <Rect
          x={-2}
          y={-11}
          width={4}
          height={22}
          rx={2}
          rotation={sliderAngle}
          fill={Colors.white}
        />
      </G>
      <Text x={cx - 14} y={cy + 10} fontSize={20} fill={Colors.menuBgBlack}>
        {value}°
      </Text>
    </Svg>
  );
};

export default CircularSlider;
