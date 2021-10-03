import React, {useState,useEffect} from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import COLORS from '../data/pallete'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ConfirmDataScreen({navigation}) {
    const [userData, setUserData] = useState({});

    useEffect(() => {
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

    return (
        <View style={styles.bg}>
            <View style={styles.titleContainer}>
                <Text style={styles.txtTitle}>Confirmation Data of Entry</Text>
            </View>
            <View style={styles.form}>
                <Text style={styles.txtContent}>Fullname: {userData.firstName} {userData.lastName}</Text>
                <Text style={styles.txtContent}>Job Desc: {userData.jobDesc}</Text>
                <Text style={styles.txtContent}>Gender: {userData.gender}</Text>
                <Text style={styles.txtContent}>Email: {userData.email}</Text>
                <Text style={styles.txtContent}>Have a PC/Laptop: {userData.haveLaptop}</Text>
                <Text style={styles.txtContent}>Mobile Number: {userData.phone}</Text>
                <Text style={styles.txtContent}>Address: {userData.address}</Text>
            </View>
            <View style={styles.btnBlock}>
                <TouchableOpacity
                    style={[styles.button,styles.elevation,{backgroundColor:COLORS.lightBlack}]}
                    onPress={()=>navigation.navigate('Form B')}
                >
                    <Text style={styles.txtButton}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button,styles.elevation,{backgroundColor:COLORS.orange}]}
                    onPress={()=>navigation.navigate('Thanks')}
                >
                    <Text style={styles.txtButton}>Submit</Text>
                </TouchableOpacity>
            </View>
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
    btnBlock:{
        flexDirection:'row',
        marginHorizontal:'10%',
        marginVertical:10,
        alignItems:'center',
        justifyContent:'space-between'
    },
    button:{
        paddingVertical:10,
        paddingHorizontal:'15%',
        borderRadius:1      
    },
    txtButton:{
        color:COLORS.white,
        fontWeight:'bold',
        textAlign:'center',
    },
    txtTitle:{
        color:COLORS.lightBlack,
        fontSize:20,
        fontWeight:'bold'
    },
    txtContent:{
        color:COLORS.lightBlack,
        fontSize:14,
        fontWeight:'500',
        marginTop:5
    },
    elevation:{
        elevation:10,
        shadowColor:COLORS.lightBlack
    }
})
