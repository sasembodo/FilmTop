import React, {useState,useEffect} from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import COLORS from '../data/pallete'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen({navigation}) {
    const [userData, setUserData] = useState({});

    useEffect(() => {
        checkData()
        importData()
    }, []);

    const importData = async () => {
        try {
            const keys = await AsyncStorage.getAllKeys();
            const result = await AsyncStorage.multiGet(keys);
            let mappedStorage = {}
            result.map(x=>{
                mappedStorage[x[0]] = x[1];
            })
            setUserData(mappedStorage)
        } catch (error) {
            console.error(error)
        }
    }

    const checkData = () => {
        try {
            AsyncStorage.getItem('email')
                .then(value => {
                    if (value == null) {
                        navigation.navigate('Form A');
                    }
                })
        } catch (error) {
            console.log(error);
        }
    }

    const signOut = () =>{
        AsyncStorage.getAllKeys()
        .then(keys => AsyncStorage.multiRemove(keys))
        navigation.navigate('Form A');
    }

    return (
        <View style={styles.bg}>
            <View style={styles.header}>
                <View style={styles.titleContainer}>
                    <Text style={styles.txtTitle}>Profile</Text>
                </View>
                <View style={styles.imgContainer}>
                    <Image 
                        source={require('../assets/user.png')}
                        style={{width:100,height:100}}
                    />
                </View>
                <View style={styles.nameContainer}>
                    <Text style={styles.txtName}>{userData.firstName} {userData.lastName}</Text>
                </View>

            </View>
            <View style={styles.form}>
                <Text style={styles.txtContent}>Job Desc: {userData.jobDesc}</Text>
                <Text style={styles.txtContent}>Gender: {userData.gender}</Text>
                <Text style={styles.txtContent}>Email: {userData.email}</Text>
                <Text style={styles.txtContent}>Have a PC/Laptop: {userData.haveLaptop}</Text>
                <Text style={styles.txtContent}>Mobile Number: {userData.phone}</Text>
                <Text style={styles.txtContent}>Address: {userData.address}</Text>
            </View>
            <TouchableOpacity
                style={[styles.button,styles.elevation]}
                onPress={signOut}
            >
                <Ionicons name='log-out' size={18} color={COLORS.white}/>
                <Text style={styles.txtButton}>Sign Out</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    bg:{
        flex:1,
        backgroundColor:COLORS.white
    },
    titleContainer:{
        marginHorizontal:'6%',
        paddingTop:15,
        alignItems:'center',
        justifyContent:'center'
    },
    imgContainer:{
        padding:15,
        marginHorizontal:'6%',
        alignItems:'center',
        justifyContent:'center'
    },
    nameContainer:{
        marginHorizontal:'6%',
        alignItems:'center',
        justifyContent:'center'
    },
    form:{
        flex:1,
        backgroundColor:'#fff',
        paddingHorizontal:'6%',
        marginHorizontal:'3%',
        paddingVertical:10,
        marginTop:20,
        marginVertical:10,
        borderRadius:5
    },
    txtTitle:{
        color:COLORS.lightBlack,
        fontSize:24,
        fontWeight:'900'
    },
    txtName:{
        color:COLORS.lightBlack,
        fontSize:16,
        fontWeight:'bold',
        marginTop:5
    },
    txtContent:{
        color:COLORS.lightBlack,
        fontSize:14,
        fontWeight:'500',
        marginTop:5
    },
    button:{
        backgroundColor:COLORS.orange,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        paddingVertical:10,
        paddingHorizontal:10,
        borderRadius:1,
        marginLeft:'48%',
        marginRight:'6%',
        marginVertical:10        
    },
    txtButton:{
        color:COLORS.white,
        fontWeight:'bold',
        paddingLeft:10
    },
    elevation:{
        elevation:10,
        shadowColor:COLORS.lightBlack
    }
})
