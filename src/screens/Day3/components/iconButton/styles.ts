import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: '#fff', // set default background color to make sure shadow is visible
    borderRadius: 999, // This is a hack to make the button round regardless of the size of the icon
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noPadding: {
    padding: 0,
  },
});
