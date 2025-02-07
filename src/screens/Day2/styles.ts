import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  root: {
    backgroundColor: 'rgba(236, 236, 236, 1)',
    flex: 1,
    padding: 16,
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
  },
  powerBadge: {
    width: 10,
    height: 10,
    borderRadius: 10,
    position: 'absolute',
    top: 3,
    right: 3,
  },
  powerOff: {
    backgroundColor: 'red',
  },
  powerOn: {
    backgroundColor: 'limegreen',
  },
  itemCardBig: {
    flex: 1,
  },
  listStyle: {
    height: 0,
    marginRight: -16,
  },
  listContent: {
    gap: 14,
    paddingRight: 16,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 16,
    backgroundColor: 'rgba(159, 162, 160, 1)',
  },
  dotActive: {
    width: 32,
    backgroundColor: 'rgba(5, 73, 253, 1)',
  },
});
