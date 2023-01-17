import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Button, Image, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker'
import { Formik } from 'formik';
import * as yup from 'yup';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import HomeHeader from '../../components/layouts/HomeHeader';

import { firebase, getDownloadURL, getStorage, ref } from '../../../firebase';
import { COLORS, SIZES } from '../../constants';

export default ItemUpload = () => {
    const navigation = useNavigation()
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')
    const [hasGalleryPermission, setGalleryPermission] = useState(null)
    const [image, setImage] = useState(null)
    const [uploading, setUploading] = useState(false)
    const [url, setUrl] = useState(null)

    useEffect(() => {
        (async () => {
            const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync()
            setGalleryPermission(galleryStatus.status == "granted");
        })();
    }, [])

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
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

    const uploadImage = async () => {
        setUploading(true);
        const response = await fetch(image)
        const blob = await response.blob();
        const filename = image.substring(image.lastIndexOf('/') + 1);
        var uploadTask = firebase.storage().ref().child(filename).put(blob);
        const storage = getStorage()
        const reference = ref(storage, filename);
        try {
            await uploadTask;
            await getDownloadURL(reference, uploadTask).then((url) => {
                setUrl(url)
            });
        } catch (e) {
            console.log(e)
        }

        setUploading(false);
        Alert.alert("photo uploaded successfully!!")
    }

    return (


        <KeyboardAwareScrollView style={styles.container}>
            <HomeHeader />

            <Formik
                initialValues={{ name: '', description: '', price: '' }}
                validationSchema={yup.object().shape({
                    name: yup.string().required('Item name is required'),
                    description: yup.string().required('Item description is required'),
                    price: yup
                        .number()
                        .required('Item price is required')
                        .positive('Price must be a positive number'),
                })}
                onSubmit={(values) => {
                    // handle item upload here
                }}
                
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
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
                            <Text>Upload Item</Text>
                        </View>
                        <View style={styles.input}>
                            <Text>Name:</Text>
                            <TextInput
                                onChangeText={handleChange('name')}
                                onBlur={handleBlur('name')}
                                value={values.name}
                            />
                            <Text>{errors.name}</Text>
                        </View>
                        <View style={styles.input}>
                            <Text>Description:</Text>
                            <TextInput
                                onChangeText={handleChange('description')}
                                onBlur={handleBlur('description')}
                                value={values.description}
                            />
                            <Text>{errors.description}</Text>
                        </View>
                        <View style={styles.input}>
                            <Text>Price:</Text>
                            <TextInput
                                onChangeText={handleChange('price')}
                                onBlur={handleBlur('price')}
                                value={values.price}
                                keyboardType="numeric"
                            />
                            <Text>{errors.price}</Text>
                        </View>

                        <View style={styles.input}>
                            <View style={{ flex: 1, alignItems: "center", marginTop: 10 }}>
                                <Button title="Pick an image" onPress={pickImage} />
                                {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
                                {url && <Image source={{ uri: url }} style={{ width: 200, height: 200 }} />}
                            </View>
                        </View>
                        <View style={styles.button}>
                            <TouchableOpacity onPress={uploadImage}>
                                <Text style={styles.buttonText}>Upload</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </Formik>
        </KeyboardAwareScrollView>
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 25,
    },
    formContainer: {
        marginTop: 25,
        paddingLeft:15,
        width: '95%',
    },
    input: {
        padding: 10,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
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
});


