import { StyleSheet, Text, View, Image, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';


const ForgotPassword = () => {
    
    

    return (
        <View style={styles.container}>
            <View style={styles.image}>
                <Image
                    source={require('../assets/images/forgot.jpg')}
                    style={{ width: 200, height: 200 }}
                />
            </View>

            <ScrollView
                style={styles.form}
                showsVerticalScrollIndicator={false}
            >
                <View>
                    <Text style={styles.text}>Forgot Your Password</Text>
                </View>

                <View style={styles.email}>
                   
                    <TextInput
                        style={styles.input}
                        placeholder='Enter email address here'
                        autoCapitalize='none'
                        autoCorrect={false}
                        secureTextEntry={false}
                        
                    />
                </View>
                <TouchableOpacity
                    style={styles.button}
                    
                >
                    <Text style={styles.send}>Send Password Reset Link</Text>
                </TouchableOpacity>
                <View style={styles.spam}>
                    <Text style={styles.spamText}>
                        Check your email spam folder to find the password reset link
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
}

export default ForgotPassword;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: "#fff",
    },
    image: {
        width: 200,
        height: 200,
        alignSelf: 'center',
        marginTop: 50,
    },
    form: {
        marginTop: 30,
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    email: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
        marginBottom: 20,
    },
    input: {
        flex: 1,
        marginLeft: 10,
        fontSize: 16,
    },
    button: {
        backgroundColor: 'black',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    send: {
        color: 'white',
        fontSize: 16,
    },
    spam: {
        marginTop: 20,
        alignItems: 'center',
    },
    spamText: {
        fontSize: 12,
        color: "#000",
        fontWeight: "400",
    },
});