import {StyleSheet} from 'react-native';
import {imageWidth} from './constants';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  imageWrapper: {
    width: imageWidth,
    height: imageWidth,
    marginVertical: 24,
  },
  imageContainer: {
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  dot: {
    height: 5,
  },
  innerDot: {
    borderRadius: 5,
    width: '100%',
    height: '100%',
  },
  textCenter: {
    textAlign: 'center',
  },
  ctaContainer: {width: '100%', padding: 32},
  cta: {
    paddingVertical: 24,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
  },
  imageContentContainer: {
    flexDirection: 'row',
    width: '100%',
    height: '100%',
  },
  bgContainer: {
    position: 'absolute',
    flexDirection: 'row',
    width: '100%',
    height: '100%',
  },
  textContainer: {
    width: '100%',
  },
  absoluteFill: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
