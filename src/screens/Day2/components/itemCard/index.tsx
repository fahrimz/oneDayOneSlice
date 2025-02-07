import React, {useCallback, useLayoutEffect, useRef, useState} from 'react';
import {
  Animated,
  ImageBackground,
  PanResponder,
  View,
  ViewStyle,
} from 'react-native';
import styles from './styles';
import {Images} from '../../../../assets';
import {Column, Row} from '../../../../components';
import IconButton from '../iconButton';
import {Text} from '../../../../components';
import AntDesign from '@react-native-vector-icons/ant-design';
import Spacer from '../../../../components/Spacer';
import {Day2Device} from '../../types';

type ItemCardProps = {
  index: number;
  style?: ViewStyle;
  onSlide?: () => void;
  onSlideEnd?: () => void;
} & Day2Device;

const imageBgMap: Record<Day2Device['type'], string> = {
  bedroom: Images.day2Bedroom,
  doorbell: Images.day2Lock,
  livingroom: Images.day2Livingroom,
};

const ItemCard = ({
  index,
  style,
  title,
  type,
  onSlide,
  onSlideEnd,
}: ItemCardProps) => {
  const sliderWidth = useRef(0);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const lockBackgroundStatus = useRef(new Animated.Value(0)).current;
  const lockScale = useRef(new Animated.Value(1)).current;
  const blueToGreenColor = lockBackgroundStatus.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(5, 73, 253, 1)', 'limegreen'],
  });

  const pan = useRef(new Animated.ValueXY()).current;
  const resetThumb = Animated.timing(pan, {
    toValue: {x: 0, y: 0},
    duration: 300,
    useNativeDriver: false,
  });

  const [isAnimating, setIsAnimating] = useState(false);

  const panResponder = useCallback(() => {
    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        onSlide?.();
      },
      onPanResponderMove: (_, gestureState) => {
        if (isAnimating) {
          return;
        }

        const offsetX = gestureState.dx;

        const limit = sliderWidth.current - (56 + 12);
        if (offsetX > 0 && offsetX <= limit) {
          pan.setValue({x: offsetX, y: 0});
        }

        if (offsetX > limit) {
          setIsAnimating(true);

          Animated.timing(lockBackgroundStatus, {
            toValue: isUnlocked ? 0 : 1,
            duration: 300,
            useNativeDriver: true,
          }).start(() => {
            setIsUnlocked(prev => !prev);
            Animated.sequence([
              Animated.spring(lockScale, {
                toValue: 1.2,
                useNativeDriver: true,
              }),
              Animated.spring(lockScale, {
                toValue: 1.0,
                useNativeDriver: true,
              }),
            ]).start(() => {
              setIsAnimating(false);
            });
          });
        }
      },
      onPanResponderEnd() {
        resetThumb.start();
        onSlideEnd?.();
      },
    });
  }, [
    isAnimating,
    isUnlocked,
    lockBackgroundStatus,
    lockScale,
    onSlide,
    onSlideEnd,
    pan,
    resetThumb,
  ]);

  const containerRef = useRef<View>(null);
  useLayoutEffect(() => {
    containerRef.current?.measure((_x, _y, width, _height) => {
      sliderWidth.current = width;
    });
  }, []);

  return (
    <Column style={{...styles.itemCard, ...style}}>
      <ImageBackground
        source={imageBgMap[type] || Images.day2Bedroom}
        style={styles.cardBackground}>
        <View style={styles.darken} />
      </ImageBackground>
      <Row justifyContent="space-between">
        <Row alignItems="center" justifyContent="space-between" gap={8}>
          <IconButton backgroundColor="rgba(0, 0, 0, 0.6)">
            <View style={styles.index}>
              <Text color="white" weight="600" size={18}>
                {index}
              </Text>
            </View>
          </IconButton>
          <Text size={24} color="white" weight="600">
            {title}
          </Text>
        </Row>

        <IconButton>
          <AntDesign
            name={type === 'doorbell' ? 'video-camera' : 'edit'}
            size={24}
          />
        </IconButton>
      </Row>
      <Spacer />
      <Animated.View
        ref={containerRef}
        style={{
          ...styles.card,
          ...{backgroundColor: 'rgba(0, 0, 0, 0.4)', marginVertical: 0},
        }}>
        <Animated.View
          {...panResponder().panHandlers}
          style={{transform: pan.getTranslateTransform()}}>
          <IconButton pointerEvents="none">
            <AntDesign name="arrow-right" size={24} />
          </IconButton>
        </Animated.View>

        {type === 'doorbell' ? (
          <IconButton
            backgroundColor={blueToGreenColor}
            style={{transform: [{scale: lockScale}]}}>
            <AntDesign
              name={isUnlocked ? 'unlock' : 'lock'}
              size={24}
              color="white"
            />
          </IconButton>
        ) : (
          <IconButton
            backgroundColor={blueToGreenColor}
            style={{
              transform: [{rotate: '45deg'}, {scale: lockScale}],
            }}>
            <AntDesign name="arrow-up" size={24} color="white" />
          </IconButton>
        )}
      </Animated.View>
    </Column>
  );
};

export default ItemCard;
