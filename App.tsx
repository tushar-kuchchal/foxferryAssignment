import React from 'react';
import Data from './src/Data';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';



const Stack = createStackNavigator();

const App = () => {
  return (
    <SafeAreaView style={styles.container}>

      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Data"
          screenOptions={{
            headerShown: false,

          }}

        >
          <Stack.Screen name="Data" component={Data} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container:
  {
    flex: 1,
  },
});

export default App;
