import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import COLORS from '../data/pallete';

export default function DetailTVScreen({route, navigation}) {

    const { itemId } = route.params;
    const [tV, setTV]=useState([]);

    useEffect(() => {
        const url = `https://api.themoviedb.org/3/tv/${itemId}?api_key=36999adbceeeccc8332573b558cd6d45&language=en-US`
        axios.get(url)
        .then(function (response){
            setTV(response.data)
        })
        .catch(function (error) {
            console.log(error);
        })
    }, []);

    return (
        <ScrollView style={styles.bg}>
            <View style={styles.imgContainer}>
                <Image
                    source={{uri:`https://image.tmdb.org/t/p/original${tV.poster_path}`}}
                    style={{height:400,width:300}}
                />
            </View>
            <View style={styles.block}>
                <Text style={styles.txtTitle}>{tV.name}</Text>
                <View style={styles.desc}>
                    <Text style={styles.txtDesc}>Original Title : {tV.original_name}</Text>
                    <Text style={styles.txtDesc}>Rating : {tV.vote_average}</Text>
                    <Text style={styles.txtDesc}>First Aired on : {tV.first_air_date}</Text>
                </View>
                <Text style={styles.txtOverview}>{tV.overview}</Text>
            </View>
            <View style={styles.row}>
                <TouchableOpacity style={[styles.button]}>
                <Ionicons name='logo-youtube' size={18} style={styles.icon} color={COLORS.red}/>
                <Text style={[styles.buttonLabel]}>
                    Trailer
                </Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button]}>
                <Ionicons name='videocam' size={18} style={styles.icon} color={COLORS.white}/>
                <Text style={styles.buttonLabel}>
                    Netflix
                </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    bg:{
        backgroundColor:COLORS.white
    },
    block:{
        marginHorizontal:'3%'
    },
    imgContainer:{
        alignItems:'center',
        justifyContent:'center',
        paddingVertical:20
    },
    desc:{
        paddingBottom:10
    },
    txtTitle:{
        color:COLORS.orange,
        fontSize:18,
        fontWeight:'bold',
        paddingBottom:10
    },
    txtOverview:{
        textAlign:'justify'
    },
    row: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent:'center',
    },
    button: {
        flexDirection: "row",
        paddingVertical: 10,
        paddingHorizontal: 15,
        margin: 20,
        backgroundColor: COLORS.lightBlack,
        borderRadius: 5
    },
    buttonLabel:{
        color: COLORS.white
    },
    icon: {
        marginRight: 10 
    }
})
