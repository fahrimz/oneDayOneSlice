import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  darken: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  cardBackground: {
    ...StyleSheet.absoluteFillObject,
  },
  itemCard: {
    borderRadius: 32,
    overflow: 'hidden',
    flex: 1,
    padding: 6,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 999,
    padding: 6,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.1,
    shadowRadius: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  index: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
