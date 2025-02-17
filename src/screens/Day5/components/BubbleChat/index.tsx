import React from 'react';
import styles from './styles';
import {Animated} from 'react-native';
import {BubbleProps} from '../../types';
import {Text} from '../../../../components';

const BubbleChat = ({
  type,
  x = 0,
  y = 0,
  color,
  size = 16,
  text,
}: BubbleProps) => {
  return (
    <Animated.View
      style={[
        styles.container,
        type === 'top-right' && styles.noBorderBottomLeft,
        type === 'top-left' && styles.noBorderBottomRight,
        type === 'bottom-right' && styles.noBorderTopLeft,
        type === 'bottom-left' && styles.noBorderTopRight,
        type === 'circle' && styles.circle,
        {transform: [{translateX: x}, {translateY: y}]},
      ]}>
      <Text size={size} weight={600} color={color}>
        {text}
      </Text>
    </Animated.View>
  );
};

export default BubbleChat;
