import React from 'react';
import { StatusBar } from 'react-native';
import Navigation from './components/Navigation.js';
import { AuthProvider } from './src/AuthContext.js';

class App extends React.Component {
  render() {
    return (
      <AuthProvider>
        <StatusBar hidden={true} />
        <Navigation />
      </AuthProvider>
        )
  }
}
        export default App