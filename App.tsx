import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import { RootNavigation } from './src/navigation';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <RootNavigation />
    </SafeAreaProvider>
  );
}

export default App;
