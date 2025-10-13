import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PersistGate } from 'redux-persist/integration/react';
import Toast from 'react-native-toast-message';

import { store, persistor } from './src/store';
import { AppNavigator } from './src/navigation/AppNavigator';
import { LoadingScreen } from './src/screens/LoadingScreen';

// Create a client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingScreen />} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <NavigationContainer>
            <AppNavigator />
            <Toast />
          </NavigationContainer>
          <StatusBar style="auto" />
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}
