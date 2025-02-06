import React from 'react';
import {FlatList, Pressable, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {RootPath, useRootNavigation} from '../../navigation';
import createStyles from './styles';
import { MenuItem } from './types';

const Home = () => {
  const navigation = useRootNavigation();
  const {top, bottom} = useSafeAreaInsets();
  const styles = createStyles(top, bottom);

  const menu: MenuItem[] = [
    {
      title: 'Day 1',
      navigate: () => navigation.navigate(RootPath.Day1),
    },
    {
      title: 'Day 2',
      navigate: () => navigation.navigate(RootPath.Day2),
    },
  ];

  return (
    <View style={styles.root}>
      <FlatList
        data={menu}
        renderItem={({item}) => (
          <Pressable onPress={item.navigate} key={item.title}>
            <View style={styles.item}>
              <Text>{item.title}</Text>
              <Text>{'>'}</Text>
            </View>
          </Pressable>
        )}
        keyExtractor={item => item.title}
      />
    </View>
  );
};

export default Home;
