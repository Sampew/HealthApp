import React, { useState,useEffect, useLayoutEffect } from "react";
import {StyleSheet, View, Text, BackHandler, ScrollView, TextInput, TouchableOpacity} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DailyActivityScreen({route, navigation}){

    const [message, setMessage] = useState('Testing')
    const [items, setItems] = useState([
    ]);
    const [newItemText, setNewItemText] = useState('')

    const addItem = () => {
        if (newItemText.trim() === '') {
          return; // Don't add empty items
        }
      
        const newItem = {
          id: items.length + 1, // Generate a unique ID
          text: newItemText,
          checked: false,
        };
      
        const updatedItems = [...items, newItem];
      
        // Save the updated items to AsyncStorage
        AsyncStorage.setItem('items', JSON.stringify(updatedItems))
          .then(() => {
            setItems(updatedItems);
            setNewItemText('');
          })
          .catch((error) => {
            console.error('Error saving items:', error);
          });
      };

      const deleteItem = (itemId) => {
        const updatedItems = items.filter((item) => item.id !== itemId);
        
        // Save the updated items to AsyncStorage
        AsyncStorage.setItem('items', JSON.stringify(updatedItems))
          .then(() => {
            setItems(updatedItems);
          })
          .catch((error) => {
            console.error('Error deleting item:', error);
          });
      };
      
      useEffect(() => {
        // Load saved items from AsyncStorage
        const loadItems = async () => {
          try {
            const savedItemsJSON = await AsyncStorage.getItem('items');
            if (savedItemsJSON !== null) {
              const savedItems = JSON.parse(savedItemsJSON);
              setItems(savedItems);
            }
          } catch (error) {
            console.error('Error loading items:', error);
          }
        };
      
        loadItems();
      }, []);

    const handleToggle = (itemId) => {
        const updatedItems = items.map((item) =>
          item.id === itemId ? { ...item, checked: !item.checked } : item
        );
        setItems(updatedItems);
      }


    useEffect(() => {

        BackHandler.addEventListener('hardwareBackPress', close);
        return() => {
            BackHandler.addEventListener('hardwareBackPress', close)
        }
    }, [])

    function close() {
        navigation.goBack(null);
        return true;
    }

    const uncheckAllItems = () => {
      const updatedItems = items.map((item) => ({
        ...item,
        checked: false,
      }));
      setItems(updatedItems);
    
      // Update AsyncStorage with the new item states
      AsyncStorage.setItem('items', JSON.stringify(updatedItems))
        .then(() => {
          console.log('All items unchecked.');
        })
        .catch((error) => {
          console.error('Error updating items:', error);
        });
    };
    const CustomCheckbox = ({ checked, onPress }) => {
      return (
        <TouchableOpacity onPress={onPress}>
          <View style={[styles.checkbox, checked ? styles.checked : styles.unchecked]}>
            {checked && <AntDesign name="check" size={18} color="white" />}
          </View>
        </TouchableOpacity>
      );
    };

    return (
        <View style={styles.container}>
    <ScrollView>
      {items.map((item) => (
        <View key={item.id} style={styles.checkboxContainer}>
          <CustomCheckbox
          checked={item.checked}
          onPress={() => handleToggle(item.id)}
          />
          <Text style={styles.checkboxLabel}>{item.text}</Text>
          <TouchableOpacity onPress={() => deleteItem(item.id)}>
            <AntDesign name="delete" size={24} color="red" />
          </TouchableOpacity>
        </View>
      ))}
      <View style={styles.textInputContainer}>
        
        <TextInput
          style={styles.textInput}
          placeholder="Enter a new activity"
          value={newItemText}
          returnKeyType='done'
          onSubmitEditing={addItem}
          onChangeText={(text) => setNewItemText(text)}
        />
        <TouchableOpacity onPress={addItem} style={styles.button}>
        <Text style={styles.buttonText}>Add activity</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={uncheckAllItems} style={styles.button}>
        <Text style={styles.buttonText}>Uncheck All</Text>
        </TouchableOpacity>
        <Text style={[styles.infoText, { textAlign: 'center' }]}>Add your daily activities to the list and check the checkbox when you have completed the task.
        {'\n'}
        Press uncheck all every morning to reset the checkboxes</Text>
      </View>
    </ScrollView>
  </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    checkboxContainer: {
        flexDirection: 'row', // To align checkboxes horizontally
        alignItems: 'center', // To vertically center the checkboxes
        marginBottom: 10, // Adjust as needed to add spacing between checkboxes
        justifyContent: 'center'
      },
      checkboxLabel: {
        marginLeft: 10, // Adjust as needed to add space between checkbox and text
      },
      button: {
        backgroundColor: '#0782F9',
        width: '60%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
        justifyContent: 'center'
      },
      buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
        textAlign: 'center'
      },
      infoText: {
        marginTop: 20,
        color: 'black',
        fontWeight: '700',
        fontSize: 16,
      },
      inputContainer: {
        width: '80%'
      },
      textInput: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
      },
      textInputContainer:{
        justifyContent: 'center',
        alignItems: 'center',
      },
      checkbox: {
        width: 24,
        height: 24,
        borderWidth: 1,
        borderColor: 'blue', // Border color for unchecked checkbox
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
      },
      checked: {
        backgroundColor: 'blue', // Background color for checked checkbox
        borderColor: 'blue',    // Border color for checked checkbox
      },
      unchecked: {
        backgroundColor: 'white', // Background color for unchecked checkbox
      },
})