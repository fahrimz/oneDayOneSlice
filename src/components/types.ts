import {FlexStyle, ViewStyle} from 'react-native';

export type ContainerProps = {
  style?: ViewStyle;
  children?: React.ReactNode;
  justifyContent?: FlexStyle['justifyContent'];
  alignItems?: FlexStyle['alignItems'];
  flex?: FlexStyle['flex'];
  padding?: number;
  paddingVertical?: number;
  paddingHorizontal?: number;
  gap?: number;
};
