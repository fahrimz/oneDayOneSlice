import {StyleSheet} from 'react-native';
import {Colors} from '../../constants';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.menuBgBlack,
    alignSelf: 'center',
    gap: 8,
    padding: 8,
    borderRadius: 999,
  },
  badge: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.energyGreen,
    position: 'absolute',
    right: 4,
    top: 4,
  },
  animationBackground: {
    backgroundColor: 'white',
    width: 64,
    height: 64,
    borderRadius: 64,
    ...StyleSheet.absoluteFillObject,
    marginVertical: 8,
    marginLeft: 8,
  },
});
