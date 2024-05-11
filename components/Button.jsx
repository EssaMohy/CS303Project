import React, { useState, useEffect } from "react";
import {TouchableOpacity, Text} from 'react-native';
const Button = ({title, onPress = () => {}}) => {


 

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={{
        height: 55,
        width: '100%',
        backgroundColor:"#2222",
        marginVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:15,
        backgroundColor: "#FCC873",
        
      }}>
      <Text style={{color: "#000",  fontSize: 18}}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
