import React from 'react';
import {Image, useWindowDimensions, View} from 'react-native';
import {Column, Row, Text} from '../../components';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {Images} from '../../assets';
import AntDesign from '@react-native-vector-icons/ant-design';
import createStyles from './styles';

const Day1 = () => {
  const insets = useSafeAreaInsets();
  const {width} = useWindowDimensions();
  const styles = createStyles(insets.bottom, width);

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <Column flex={1} gap={16}>
        <Row
          justifyContent="space-between"
          alignItems="center"
          paddingHorizontal={32}
          paddingVertical={16}>
          <Image source={Images.day1LeicaLogo} />

          <Row gap={48}>
            <AntDesign name="shopping-cart" color="white" size={28} />
            <AntDesign name="menu" color="white" size={28} />
          </Row>
        </Row>
        <Column
          style={styles.modal}
          paddingHorizontal={32}
          paddingVertical={28}>
          <Row flex={0} gap={16} justifyContent="space-between">
            <Column gap={24}>
              <Column gap={8} flex={0}>
                <Text color="white">19050</Text>
                <Text color="white" size={32} textTransform="uppercase">
                  {'leica q2\nmonochrom'}
                </Text>
              </Column>
              <Text color="rgba(255, 255, 255, 0.4)">$6,195.00</Text>
            </Column>
            <Text color="rgba(255, 255, 255, 0.4)" style={styles.productColor}>
              BLACK
            </Text>
          </Row>

          <Column flex={1}>
            <Image
              source={Images.day1LeicaMonochrom}
              style={styles.productImage}
            />
          </Column>

          <Column flex={1} gap={24} justifyContent="space-between">
            <Row flex={1} />
            <Row flex={1} gap={40} alignItems="center">
              <Row gap={40} flex={1}>
                <View style={styles.dotActive} />
                <View style={styles.dot} />
                <View style={styles.dot} />
                <View style={styles.dot} />
              </Row>
              <Row>
                <AntDesign name="arrow-right" color="white" size={20} />
              </Row>
            </Row>

            <Row flex={1} justifyContent="space-between" alignItems="center">
              <Text color="rgba(255, 255, 255, 0.4)">
                A Pioneer by Tradition
              </Text>

              <View
                style={styles.buyContainer}>
                <AntDesign name="shopping-cart" color="white" size={28} />
              </View>
            </Row>
          </Column>
        </Column>
      </Column>
    </SafeAreaView>
  );
};

export default Day1;
