import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import Menu from './components/Drawer';

export default function App() {
  return (
    <NavigationContainer>
      <Menu />
    </NavigationContainer>
  );
}
