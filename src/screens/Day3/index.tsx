import React, {useEffect, useRef, useState} from 'react';
import {Column, Gap, Row, Spacer, Text} from '../../components';
import styles from './styles';
import {Colors} from './constants';
import {SafeAreaView} from 'react-native-safe-area-context';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import AntDesign from '@react-native-vector-icons/ant-design';
import {IconButton, BatteryStatus, Menu, CircularSlider} from './components';
import {Animated, View, useWindowDimensions} from 'react-native';
import {useRootNavigation} from '../../navigation';

const Day3 = () => {
  const navigation = useRootNavigation();
  const [circularValue, setCircularValue] = React.useState(16);

  const {width} = useWindowDimensions();
  const sliderSize = width * 0.5;
  const [powerState, setPowerState] = useState<boolean>(true);

  const rippleScaleX = useRef(new Animated.Value(0)).current;
  const rippleScaleY = useRef(new Animated.Value(0)).current;
  const rippleOpacity = useRef(new Animated.Value(1)).current;

  const rippleTransform = {
    transform: [{scaleY: rippleScaleY}, {scaleX: rippleScaleX}], // Expands only in the Y direction
    opacity: rippleOpacity,
    backgroundColor: powerState ? Colors.energyGreen : Colors.alertRed,
  };

  useEffect(() => {
    rippleScaleX.setValue(0);
    rippleScaleY.setValue(0);
    rippleOpacity.setValue(1);

    Animated.parallel([
      Animated.timing(rippleScaleX, {
        toValue: 5, // Controls how high the ripple expands
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(rippleScaleY, {
        toValue: 10, // Controls how high the ripple expands
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(rippleOpacity, {
        toValue: 0, // Fade out
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, [powerState, rippleOpacity, rippleScaleX, rippleScaleY]);

  return (
    <SafeAreaView style={styles.container}>
      <Row justifyContent="space-between" paddingHorizontal={16}>
        <IconButton onPress={() => navigation.goBack()}>
          <AntDesign name="arrow-left" size={20} color={Colors.menuBgBlack} />
        </IconButton>
        <IconButton>
          <AntDesign name="bell" size={20} color={Colors.menuBgBlack} />
          <View
            style={[styles.alertBadge, {backgroundColor: Colors.menuBgBlack}]}
          />
        </IconButton>
      </Row>

      <Gap height={16} />

      <Animated.View style={[styles.card, styles.mainCard]}>
        <View style={styles.overlay}>
          <Animated.View style={[styles.ripple, rippleTransform]} />
        </View>

        <Column flex={1}>
          <Row alignItems="center" justifyContent="space-between">
            <IconButton style={styles.withBorder}>
              <AntDesign name="menu" size={20} color={Colors.menuBgBlack} />
            </IconButton>
            <Text weight="600" size={24} color={Colors.menuBgBlack}>
              Climate control
            </Text>
            <IconButton style={styles.withBorder}>
              <AntDesign
                name="clock-circle"
                size={20}
                color={Colors.menuBgBlack}
              />
              <View
                style={[styles.timeBadge, {backgroundColor: Colors.alertRed}]}
              />
            </IconButton>
          </Row>

          <Spacer />

          <Row justifyContent="center">
            <CircularSlider
              width={sliderSize}
              height={sliderSize}
              onValueChange={setCircularValue}
              value={circularValue}
            />
          </Row>

          <Spacer />

          <Row alignItems="center" justifyContent="space-between">
            <IconButton
              style={styles.withBorder}
              backgroundColor={Colors.backgroundGray}>
              <AntDesign name="compress" size={20} color={Colors.menuBgBlack} />
            </IconButton>

            <View style={styles.power}>
              <IconButton
                backgroundColor={
                  powerState ? Colors.energyGreen : Colors.alertRed
                }
                onPress={() => setPowerState(prev => !prev)}>
                <AntDesign name="poweroff" size={24} color={Colors.white} />
              </IconButton>
            </View>
            <BatteryStatus status={[true, true, true, false]} />
          </Row>
        </Column>
      </Animated.View>

      <Row style={{backgroundColor: Colors.white}}>
        <View style={styles.sectionSpacer} />
        <Spacer />
        <View style={styles.sectionSpacer} />
      </Row>

      <Row padding={20} alignItems="center" style={styles.card}>
        <MaterialIcons name="sunny" size={64} color={Colors.sunYellow} />
        <Gap width={20} />
        <Column gap={6}>
          <Text size={20} weight="600">
            Barcelona, Spain
          </Text>
          <Text color={Colors.textGray}>Sunny Outside</Text>
          <Text weight="600">13:08</Text>
        </Column>
        <Spacer />
        <Text size={42}>28°</Text>
      </Row>

      <Gap height={16} />

      <Menu />
    </SafeAreaView>
  );
};

export default Day3;
