import React, {useEffect} from 'react';
import {Row} from '../../../../components';
import {Colors} from '../../constants';
import IconButton from '../iconButton';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import styles from './styles';
import {Animated} from 'react-native';

const AnimatedIcon = Animated.createAnimatedComponent(MaterialIcons);

const Menu = () => {
  const icons = ['home', 'computer', 'verified-user', 'settings'];
  const [selected, setSelected] = React.useState(0);
  const animatedIndex = React.useRef(new Animated.Value(0)).current;
  const animatedBackgrounds = React.useRef(
    icons.map(() => new Animated.Value(0)),
  ).current;
  const isAnimating = React.useRef(new Animated.Value(0)).current;

  const handlePress = (index: number) => {
    // stop all animation to make sure new animation can run
    isAnimating.stopAnimation();
    animatedIndex.stopAnimation();
    animatedBackgrounds.forEach(animation => animation.stopAnimation());

    isAnimating.setValue(1);

    // Run animations in parallel
    Animated.parallel([
      // Slide animation
      Animated.timing(animatedIndex, {
        toValue: index,
        duration: 300,
        useNativeDriver: true,
      }),
      // Background color animations
      ...animatedBackgrounds.map((background, i) =>
        Animated.timing(background, {
          toValue: index === i ? 1 : 0,
          duration: 500,
          useNativeDriver: false, // Changed to false for color animation
        }),
      ),
    ]).start(() => {
      setSelected(index);
      isAnimating.setValue(0);
    });
  };

  useEffect(() => {
    // Initial animation for the first selected item
    Animated.timing(animatedBackgrounds[selected], {
      toValue: 1,
      duration: 300,
      useNativeDriver: false, // Changed to false for color animation
    }).start();
    // disable dependency for this effect because we only want to run this once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Row style={styles.container}>
      <Animated.View
        style={[
          styles.animationBackground,
          {
            transform: [{translateX: Animated.multiply(animatedIndex, 64 + 8)}],
            opacity: isAnimating,
          },
        ]}
      />
      {icons.map((icon, index) => {
        const backgroundColor = animatedBackgrounds[index].interpolate({
          inputRange: [0, 1],
          outputRange: [Colors.menuBlack, Colors.white],
        });

        const iconColor = animatedBackgrounds[index].interpolate({
          inputRange: [0, 1],
          outputRange: [Colors.white, Colors.menuBlack],
        });

        const animateBadge = animatedBackgrounds[index].interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
        });

        return (
          <IconButton
            key={index}
            onPress={() => handlePress(index)}
            backgroundColor={backgroundColor}>
            <AnimatedIcon
              name={icon as any}
              size={24}
              style={{color: iconColor}}
            />
            <Animated.View style={[styles.badge, {opacity: animateBadge}]} />
          </IconButton>
        );
      })}
    </Row>
  );
};

export default Menu;
