import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View, } from 'react-native'
import COLORS from '../data/pallete'

export default function ThanksScreen({navigation}) {
    return (
        <View style={styles.bg}>
            <View style={styles.word}>
                <Text style={styles.txtContent}>" Thanks for Submit Form "</Text>
            </View>
            <TouchableOpacity
                style={[styles.button,styles.elevation]}
                onPress={()=>navigation.navigate('HomeStack')}
            >
                <Text style={styles.txtButton}>START</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    bg:{
        flex:1,
        backgroundColor:COLORS.white
    },
    word:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    txtContent:{
        fontSize:20,
        fontWeight:'bold'
    },
    button:{
        backgroundColor:COLORS.orange,
        marginHorizontal:'10%',
        paddingVertical:10,
        marginBottom:10,
        borderRadius:1,
        alignItems:'center',
        justifyContent:'center'
    },
    txtButton:{
        color:COLORS.white,
        fontSize:16,
        fontWeight:'bold',
        textAlign:'center',
    },
    elevation:{
        elevation:10,
        shadowColor:COLORS.lightBlack
    }
})
