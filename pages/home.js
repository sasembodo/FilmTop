import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, SafeAreaView } from 'react-native'
import COLORS from '../data/pallete'
import CarouselCards from '../components/carouselCard'

export default function HomeScreen({navigation}) {

    const [movie, setMovie]=useState([])
    const [tV, setTV]=useState([])

    useEffect(() => {
        apiCallMovie();
        apiCallTV();

        navigation.addListener('beforeRemove', (e) => {
            e.preventDefault();    
        })
    }, [navigation]);

    const apiCallMovie = () =>{
        const url = `https://api.themoviedb.org/3/discover/movie?api_key=36999adbceeeccc8332573b558cd6d45&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`
        axios.get(url)
            .then(function (response){
                setMovie(response.data.results)
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    const apiCallTV = () =>{
        const url = `https://api.themoviedb.org/3/discover/tv?api_key=36999adbceeeccc8332573b558cd6d45&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false&with_watch_monetization_types=flatrate`
        axios.get(url)
            .then(function (response){
                setTV(response.data.results)
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    const navigateMovieDetail = itemId =>{
        navigation.navigate('DetailMovie', { itemId: itemId })
    }

    const navigateTVDetail = itemId =>{
        navigation.navigate('DetailTV', { itemId: itemId })
    }

    return (
        <ScrollView style={styles.bg}>
            <SafeAreaView style={styles.carousel}>
                <CarouselCards movies={movie.movies}/>
            </SafeAreaView>
            <View style={styles.block}>
                <Text style={styles.txtSubtitle}>Discover Movies</Text>
                <ScrollView horizontal={true}>
                    {movie.map((item,index)=>(
                        <View style={styles.frame} key={index}>
                            <TouchableOpacity
                                onPress={()=>navigateMovieDetail(item.id)}
                            >
                                <Image 
                                    source={{uri:`https://image.tmdb.org/t/p/original${item.poster_path}`}}
                                    resizeMode='contain'
                                    style={{height:200,width:135}}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={()=>navigateMovieDetail(item.id)}
                            >
                                <Text style={styles.txtContent}>{item.title}</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>
            </View>
            <View style={styles.block}>
                <Text style={styles.txtSubtitle}>Discover TV Show</Text>
                <ScrollView horizontal={true}>
                    {tV.map((item,index)=>(
                        <View style={styles.frame} key={index}>
                            <TouchableOpacity
                                onPress={()=>navigateTVDetail(item.id)}
                            >
                                <Image 
                                    source={{uri:`https://image.tmdb.org/t/p/original${item.poster_path}`}}
                                    resizeMode='contain'
                                    style={{height:200,width:135}}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={()=>navigateTVDetail(item.id)}
                            >
                                <Text style={styles.txtContent}>{item.name}</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    carousel: {
        backgroundColor: COLORS.white,
        // alignItems: 'center',
        justifyContent: 'flex-start',
    },
    bg:{
        backgroundColor:COLORS.white
    },
    block:{
        marginHorizontal:10,
        marginTop:20
    },
    frame:{
        width:135,
        marginHorizontal:3
    },
    txtSubtitle:{
        color:COLORS.lightBlack,
        fontSize:18,
        fontWeight:'bold',
        paddingBottom:10
    },
    txtContent:{
        paddingTop:2
    },
})
