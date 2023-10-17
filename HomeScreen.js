import React, { useLayoutEffect, useState, useEffect} from "react";
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { auth, quotesCollection } from "./firebase";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen({navigation}){
    const [message, setMessage] = useState('User')
    const navigations = useNavigation()
    const [quote, setQuote] = useState('');

    useLayoutEffect(() => {
        navigations.setOptions({
            headerStyle: {
                backgroundColor: '#f0f0f0'
            },
            headerRight: () => (
                <AntDesign
                    style={styles.navButton}
                    name="arrowright"
                    size={24}
                    onPress={() => navigations.navigate('DailyActivityScreen', {message: message})}
                />
                
            )
        })
    }, [message])

    const handleSignOut = () => {
        auth
            .signOut()
            .then(() => {
                navigation.replace("Login")
            })
            .catch(error => alert (error.message))
    }

    const fetchQuotes = async () => {
        const snapshot = await quotesCollection.get();
        const quotes = snapshot.docs.map(doc => doc.data().text);
        return quotes;
      };
    
      const getRandomQuote = (quotes) => {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        return quotes[randomIndex];
      };
    
      useEffect(() => {
        const fetchAndSetQuote = async () => {
          const quotes = await fetchQuotes();
          const randomQuote = getRandomQuote(quotes);
          setQuote(randomQuote);
        };
        
        fetchAndSetQuote();
      }, []);

    return (
        <View style={styles.container}>
            <View style={styles.quotes}>
                <Text style={styles.quotetext}>
                    Quote to think to:{'\n'} "{quote}"
                </Text>
            </View>
            <View style={styles.textBackground}>
                <Text style={styles.text}>Signed in as: {auth.currentUser?.email}</Text>
            </View>
            <TouchableOpacity
                onPress={handleSignOut}
                style={styles.button}
                >
                    <Text style={styles.buttonText}>Sign Out</Text>
                </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    navButton: {
        marginRight: 5,
        padding: 4,
    },
    button: {
        backgroundColor: '#0782F9',
        width: '60%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 40,
        justifyContent: 'center'
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    textBackground: {
        backgroundColor: 'grey',
        padding: 10, 
        borderRadius: 5, 
    },
    text: {
        color: 'white', 
        fontWeight: 'bold', 
        fontSize: 16,
    },
    quotes: {
        paddingBottom: 20,
    },
    quotetext: {
        color: 'black', 
        fontWeight: 'bold', 
        fontSize: 16,
        textAlign: 'center'
    },
})
