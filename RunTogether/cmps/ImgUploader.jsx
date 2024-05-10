import React, { useState } from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { uploadService } from '../services/upload.service';

export function ImgUploader({ onUploaded = null }) {
    const [isUploading, setIsUploading] = useState(false);
    const [selectedImage, setSelectedImage] = useState("");

    const selectImage = async (launchFunction) => {
        setIsUploading(true);
        try {
            const response = await launchFunction({
                allowsEditing: true,
                aspect: [4, 3],
                base64: true,
            });
            const { uri } = response.assets[0];
            if (response.canceled) {
                setIsUploading(false);
                return;
            }
            setSelectedImage({ localUri: uri });
            let base64Img = `data:image/jpg;base64,${response.assets[0].base64}`;
            const imgData = await uploadService.uploadImg(base64Img);
            setIsUploading(false);
            console.log('imgData', imgData);
            onUploaded && onUploaded({ imgUrl: imgData.secure_url });
        } catch (error) {
            setIsUploading(false);
            console.error('Failed to upload image', error);
        }
    };

    const uploadImg = () => selectImage(ImagePicker.launchImageLibraryAsync);
    const takePhoto = () => selectImage(ImagePicker.launchCameraAsync);

    const getUploadLabel = () => {
        return isUploading ? 'Uploading...' : 'Upload your photo';
    };

    const getPhotoLabel = () => {
        return isUploading ? 'Uploading...' : 'Take a photo';
    };

    return (
        <View style={styles.container}>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={[styles.button, styles.uploadButton]} onPress={uploadImg}>
                    <Text style={styles.buttonText}>{getUploadLabel()}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.photoButton]} onPress={takePhoto}>
                    <Text style={styles.buttonText}>{getPhotoLabel()}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonsContainer: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        width: '100%',
    },
    button: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        textAlign: 'center',
    },
    uploadButton: {
        backgroundColor: '#F7706EFF', 
        marginRight: 10, 
        flex: 1, 
    },
    photoButton: {
        backgroundColor: '#F7706EFF', 
        marginLeft: 10, 
        flex: 1, 
    },
});
