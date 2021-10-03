import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import COLORS from '../data/pallete';

export default function DetailMovieScreen({route, navigation}) {
    const { itemId } = route.params;
    const [movie, setMovie]=useState([]);
    const [movieGenres, setMovieGenres]=useState("");

    useEffect(() => {
        const url = `https://api.themoviedb.org/3/movie/${itemId}?api_key=36999adbceeeccc8332573b558cd6d45&language=en-US`
        axios.get(url)
        .then(function (response){
            setMovie(response.data)
            genreList(response.data.genres)
        })
        .catch(function (error) {
            console.log(error);
        })
    }, []);

    const genreList = genres =>{
        let genreArray = ""
        if(genres.length){
            genres.map((x, index)=>{
                if(index != genres.length - 1){
                    genreArray += x.name+", "
                }else{
                    genreArray += x.name
                }
            })
        }

        setMovieGenres(genreArray)
    }      

    return (
        <ScrollView style={styles.bg}>
            <View style={styles.imgContainer}>
                <Image
                    source={{uri:`https://image.tmdb.org/t/p/original${movie.poster_path}`}}
                    style={{height:400,width:300}}
                />
            </View>
            <View style={styles.block}>
                <Text style={styles.txtTitle}>{movie.title}</Text>
                <View style={styles.desc}>
                    <Text style={styles.txtDesc}>Original Title : {movie.original_title}</Text>
                    <Text style={styles.txtDesc}>Genre : {movieGenres}</Text>
                    <Text style={styles.txtDesc}>Rating : {movie.vote_average}</Text>
                    <Text style={styles.txtDesc}>Released on : {movie.release_date}</Text>
                </View>
                <Text style={styles.txtOverview}>{movie.overview}</Text>
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
