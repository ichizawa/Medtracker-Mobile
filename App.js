import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './scr/components/Navigation';
import { AuthProvider } from './scr/context/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <Navigation/>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
