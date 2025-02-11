import {StyleSheet} from 'react-native';
import { Colors } from '../../constants';

export default StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.backgroundGray,
    borderRadius: 999,
    padding: 4,
  },
  icon: {position: 'absolute'},
});
