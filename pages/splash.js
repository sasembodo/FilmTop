import React, {useEffect} from 'react'
import { StyleSheet, Text, SafeAreaView, View, Image } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import COLORS from '../data/pallete'

export default function SplashScreen({navigation}) {
    useEffect(()=>{
        setTimeout(()=>{
            checkData();
        }, 3000)
    })

    const checkData = () => {
        try {
            AsyncStorage.getItem('email')
                .then(value => {
                    if (value != null) {
                        navigation.navigate('HomeStack');
                    }else{
                        navigation.navigate('Form A');
                    }
                })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.logoContainer}>
                <Image
                  style={{height:150, width: 150}}
                  source={require('../assets/logo.png')}
                />
            </View>
            <View style={styles.textContainer}>            
                <Text style={[styles.txtTitle,{color:COLORS.orange}]}>
                    Film
                </Text>
                <Text style={[styles.txtTitle,{color:COLORS.lightBlack,paddingLeft:5}]}>
                    Top
                </Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:COLORS.white,
        alignItems:'center',
        justifyContent:'center'
    },
    logoContainer:{
        alignItems: 'center',
        justifyContent: 'center'
    },
    textContainer:{
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    txtTitle:{
        fontSize: 26,
        fontWeight: 'bold',
        paddingTop:10
    }
})
