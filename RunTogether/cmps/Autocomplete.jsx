import React, {useRef} from 'react';
import {Text, View, StyleSheet, Dimensions, ScrollView} from 'react-native';
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
const {height, width} = Dimensions.get('screen');

export function Autocomplete({location, setLocation}) {
    const googlePlacesAutocompleteRef = useRef(null)

    const handlePlaceSelect = async (details) => {
    try {
      setLocation(details.description)
    } catch (error) {
      console.error("Error fetching coordinates:", error);
    }
  };

    return (
        <ScrollView keyboardShouldPersistTaps="handled">
                    <Text style={styles.label}>Location</Text>
                    <View style={styles.autocompleteContainer}>
                        <GooglePlacesAutocomplete
                        ref={googlePlacesAutocompleteRef}
                        placeholder="Pick a location... (optional)"
                        onPress={handlePlaceSelect}
                        query={{
                            key: "AIzaSyBtoaDHY9OmHFBh9oIBmzADt_R6wR1uC2Q",
                            language: "en",
                        }}
                        nearbyPlacesAPI="GooglePlacesSearch"
                        debounce={300}
                        styles={{
                            container: {
                            zIndex: 999,
                            },
                            textInputContainer: {
                            backgroundColor: "rgba(0,0,0,0)",
                            borderTopWidth: 0,
                            borderBottomWidth: 0,
                            },
                            textInput: {
                            marginLeft: 0,
                            marginRight: 0,
                            height: 38,
                            color: "#5d5d5d",
                            fontSize: 16,
                            },
                            predefinedPlacesDescription: {
                            color: "#1faadb",
                            },
                        }}
                        />
                    </View>
                    </ScrollView>
    )
}

const styles = StyleSheet.create({

    label: {
        fontSize: 16,
        fontWeight: "bold",
        marginVertical: 6,
    },
    autocompleteContainer: {
    width: "100%",
    zIndex: "999",
    borderRadius: 10,
  },  
});