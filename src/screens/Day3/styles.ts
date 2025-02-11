import {StyleSheet} from 'react-native';
import {Colors} from './constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundGray,
    padding: 16,
  },
  alertBadge: {
    width: 10,
    height: 10,
    borderRadius: 10,
    position: 'absolute',
    top: 5,
    right: 5,
  },
  timeBadge: {
    width: 10,
    height: 10,
    borderRadius: 10,
    position: 'absolute',
    top: 18,
    right: 18,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 38,
    padding: 16,
  },
  withBorder: {
    borderWidth: 1,
    borderColor: Colors.backgroundGray,
  },
  power: {
    padding: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
    borderRadius: 999,
  },
  control: {
    width: 100,
    height: 100,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    elevation: 5,
    backgroundColor: Colors.white,
    shadowColor: Colors.menuBgBlack,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.2,
    shadowRadius: 20,
  },
  sectionSpacer: {
    backgroundColor: Colors.backgroundGray,
    height: 8,
    width: '30%',
    borderRadius: 24,
  },
  mainCard: {flex: 1, overflow: 'hidden'},
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
  },
  ripple: {
    width: 200,
    height: 100,
    borderRadius: 100,
    position: 'absolute',
    bottom: 0,
  },
});
