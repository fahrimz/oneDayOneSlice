import React, { useCallback, useEffect, useRef } from 'react';
import { AnimatedText, Column, Gap, Row, Spacer, Text } from '../../components';
import styles from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Animated, Easing, Pressable, useWindowDimensions, View } from 'react-native';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import { Images } from '../../assets';
import Colors from './constants';

const Day4 = () => {
  const captions = [
    'Goal-setting',
    'Dedication',
    'Efficiency',
    'Concentration',
    'Discipline',
    'Balance',
    'Productivity',
    'Focus.',
  ];
  const screen = useWindowDimensions();
  const animations = useRef(captions.map(() => new Animated.Value(0))).current;
  const starYPosition = useRef(new Animated.Value(0)).current;
  const starSpin = starYPosition.interpolate({
    inputRange: [0, 4],
    outputRange: ['0deg', '360deg'],
  });

  const staggerAnimations = useCallback(() => {
    const startDuration = 200;

    // Reset animations first
    const resetAnimations = animations.map(anim =>
      Animated.timing(anim, {
        toValue: 0,
        duration: 0, // Instantly reset
        useNativeDriver: true,
      }),
    );

    const startAnimations = animations.map((anim, index) => {
      const prevIndex = index === 0 ? animations.length - 1 : index - 1;
      const prevAnim = animations[prevIndex];
      const changeDuration = startDuration + (index * 100);

      return Animated.parallel([
        Animated.timing(prevAnim, {
          toValue: 0,
          duration: startDuration,
          useNativeDriver: true,
        }),
        Animated.timing(anim, {
          toValue: 1,
          duration: changeDuration,
          useNativeDriver: true,
          easing: Easing.linear,
        }),
        Animated.timing(starYPosition, {
          toValue: index,
          duration: changeDuration,
          useNativeDriver: true,
          easing: Easing.linear,
        }),
      ]);
    });

    Animated.sequence([
      Animated.parallel(resetAnimations), // Reset first
      ...startAnimations,
    ]).start();
  }, [animations, starYPosition]);

  useEffect(() => {
    // start animation
    staggerAnimations();
  }, [animations, staggerAnimations]);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[
        styles.star, {
          left: -(screen.width * 0.5),
          top: -(screen.height * 0.16),
          transform: [
            { translateY: Animated.multiply(starYPosition, 80) },
            { rotate: '90deg'}, // make sure the star is rotated to the right at the end
            { rotate: starSpin },
          ],
        }]}>
        <Images.day4Star color={Colors.ornamentYellow} />
      </Animated.View>
      <Column flex={1} paddingHorizontal={8}>
        <Spacer />
        <Column style={{ height: screen.height * 0.7 }}>
          {captions.map((x, i) => {
            const color = animations[i].interpolate({
              inputRange: [0, 1],
              outputRange: ['rgba(0, 0, 0, 0.3)', 'rgba(0, 0, 0, 1)'],
            });

            const zIndex = animations[i].interpolate({
              inputRange: [0, 1],
              outputRange: [-1, 1],
            });
            return (
              <AnimatedText key={i} animated color={color} size={60} style={{ zIndex: zIndex } as any}>
                {x}
              </AnimatedText>
            );
          })}
        </Column>

        <Gap height={24} />

        <Pressable onPress={staggerAnimations}>
          <Row
            justifyContent="space-between"
            alignItems="center"
            style={styles.cta}>
            <View />
            <Text size={24} weight="500">
              Get Started
            </Text>
            <MaterialIcons name="chevron-right" size={36} color="black" />
          </Row>
        </Pressable>

        <Spacer />
      </Column>
    </SafeAreaView>
  );
};

export default Day4;
