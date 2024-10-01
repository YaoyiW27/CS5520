import React from 'react'
import { Text, View, Button } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './components/Home';
import GoalDetails from './components/GoalDetails';

const Stack = createNativeStackNavigator();
console.log(Stack);

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Homepage" component={Home} options={{
          headerStyle: {backgroundColor: 'purple'},
          headerTintColor: 'white',
          title: "My Goals",
        }}
        />
        <Stack.Screen 
          name="GoalDetails" 
          component={GoalDetails} 
          options={({ route }) => {
            return {
              title: route.params ? route.params.goalData.text : "More Details",
              headerRight: () => { 
                return <Button title="Warning" />
              }
            }
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}