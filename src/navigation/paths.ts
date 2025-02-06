import {NavigationProp, useNavigation} from '@react-navigation/native';
import {createPaths} from './helper';

export type RootStackList = {
  Home: undefined;
  Day1: undefined;
  Day2: undefined;
};

// now the path can be accessed with Paths.Home etc.
export const RootPath = createPaths<RootStackList>();

export const useRootNavigation = () =>
  useNavigation<NavigationProp<RootStackList>>();
