import {StyleSheet ,Text, View } from 'react-native'
import React, { Component } from 'react'
import { useLocalSearchParams } from 'expo-router'
import CategoryDetails from "../../components/categoryDetails";

const ListingDetails = () => {
    const {id} = useLocalSearchParams();
    console.log(id)
  return <CategoryDetails/>
}

export default ListingDetails

const styles = StyleSheet.create({})