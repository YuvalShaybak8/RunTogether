import React, { useState } from 'react';
import { Pressable, Text, View, StyleSheet, TextInput } from 'react-native';
import { Avatar } from 'react-native-elements';

function RunScreen(props) {

    const [metricValueNumber, setMetricValueNumber] = useState(0.1);
    const [metricValueType, setMetricValueType] = useState("Kilometer")

    function toggleMetricValue() {
        if (metricValueType === "Kilometer") {
            setMetricValueNumber("00:00:00")
            setMetricValueType("Time")
        }
        else {
            setMetricValueNumber(0.1)
            setMetricValueType("Kilometer")
        }
    }

    return (
        <View style={styles.mainContainer}>
            <Pressable onPress={() => console.warn("pressed kilomteres!")}>
                <Text style={styles.metricValue}>{metricValueNumber}</Text>
                <Text style={styles.metricUnit}>{metricValueType}</Text>
            </Pressable>
            <View style={styles.bottomContainer}>
                <Avatar
                    size={100}
                    rounded
                    title="START"
                    onPress={() => console.warn("works!")}
                    activeOpacity={0.7}
                    titleStyle={styles.startTitle}
                    containerStyle={styles.startButton}
                />
                <Pressable onPress={toggleMetricValue} style={styles.toggleContainer}>
                    <Text style={styles.toggleTitle}>Distance</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        height: "100%", width: "100%", justifyContent: 'space-between', alignItems: 'center', paddingVertical: 48, paddingHorizontal: 24
    },
    toggleContainer: {
        padding: 8, borderWidth: 1, borderRadius: 28, borderColor: "#ccc", marginTop: 50
    },
    metricValue: {
        fontSize: 48, fontWeight: 'bold', borderBottomWidth: 2, marginBottom: 4, alignSelf: "center"
    },
    metricUnit: {
        alignSelf: 'center', fontSize: 16
    },
    bottomContainer: {
        justifyContent: 'space-between', alignItems: 'center'
    },
    startButton: {
        backgroundColor: "#fe9836", paddingRight: 3
    },
    startTitle: {
        fontSize: 28, color: "#000", fontWeight: 'bold', fontStyle: 'italic', letterSpacing: -2.5
    },
    toggleTitle: {
        fontSize: 14,
    }
});

export default RunScreen;
