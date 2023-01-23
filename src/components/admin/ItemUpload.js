import React, { useState, useEffect, useContext } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Button, Image, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker'
import { Formik } from 'formik';
import * as yup from 'yup';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { firebase, getDownloadURL, getStorage, ref } from '../../../firebase';


import HomeHeader from '../layouts/HomeHeader';
import { COLORS, SIZES } from '../../constants';
import productContext from './../../context/product/productContext';


export default ItemUpload = ({ route }) => {
    const initialState = {
        name: '',
        title: '',
        description: '',
        prince: '',
    }
    const navigation = useNavigation()
    const [itemData, setItem] = useState(initialState)



    const ProductContext = useContext(productContext)
    const { uploadItem } = ProductContext

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


    return (
        <KeyboardAwareScrollView style={styles.container}>
            <HomeHeader />

            <Formik
                initialValues={{ name: itemData.name, title: itemData.title, description: itemData.description, price: itemData.price }}
                validationSchema={yup.object().shape({
                    name: yup.string().required('Item name is required'),
                    title: yup.string().required('Item title is required'),
                    description: yup.string().required('Item description is required'),
                    price: yup
                        .number()
                        .required('Item price is required')
                        .positive('Price must be a positive number'),
                })}
                onSubmit={async (values) => {
                    setUploading(true);
                    const response = await fetch(image)
                    const blob = await response.blob();
                    const filename = image.substring(image.lastIndexOf('/') + 1);
                    var uploadTask = firebase.storage().ref().child(filename).put(blob);
                    const storage = getStorage()
                    const reference = ref(storage, filename);

                    let data = values

                    try {
                        await uploadTask;
                        await getDownloadURL(reference, uploadTask)
                            .then(async (url) => {
                                data.url = url;
                                uploadItem(data)

                            });

                    } catch (error) {
                        console.log(error.message)
                    }
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
                            <Text style={styles.uploadHeader}>Upload Item</Text>
                        </View>
                        <View style={styles.input}>
                            <Text>Name:</Text>
                            <TextInput
                                onChangeText={handleChange('name')}
                                onBlur={handleBlur('name')}
                                value={values.name}
                            />
                            <Text style={styles.errorText}>{errors.name}</Text>
                        </View>
                        <View style={styles.input}>
                            <Text>Title:</Text>
                            <TextInput
                                onChangeText={handleChange('title')}
                                onBlur={handleBlur('title')}
                                value={values.title}
                            />
                            <Text style={styles.errorText}>{errors.title}</Text>
                        </View>
                        <View style={styles.input}>
                            <Text>Description:</Text>
                            <TextInput
                                onChangeText={handleChange('description')}
                                onBlur={handleBlur('description')}
                                value={values.description}
                            />
                            <Text style={styles.errorText}>{errors.description}</Text>
                        </View>
                        <View style={styles.input}>
                            <Text>Price:</Text>
                            <TextInput
                                onChangeText={handleChange('price')}
                                onBlur={handleBlur('price')}
                                value={values.price}
                                keyboardType="numeric"
                            />
                            <Text style={styles.errorText} >{errors.price}</Text>
                        </View>

                        <View style={styles.input}>
                            <View style={styles.pickImage}>
                                <Button title="Pick an image" onPress={pickImage} />
                                {image && <Image source={{ uri: image }} style={{ width: 305, height: 400, resizeMode: 'contain' }} />}
                            </View>
                        </View>
                        <View style={styles.button}>
                            <TouchableOpacity onPress={handleSubmit}>
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


