import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Button, Image, ActivityIndicator, ImageBase } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { firebase, getDownloadURL, getStorage, ref } from '../../../firebase';


import HomeHeader from '../layouts/HomeHeader';
import { COLORS, SIZES } from '../../constants';
import ProductContext from './../../context/product/productContext';


export default ItemUpload = () => {
    const navigation = useNavigation()
    const productContext = useContext(ProductContext)

    const { item, updateItem } = productContext
    const [formData, setFormData] = useState(item || { name: '', title: '', description: '', price: '' })

    useEffect(() => {
        setFormData(item)
    }, [item])

    const [hasGalleryPermission, setGalleryPermission] = useState(null)
    const [image, setImage] = useState(null)
    const [uploading, setUploading] = useState(false)

    useEffect(() => {
        (async () => {
            const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync()
            setGalleryPermission(galleryStatus.status == "granted");
        })();
    }, [])

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            aspect: [4, 2],
            quality: 1
        });

        console.log(result);
        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }

        if (hasGalleryPermission === false) {
            return <Text>No access to internal storage!</Text>
        }
    }

    const handleSubmit = async () => {
        setUploading(true);
        if (image) {
            const response = await fetch(image)
            const blob = await response.blob();
            const filename = image.substring(image.lastIndexOf('/') + 1);
            var uploadTask = firebase.storage().ref().child(filename).put(blob);
            const storage = getStorage()
            const reference = ref(storage, filename);
            
            let data = formData

            try {
                await uploadTask;
                await getDownloadURL(reference, uploadTask)
                    .then(async (url) => {
                        data.url = url;
                        updateItem(data)

                    });

            } catch (error) {
                console.log(error.message)
            }
        } else {

            try {
                updateItem(formData)
                
            } catch (error) {
                
            }
        }
    }


    if (!item) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text style={{ marginTop: 10, fontSize: 18 }}>Loading...</Text>
            </View>
        )
    }

    return (
        <KeyboardAwareScrollView style={styles.container}>
            <HomeHeader />
            <View style={styles.formContainer}>
                <View>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialCommunityIcons name="chevron-left" style={{
                            fontSize: 20,
                            color: COLORS.black,
                            padding: 12,
                            marginTop: 10,
                            backgroundColor: COLORS.white,
                            borderRadius: 12,
                            position: 'absolute',
                            left: -200,
                            top: -200,
                        }} />
                    </TouchableOpacity>
                    <Text style={styles.uploadHeader}>Update Item</Text>
                </View>
                <View style={styles.input}>
                    <Text>Name:</Text>
                    <TextInput
                        name="name"
                        value={formData.name}
                        onChangeText={(text) => setFormData({ ...formData, name: text })}
                    />
                </View>
                <View style={styles.input}>
                    <Text>Title:</Text>
                    <TextInput
                        name="title"
                        value={formData.title}
                        onChangeText={(text) => setFormData({ ...formData, title: text })}
                    />
                </View>
                <View style={styles.input}>
                    <Text>Description:</Text>
                    <TextInput
                        name="description"
                        value={formData.description}
                        onChangeText={(text) => setFormData({ ...formData, description: text })}
                    />
                </View>
                <View style={styles.input}>
                    <Text>Price:</Text>
                    <TextInput
                        name="price"
                        keyboardType='numeric'
                        value={formData.price}
                        onChangeText={(text) => setFormData({ ...formData, price: text })}
                    />
                </View>

                <View style={styles.input}>
                    <View style={styles.pickImage}>
                        <Button title="Pick an image" onPress={pickImage} />
                        {image && <Image source={{ uri: image }} style={{ width: 305, height: 400, resizeMode: 'contain' }} />}
                    </View>
                </View>
                <View style={styles.button}>
                    <TouchableOpacity onPress={handleSubmit}>
                        <Text style={styles.buttonText}>Update</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </KeyboardAwareScrollView>
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    formContainer: {
        marginTop: 25,
        paddingLeft: 15,
        width: '95%',
    },
    input: {
        padding: 10,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
    },
    errorText: {
        color: 'red',
    },
    uploadHeader: {
        color: COLORS.primary,
        fontWeight: 'bold',
        fontSize: 20,

    },
    button: {
        backgroundColor: COLORS.primary,
        padding: SIZES.small,
        borderRadius: SIZES.extraLarge,
        alignItems: 'center',
        width: '100%',
        marginBottom: 10,

    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    pickImage: {
        flex: 1,
        marginTop: 10,
        titleBackgroundColor: COLORS.primary,
    },
});


