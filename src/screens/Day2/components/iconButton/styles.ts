import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: '#fff', // set default background color to make sure shadow is visible
    borderRadius: 999, // This is a hack to make the button round regardless of the size of the icon
    padding: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noPadding: {
    padding: 0,
  },
});
