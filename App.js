
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet} from 'react-native';
import HomeScreen from './HomeScreen';
import DailyActivityScreen from './DailyActivityScreen'
import LoginScreen from './LoginScreen'

export default function App() {
  const Stack = createNativeStackNavigator();

  return (

    <NavigationContainer> 
      <StatusBar style='auto'/>     
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen 
          name="Login"
          component={LoginScreen}
          />
        <Stack.Screen 
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Home',
            headerTitle: 'Home',
          }}
          />
          <Stack.Screen
            name="DailyActivityScreen"
            component={DailyActivityScreen}
            options={{
              title: 'DailyActivityScreen',
              headerTitle: 'Daily activities',
            }}
          />
      </Stack.Navigator>
    </NavigationContainer>
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