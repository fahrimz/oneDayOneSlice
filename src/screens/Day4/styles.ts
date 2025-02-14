import {StyleSheet} from 'react-native';
import Colors from './constants';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundOrange,
    flex: 1,
  },
  cta: {
    backgroundColor: Colors.backgroundOrange,
    borderWidth: 2,
    borderColor: 'black',
    padding: 32,
    borderRadius: 64,
  },
  star: {
    position: 'absolute',
  },
});
