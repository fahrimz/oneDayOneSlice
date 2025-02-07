import React from 'react';
import styles from './styles';
import {Column, Gap, Row, Text} from '../../components';
import AntDesign from '@react-native-vector-icons/ant-design';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Avatar, IconButton, ItemCard} from './components';
import {useRootNavigation} from '../../navigation';
import {FlatList, useWindowDimensions, View, ViewToken} from 'react-native';
import {Images} from '../../assets';
import {Day2Device} from './types';

const Day2 = () => {
  const navigation = useRootNavigation();
  const screen = useWindowDimensions();
  const [powerOn, setPowerOn] = React.useState(true);
  const [listItemIsSliding, setListItemIsSliding] = React.useState(false);

  const data: Day2Device[] = [
    {
      title: 'Doorbell',
      type: 'doorbell',
      totalDevice: 1,
    },
    {
      title: 'Bedroom',
      type: 'bedroom',
      totalDevice: 4,
    },
    {
      title: 'Living Room',
      type: 'livingroom',
      totalDevice: 1,
    },
  ];

  const mainDevice = data.splice(0, 1)[0];
  const [shownItem, setShownItem] = React.useState(0);

  const onViewableItemsChanged = React.useCallback(
    ({viewableItems}: {viewableItems: ViewToken<Day2Device>[]}) => {
      if (viewableItems.length > 0 && viewableItems[0].index !== null) {
        setShownItem(viewableItems[0].index);
      }
    },
    [],
  );

  return (
    <SafeAreaView style={styles.root}>
      <Column flex={1} gap={16}>
        <Row justifyContent="space-between">
          <IconButton onPress={navigation.goBack}>
            <AntDesign name="arrow-left" size={24} />
          </IconButton>
          <Row gap={12}>
            <IconButton>
              <AntDesign name="setting" size={24} />
            </IconButton>
            <Avatar size={56} image={Images.day2Avatar} />
          </Row>
        </Row>

        <Gap />

        <Text weight="600" size={56}>
          Smart Home
        </Text>

        <Gap />

        <Row style={styles.card} justifyContent="space-between">
          <Row gap={12}>
            <IconButton
              backgroundColor="black"
              onPress={() => setPowerOn(prev => !prev)}>
              <AntDesign name="poweroff" size={24} color="white" />
              <View
                style={[
                  styles.powerBadge,
                  powerOn ? styles.powerOn : styles.powerOff,
                ]}
              />
            </IconButton>
            <Column justifyContent="center" gap={4}>
              <Text weight="600">New Device Added</Text>
              <Text size={12} weight="500" color="rgba(114, 114, 114, 1)">
                Smart Plug in Bedroom
              </Text>
            </Column>
          </Row>

          <IconButton
            backgroundColor="rgba(5, 73, 253, 1)"
            style={{
              transform: [{rotate: '45deg'}],
            }}>
            <AntDesign name="arrow-up" size={24} color="white" />
          </IconButton>
        </Row>

        <Column flex={1} gap={16}>
          <ItemCard
            index={1}
            title={mainDevice.title}
            type={mainDevice.type}
            totalDevice={mainDevice.totalDevice}
            style={styles.itemCardBig}
          />
          <FlatList
            scrollEnabled={!listItemIsSliding}
            // scrollEnabled={false}
            horizontal
            pagingEnabled
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={{viewAreaCoveragePercentThreshold: 50}}
            style={styles.listStyle}
            contentContainerStyle={styles.listContent}
            data={data}
            renderItem={({item, index}) => (
              <ItemCard
                index={index + 2}
                title={item.title}
                type={item.type}
                totalDevice={item.totalDevice}
                style={{width: (screen.width - 32) * 0.88}}
                onSlide={() => setListItemIsSliding(true)}
                onSlideEnd={() => setListItemIsSliding(false)}
              />
            )}
          />
          <Row justifyContent="center" gap={8}>
            {data.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  index === shownItem ? styles.dotActive : null,
                ]}
              />
            ))}
          </Row>
        </Column>

        <Gap />
      </Column>
    </SafeAreaView>
  );
};

export default Day2;
