import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import { Image , View} from 'react-native';

export default function Register() {
    return (
        <SafeAreaView className="flex-1">
            <StatusBar style="dark"/>
            <View className="flex-1 items-center justify-center">
                <Image source={require('../assets/images/Register.jpeg')} />
            </View>
        </SafeAreaView>
    )
}