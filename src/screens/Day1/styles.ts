import {StyleSheet} from 'react-native';

const createStyles = (bottom: number, screenWidth: number) =>
  StyleSheet.create({
    root: {
      backgroundColor: 'rgba(19, 19, 22, 1)',
      flex: 1,
    },
    dot: {
      width: 8,
      height: 8,
      borderRadius: 8,
      borderColor: 'rgba(255, 255, 255, 0.4)',
      borderWidth: 1,
    },
    dotActive: {
      backgroundColor: 'rgba(230, 0, 30, 1)',
      width: 8,
      height: 8,
      borderRadius: 8,
    },
    modal: {
      backgroundColor: 'black',
      borderRadius: 32,
      flex: 1,
      paddingBottom: bottom,
    },
    productColor: {
      alignSelf: 'flex-start',
      transform: [{rotate: '270deg'}, {translateX: -16}, {translateY: 8}],
    },
    productImage: {
      width: screenWidth - 62,
      height: 280,
      objectFit: 'contain',
    },
    buyContainer: {
      backgroundColor: 'rgba(230, 0, 30, 1)',
      justifyContent: 'center',
      alignItems: 'center',
      width: 56,
      height: 56,
      borderRadius: 28,
    },
  });

export default createStyles;
