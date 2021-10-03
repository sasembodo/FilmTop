import React, {useState,useEffect} from 'react'
import { ScrollView, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert} from 'react-native'
import SelectDropdown from 'react-native-select-dropdown'
import AsyncStorage from '@react-native-async-storage/async-storage';
import COLORS from '../data/pallete'

export default function FormAScreen({navigation}) {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [jobDesc, setJobDesc] = useState("")
    const [gender, setGender] = useState([])
    const [email, setEmail] = useState('')

    useEffect(() => {
        navigation.addListener('beforeRemove', (e) => {
            e.preventDefault();    
        })
    }, [navigation]);

    const setData = async () => {
        if (!firstName.length) {
            Alert.alert('Warning!', 'Make sure your First Name input are filled.')
        } else if (!email.length) {
            Alert.alert('Warning!', 'Make sure your email input are filled.')
        } else if (!gender.length) {
            Alert.alert('Warning!', 'Make sure your gender input are filled.')
        } else {
            try {
                var inputData = [
                    ["firstName", firstName],
                    ["lastName", lastName],
                    ["jobDesc", jobDesc],
                    ["gender", gender],
                    ["email", email],
                ]
                await AsyncStorage.multiSet(inputData);
                navigation.navigate('Form B');
            } catch (error) {
                console.log(error);
            }
        }
    }



    return (
        <View style={styles.bg}>
            <ScrollView style={styles.form}>
                <View style={styles.nameStyle}>
                    <View style={[styles.nameBlock,{marginRight:5}]}>
                        <Text style={styles.txtSubtitle}>First Name</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder='...'
                            onChangeText={(value) => setFirstName(value)}
                        />
                    </View>
                    <View style={[styles.nameBlock,{marginLeft:5}]}>
                        <Text style={styles.txtSubtitle}>Last Name</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder='...'
                            onChangeText={(value) => setLastName(value)}
                        />
                    </View>
                </View>
                <View style={styles.jobDescStyle}>
                    <Text style={styles.txtSubtitle}>Job Desc</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder='...'
                        onChangeText={(value) => setJobDesc(value)}
                    />
                </View>
                <View style={styles.genderStyle}>
                    <Text style={styles.txtSubtitle}>Gender</Text>
                    <SelectDropdown
                        data={['Male','Female']}
                        onSelect={(selectedItem, index) => {
                            setGender(selectedItem)
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem
                        }}
                        rowTextForSelection={(item, index) => {
                            return item
                        }}
                        buttonStyle={[styles.textInput,{width:'100%'}]}
                        buttonTextStyle={{fontSize:14}}
                    />
                    <View >
                    </View>
                </View>
                <View style={styles.emailStyle}>
                    <Text style={styles.txtSubtitle}>Email</Text>
                    <TextInput
                        style={styles.textInput}
                        keyboardType='email-address'
                        placeholder='...'
                        onChangeText={(value) => setEmail(value)}
                    />
                </View>
            </ScrollView>
            <TouchableOpacity
                style={[styles.button,styles.elevation]}
                onPress={setData}
            >
                <Text style={styles.txtButton}>Next</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    bg:{
        flex:1,
        backgroundColor:COLORS.white
    },
    form:{
        marginHorizontal:'6%',
        marginVertical:10
    },
    nameStyle:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between'
    },
    jobDescStyle:{
        marginTop:10
    },
    genderStyle:{
        marginTop:10
    },
    emailStyle:{
        marginTop:10
    },
    nameBlock:{
        flex:0.5
    },
    textInput:{
        backgroundColor:'#fff',
        paddingHorizontal:20,
        marginTop:5,
        borderWidth:0.5,
        borderColor:COLORS.lightBlack,
        borderRadius:1
    },
    txtSubtitle:{
        color:COLORS.lightBlack,
        fontSize:16,
        paddingLeft:2,
        fontWeight:'bold'
    },
    button:{
        backgroundColor:COLORS.orange,
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
        textAlign:'center',
    },
    elevation:{
        elevation:10,
        shadowColor:COLORS.lightBlack
    }
})
