import React, {useCallback, useEffect, useRef, useState} from 'react';
import {AnimatedText, Column, Row} from '../../components';
import styles from './styles';
import {Themes, Fonts, imageWidth, screen, bubbles} from './constants';
import {Animated, Pressable, SafeAreaView} from 'react-native';
import {BubbleChat} from './components';

const AnimatedSafeAreaView = Animated.createAnimatedComponent(SafeAreaView);
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const Day5 = () => {
  const slidePosition = useRef(new Animated.Value(0)).current;
  const dotPosition = useRef(new Animated.Value(0)).current;
  const fadeOpacity = useRef(new Animated.Value(1)).current;
  const themeLength = Themes.length;

  const [currentThemeIndex, setCurrentThemeIndex] = useState(0);
  const [prevThemeIndex, setPrevThemeIndex] = useState(0);

  slidePosition.addListener(({value}) => {
    const newIndex = Math.round(value) % themeLength;
    if (newIndex !== currentThemeIndex) {
      setPrevThemeIndex(currentThemeIndex);
      setCurrentThemeIndex(newIndex);
    }
  });

  useEffect(() => {
    return () => {
      slidePosition.removeAllListeners();
    };
  }, [slidePosition]);

  const primaryColor = slidePosition.interpolate({
    inputRange: Themes.map((_, i) => i),
    outputRange: Themes.map(theme => theme.primary),
  });

  const secondaryColor = slidePosition.interpolate({
    inputRange: Themes.map((_, i) => i),
    outputRange: Themes.map(theme => theme.secondary),
  });

  const tertiaryColor = slidePosition.interpolate({
    inputRange: Themes.map((_, i) => i),
    outputRange: Themes.map(theme => theme.tertiary),
  });

  // Keep translateX for image layer
  const translateX = slidePosition.interpolate({
    inputRange: Themes.map((_, i) => i),
    outputRange: Themes.map((_, i) => -(imageWidth * i)),
  });

  const translateBubble = slidePosition.interpolate({
    inputRange: Themes.map((_, i) => i),
    outputRange: Themes.map((_, i) => -(screen.width * i)),
  });

  const translateText = slidePosition.interpolate({
    inputRange: Themes.map((_, i) => i),
    outputRange: Themes.map((_, i) => -(screen.width * i)),
  });

  const animateToNextSlide = useCallback(() => {
    const nextIndex = (currentThemeIndex + 1) % themeLength;
    const animDuration = nextIndex === 0 ? themeLength * 150 : 300;

    // Reset fade opacity
    fadeOpacity.setValue(1);

    // Create parallel animation sequence
    Animated.parallel([
      // Animate slide position and dot
      Animated.parallel([
        Animated.timing(slidePosition, {
          toValue: nextIndex,
          duration: animDuration,
          useNativeDriver: true,
        }),
        Animated.timing(dotPosition, {
          toValue: nextIndex,
          duration: 150,
          useNativeDriver: false,
        }),
      ]),
      // Fade out current background
      Animated.sequence([
        Animated.timing(fadeOpacity, {
          toValue: 0.8,
          duration: animDuration / 2,
          delay: animDuration / 4,
          useNativeDriver: true,
        }),
        Animated.timing(fadeOpacity, {
          toValue: 1,
          duration: animDuration / 2,
          delay: animDuration / 4,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, [currentThemeIndex, dotPosition, slidePosition, fadeOpacity, themeLength]);

  const renderBackground = useCallback((index: number) => {
    const BackgroundComponent = Themes[index].bg;
    return <BackgroundComponent width={imageWidth} height={imageWidth} />;
  }, []);

  useEffect(() => {
    const interval = setInterval(animateToNextSlide, 3000);
    return () => clearInterval(interval);
  }, [animateToNextSlide]);

  const getDotWidth = (index: number) => {
    return dotPosition.interpolate({
      inputRange: Themes.map((_, i) => i),
      outputRange: Themes.map((_, i) => (i === index ? 30 : 7)),
    });
  };

  return (
    <AnimatedSafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: primaryColor,
        },
      ]}>
      <Column flex={1} alignItems="center">
        <AnimatedText
          family={Fonts.primary.regular}
          size={24}
          color={secondaryColor}>
          CircleUp
        </AnimatedText>

        <Animated.View style={styles.imageWrapper}>
          <Animated.View style={styles.imageContainer}>
            {/* Background Layer - Modified for fade transition */}
            <Animated.View style={[styles.bgContainer]}>
              {/* Previous background with fade out */}
              <Animated.View
                style={[
                  styles.absoluteFill,
                  {
                    opacity: fadeOpacity,
                  },
                ]}>
                {renderBackground(prevThemeIndex)}
              </Animated.View>
              {/* Current background with fade in */}
              <Animated.View
                style={[
                  styles.absoluteFill,
                  {
                    opacity: fadeOpacity,
                  },
                ]}>
                {renderBackground(currentThemeIndex)}
              </Animated.View>
            </Animated.View>

            {/* Image Layer - Keeps sliding animation */}
            <Animated.View
              style={[
                styles.imageContentContainer,
                {
                  transform: [{translateX}],
                },
              ]}>
              {Themes.map((theme, index) => (
                <Animated.Image
                  key={index}
                  source={theme.stock}
                  style={[styles.image, {width: imageWidth}]}
                  resizeMode="cover"
                />
              ))}
            </Animated.View>
          </Animated.View>
          <Animated.View
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              transform: [{translateX: translateBubble}],
            }}>
            {bubbles.map((slide, index) => (
              <Animated.View
                key={index}
                style={{transform: [{translateX: screen.width * index}]}}>
                {slide.map((bubble, i) => (
                  <BubbleChat key={i} {...bubble} />
                ))}
              </Animated.View>
            ))}
          </Animated.View>
        </Animated.View>

        <Row gap={8} paddingVertical={24}>
          {Themes.map((_, i) => (
            <Animated.View
              key={i}
              style={[
                styles.dot,
                {
                  width: getDotWidth(i),
                },
              ]}>
              <Animated.View
                style={[
                  styles.innerDot,
                  {
                    backgroundColor: secondaryColor,
                  },
                ]}
              />
            </Animated.View>
          ))}
        </Row>

        <Row
          animated
          style={{
            ...styles.textContainer,
            ...{transform: [{translateX: translateText}]},
          }}>
          {Themes.map((item, i) => (
            <Column key={i} gap={16}>
              <AnimatedText
                style={{width: screen.width}}
                align="center"
                family={Fonts.primary.regular}
                size={40}
                color={secondaryColor}>
                {item.text1}
              </AnimatedText>
              <AnimatedText
                style={{width: screen.width}}
                align="center"
                family={Fonts.primary.regular}
                size={16}
                weight={500}
                color={secondaryColor}>
                {item.text2}
              </AnimatedText>
            </Column>
          ))}
        </Row>

        <Column alignItems="center" gap={24} style={styles.ctaContainer}>
          <AnimatedPressable
            onPress={animateToNextSlide}
            style={[
              styles.cta,
              {
                backgroundColor: secondaryColor,
              },
            ]}>
            <AnimatedText color={tertiaryColor} size={16} weight={600}>
              Sign Up
            </AnimatedText>
          </AnimatedPressable>

          <Pressable>
            <AnimatedText color={secondaryColor} size={16} weight={600}>
              Log in
            </AnimatedText>
          </Pressable>
        </Column>
      </Column>
    </AnimatedSafeAreaView>
  );
};

export default Day5;
