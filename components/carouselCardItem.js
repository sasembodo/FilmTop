import React from 'react'
import { View, Text, StyleSheet, Dimensions, Image } from "react-native"
import FadingEdge from 'react-native-fading-edge';
import COLORS from '../data/pallete'

export const SLIDER_WIDTH = Dimensions.get('window').width
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7)

const CarouselCardItem = ({ item, index }) => {
  return (
    <View style={styles.container} key={index}>
        <FadingEdge bottom={1300}>
        <Image
            source={{uri:`https://image.tmdb.org/t/p/original${item.poster_path}`}}
            style={styles.image}
        />
        </FadingEdge>
        <View style={styles.bodyContainer}>
            <Text style={styles.header} numberOfLines={2}>{item.original_title}</Text>
            <Text style={styles.body} numberOfLines={4}>{item.overview}</Text>
        </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    width: SLIDER_WIDTH,
    paddingBottom: 40,
  },
  bodyContainer: {
    top:-200,
    marginBottom:-200,
  },
  image: {
    width: SLIDER_WIDTH,
    height: 500,
  },
  header: {
    color: COLORS.lightBlack,
    fontSize: 28,
    fontWeight: "bold",
    paddingLeft: 20,
    paddingTop: 20,
    textShadowColor: COLORS.white,
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius:2
  },
  body: {
    color: COLORS.lightBlack,
    fontSize: 18,
    fontWeight: "bold",
    paddingLeft: 20,
    paddingRight: 20,
    textShadowColor: COLORS.white,
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2
  }
})

export default CarouselCardItem