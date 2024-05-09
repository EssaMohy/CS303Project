import { StyleSheet, Text, View,FlatList, ListRenderItem, TouchableOpacity,Image } from 'react-native'
import React from 'react'
import { ListingType } from '@/app/types/listingTypes';
import Colors from "@/constants/colors";

type props ={
    listings: any[]
  }

const Listings = ({listings}: props) => {

    const renderItems : ListRenderItem<ListingType> = ({ item }: { item: any }) => {
        return (
            <View style={styles.item}>
                <TouchableOpacity >
                    <View >
                        <Image
                            source={{ uri: item.image }}
                            style={styles.image}
                        />
                        <View style={styles.overlay}>
                            <Text style={styles.brandtxt} numberOfLines={1} ellipsizeMode='tail'>
                                {item.brand}
                            </Text>
                            <Text style={styles.price}>
                                ${item.price}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
      };
      

  return (
    <View>
      <FlatList data={listings} renderItem={renderItems} horizontal showsHorizontalScrollIndicator={false}></FlatList>
    </View>
  )
}

export default Listings

const styles = StyleSheet.create({
    item: {
        backgroundColor: Colors.white,
        padding: 10,
        borderRadius: 10,
        marginRight: 20,
        width: 220,
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 10,
        marginBottom: 50,
    },
    overlay: {
        alignContent:'space-between',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        paddingVertical: 5,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    brandtxt: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.black,
    },
    price: {
        fontSize: 12,
        fontWeight: '600',
        color: Colors.primary,
    }
});