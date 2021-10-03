import React from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

import SplashScreen from './pages/splash';
import FormAScreen from './pages/formA'
import FormBScreen from './pages/formB'
import ConfirmDataScreen from './pages/confirmData'
import ThanksScreen from './pages/thanks'
import HomeScreen from './pages/home';
import ProfileScreen from './pages/profile';
import DetailMovieScreen from './pages/detailMovie';
import DetailTVScreen from './pages/detailTV';
import COLORS from './data/pallete';

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} options={{headerShown:false}} />
        <Stack.Screen name="Form A" component={FormAScreen} options={{headerShown:false}} />
        <Stack.Screen name="Form B" component={FormBScreen} options={{headerShown:false}} />
        <Stack.Screen name="Confirm Data" component={ConfirmDataScreen} options={{headerShown:false}} />
        <Stack.Screen name="Thanks" component={ThanksScreen} options={{headerShown:false}} />
        <Stack.Screen name="HomeStack" component={bottomTab} options={{headerShown:false}} />
        <Stack.Screen name="DetailMovie" component={DetailMovieScreen} options={{headerShown:false}} />
        <Stack.Screen name="DetailTV" component={DetailTVScreen} options={{headerShown:false}} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const bottomTab = ()=>{
  return(
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor:COLORS.orange,
        }}
      >
          <Tab.Screen
            name='Home'
            component={HomeScreen}
            options={{
              tabBarShowLabel:false,
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="home" size={size} color={color} />
              ),
              headerShown:false
            }}
          />
          <Tab.Screen
            name='More'
            component={ProfileScreen}
            options={{
              tabBarShowLabel: false,
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="person-circle" color={color} size={size} />
              ),
              headerShown:false
            }}
          />
      </Tab.Navigator>
  )
}

const styles = StyleSheet.create({})
