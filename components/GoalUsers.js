import { View, Text, StyleSheet, FlatList } from 'react-native'
import React, { useEffect , useState } from 'react'
import { getAllDocuemnts, writeToDB } from '../Firebase/firestoreHelper';

export default function GoalUsers( {id}) {
    const [users, setUsers] = useState([]);

    useEffect( () => {
        // fetch data
        async function fetchData() {
            try {
            const dataFromDB = await getAllDocuemnts(`goals/${id}/users`);
            if (dataFromDB.length) {
                setUsers(dataFromDB.map((user) => {
                    return user.name;
                  })
                );
                return;
            }
            const response = await fetch(
                'https://jsonplaceholder.typicode.com/users'
            );
            if (!response.ok) {
                throw new Error(
                    `An HTTP error happenend with status: ${response.status}`
                );
            }
            // this code wukk only run if the response is ok
            // extract data
            const data = await response.json();
            // set the users state variable
            data.forEach((user) => writeToDB(`goals/${id}/users`, user));
            setUsers (
               data.map ((user) => {
                return user.name;
               })
            );
            } catch (err) {
                console.log("fetch user data", err);
            };
        }
        fetchData();
    }, []);
  return (
    <View>
        <FlatList 
            data={users} 
            renderItem={({item}) => {
            return <Text>{item}</Text>;
            }}
        />
    </View>
  )
}

const styles = StyleSheet.create({})