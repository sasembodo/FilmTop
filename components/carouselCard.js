import React, {useState, useEffect} from 'react'
import { View } from "react-native"
import Carousel from 'react-native-snap-carousel'
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from './carouselCardItem'
import axios from 'axios'

const CarouselCards = () => {
  const [movie, setMovie]=useState([])

  useEffect(() => {
    apiCallMovie();
  }, []);

  const apiCallMovie = () =>{
    const url = `https://api.themoviedb.org/3/movie/popular/?api_key=36999adbceeeccc8332573b558cd6d45&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`
    axios.get(url)
        .then(function (response){
            setMovie(response.data.results)
        })
        .catch(function (error) {
            console.log(error);
        })
  }

  const isCarousel = React.useRef(null)
    return (
      <View>
        <Carousel
          layout="default"
          layoutCardOffset={9}
          ref={isCarousel}
          data={movie}
          renderItem={CarouselCardItem}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={SLIDER_WIDTH}
          inactiveSlideShift={0}
          useScrollView={true}
          loop={true}
          enableMomentum={false}
          lockScrollWhileSnapping={true}
          autoplay={true}
          autoplayDelay={3000}
          autoplayInterval={3000}
        />
      </View>
    )
}


export default CarouselCards