import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/core'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Button, Image, Alert } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { firebase, getDownloadURL, getStorage, ref } from '../../../firebase';
import { COLORS } from '../../constants';


export default AddProduct = () => {
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
    <KeyboardAvoidingView
      style={styles.container}
    >
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <MaterialCommunityIcons name="chevron-left" style={{
          fontSize: 20,
          color: COLORS.black,
          padding: 12,
          marginTop: 5,
          backgroundColor: COLORS.white,
          borderRadius:  12,
          position: 'absolute',
          left: -200,
          top: -200,
        }} />
      </TouchableOpacity>
      <View style={{ flex: 1, alignItems:"center", marginTop:60 }}>
        <Button title="Pick an image" onPress={pickImage} />
        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        {url && <Image source={{ uri: url }} style={{ width: 200, height: 200 }} />}
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Title"
          value={title}
          onChangeText={text => setTitle(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="price"
          value={price}
          onChangeText={text => setPrice(text)}
          style={styles.input}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={uploadImage}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%'
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 40,
  },
  button: {
    backgroundColor: COLORS.secondary,
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: COLORS.primary,
    fontWeight: '700',
    fontSize: 16,
  },
})

