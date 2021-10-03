import React, {useState,useEffect} from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native'
import { RadioButton } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage';
import COLORS from '../data/pallete';

export default function FormBScreen({navigation}) {
    const [haveLaptop, setHaveLaptop] = useState("Yes");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");

    const setData = async () => {
        if (!haveLaptop.length) {
            Alert.alert('Warning!', 'Make sure your laptop input are filled.')
        } else if (!address.length) {
            Alert.alert('Warning!', 'Make sure your address are filled.')
        } else if (!phone.length) {
            Alert.alert('Warning!', 'Make sure your phone input are filled.')
        } else {
            try {
                var inputData = [
                    ["haveLaptop", haveLaptop],
                    ["address", address],
                    ["phone", phone],
                ]
                await AsyncStorage.multiSet(inputData);
                navigation.navigate('Confirm Data')
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <View style={styles.bg}>
            <View style={styles.form}>
                <View style={styles.haveLaptop}>
                    <Text style={styles.txtSubtitle}>Have a Laptop or PC?</Text>
                    <View style={styles.radioBtns}>
                        <View style={styles.radioButton}>
                            <RadioButton
                                value="Yes"
                                status={ haveLaptop === 'Yes' ? 'checked' : 'unchecked' }
                                onPress={() => setHaveLaptop('Yes')}
                                color={COLORS.orange}
                            />
                            <Text>Yes</Text>
                        </View>
                        <View style={styles.radioButton}>
                            <RadioButton
                                value="No"
                                status={ haveLaptop === 'No' ? 'checked' : 'unchecked' }
                                onPress={() => setHaveLaptop('No')}
                                color={COLORS.orange}
                            />
                            <Text>No</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.address}>
                    <Text style={styles.txtSubtitle}>Address</Text>
                    <TextInput
                        style={styles.textInput}
                        multiline={true}
                        numberOfLines={5}
                        onChangeText={(value) => setAddress(value)}
                    />
                </View>
                <View style={styles.mobileNumber}>
                    <Text style={styles.txtSubtitle}>Mobile Number</Text>
                    <TextInput
                        style={styles.textInput}
                        keyboardType='phone-pad'
                        onChangeText={(value) => setPhone(value)}
                    />
                </View>
            </View>
            <View style={styles.btnBlock}>
                <TouchableOpacity
                    style={[styles.button,styles.elevation,{backgroundColor:COLORS.lightBlack}]}
                    onPress={()=>navigation.navigate('Form A')}
                >
                    <Text style={styles.txtButton}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button,styles.elevation,{backgroundColor:COLORS.orange}]}
                    onPress={setData}
                >
                    <Text style={styles.txtButton}>Next</Text>
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
    form:{
        flex:1,
        marginHorizontal:'6%',
        marginVertical:10
    },
    haveLaptop:{
        marginTop:10
    },
    address:{
        marginTop:10
    },
    mobileNumber:{
        marginTop:10
    },
    textInput:{
        backgroundColor:'#fff',
        paddingHorizontal:20,
        marginTop:5,
        borderWidth:0.5,
        borderColor:COLORS.lightBlack,
        borderRadius:1
    },
    radioBtns:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:'20%'
    },
    radioButton:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    txtSubtitle:{
        color:COLORS.lightBlack,
        fontSize:16,
        paddingLeft:2,
        fontWeight:'bold'
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
    elevation:{
        elevation:10,
        shadowColor:COLORS.lightBlack
    }
})
