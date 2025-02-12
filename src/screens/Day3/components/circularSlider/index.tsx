import React, {useCallback} from 'react';
import {PanResponder, GestureResponderEvent} from 'react-native';
import Svg, {Circle, G, Line, Rect, Text} from 'react-native-svg';
import {Colors} from '../../constants';

const MIN_TEMP = 16;
const MAX_TEMP = 30;
const STEP = MAX_TEMP - MIN_TEMP;
const STEP_SIZE = 360 / STEP;
const ANGLE_RANGE = 360 - STEP_SIZE;
const START_ANGLE = STEP_SIZE;

// Color interpolation function
const interpolateColor = (progress: number) => {
  // Convert progress to a value between 0 and 1
  const normalized = Math.min(Math.max(progress, 0), 1);

  // RGB values for blue (start) and red (end)
  const startColor = {r: 123, g: 211, b: 234};
  const endColor = {r: 255, g: 138, b: 138};

  // Interpolate between the colors
  const r = Math.round(startColor.r + (endColor.r - startColor.r) * normalized);
  const g = Math.round(startColor.g + (endColor.g - startColor.g) * normalized);
  const b = Math.round(startColor.b + (endColor.b - startColor.b) * normalized);

  return `rgba(${r}, ${g}, ${b}, 0.7)`;
};

interface CircularSliderProps {
  width: number;
  height: number;
  value: number;
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

  const generateLineCoord = (i: number, lineLength: number) => {
    const angle = START_ANGLE + i * STEP_SIZE;
    const coord = polarToCartesian(angle);
    const x1 = cx + (coord.x - cx) * (lineLength / r);
    const y1 = cy + (coord.y - cy) * (lineLength / r);
    return {coord, x1, y1};
  };

  // Rest of the helper functions remain the same
  const tempToAngle = useCallback((temp: number) => {
    const normalizedTemp = Math.min(Math.max(temp, MIN_TEMP), MAX_TEMP);
    const percentage = (normalizedTemp - MIN_TEMP) / (MAX_TEMP - MIN_TEMP);
    return START_ANGLE + percentage * ANGLE_RANGE;
  }, []);

  const angleToTemp = useCallback(
    (angle: number) => {
      let normalizedAngle = angle % 360;
      if (normalizedAngle < 0) {
        normalizedAngle += 360;
      }

      if (
        normalizedAngle > (START_ANGLE + ANGLE_RANGE) % 360 &&
        normalizedAngle < START_ANGLE
      ) {
        return value;
      }

      let relativeAngle = normalizedAngle - START_ANGLE;
      if (relativeAngle < 0) {
        relativeAngle += 360;
      }
      if (relativeAngle > ANGLE_RANGE) {
        relativeAngle = ANGLE_RANGE;
      }

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
      <G>
        {Array.from({length: STEP}, (_, i) => {
          const lineLength = r * 0.8;

          return Array.from([
            0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9,
          ]).map((j, index) => {
            const {coord, x1, y1} = generateLineCoord(i + j, lineLength);
            // Adjust progress for sub-lines to maintain smooth gradient
            const progress = (i + j) / (STEP + 9);

            return (
              <Line
                key={index}
                x1={x1}
                y1={y1}
                x2={coord.x}
                y2={coord.y}
                stroke={interpolateColor(progress)}
                strokeWidth={2}
                strokeLinecap="round"
              />
            );
          });
        })}
      </G>
      {/* Rest of the SVG elements remain the same */}
      <G>
        <Circle
          cx={cx}
          cy={cy}
          r={r * 0.8}
          stroke="rgba(217, 217, 217, 1)"
          strokeWidth={10}
          fill="none"
        />
        <Circle
          cx={cx}
          cy={cy}
          r={r * 0.8 + 5}
          stroke="rgba(234, 234, 234, 1)"
          strokeWidth={5}
          fill="none"
        />
      </G>
      <G>
        <Circle
          cx={cx}
          cy={cy}
          r={r / 2}
          fill="none"
          strokeWidth={10}
          stroke="rgba(217, 217, 217, 1)"
        />
        <Circle
          cx={cx}
          cy={cy}
          r={r / 2 + 5}
          fill="none"
          strokeWidth={5}
          stroke="rgba(234, 234, 234, 1)"
        />
        <Text
          x={cx - 18}
          y={cy + 9}
          fontSize={24}
          fill={Colors.menuBgBlack}
          fontWeight={500}>
          {value}°
        </Text>
      </G>
      <G x={endCoord.x} y={endCoord.y} origin={`${endCoord.x}, ${endCoord.y}`}>
        <Rect
          x={-5}
          y={-22}
          width={8}
          height={30}
          rx={3}
          rotation={sliderAngle}
          fill="rgba(0, 0, 0, 0.1)"
        />
        <Rect
          x={-4}
          y={-21}
          width={6}
          height={28}
          rx={2}
          rotation={sliderAngle}
          fill={Colors.white}
        />
      </G>
    </Svg>
  );
};

export default CircularSlider;
