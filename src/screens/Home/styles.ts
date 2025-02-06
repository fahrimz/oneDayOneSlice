import {StyleSheet} from 'react-native';

const createStyles = (top: number, bottom: number) =>
  StyleSheet.create({
    root: {
      flex: 1,
      paddingTop: top,
      paddingBottom: bottom,
    },
    item: {
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  });

export default createStyles;
