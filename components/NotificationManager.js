import { View, Text } from 'react-native'
import React from 'react'

export default function NotificationManager() {
    async function verifyPermission() {
        try {
            //check if user has given permission
            //if so return true
            if (response.granted) {
                return true;
            }
            //if not ask for permission and return what user has chosen
            const permissionResponse = await requestPermission();
            return permissionResponse.granted;
        } catch (err) {
            console.log("verify permission ", err);
        }
    }
  return (
    <View>
      <Text>NotificationManager</Text>
    </View>
  )
}