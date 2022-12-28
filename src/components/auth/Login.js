import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/core'
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "../../../firebase"

import { COLORS } from '../../constants';


const Login = () => {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigation = useNavigation()

  useEffect(() => {
    //   const unsubscribe = auth.onAuthStateChanged(user => {
    if (isUserAuthenticated) {
      navigation.replace("Home")
    }
    // })
    //   return unsubscribe
  }, [isUserAuthenticated])

  const handleSignUp = async () => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password)
      console.log(res)
    } catch (error) {
      alert(error.message)
    }
  }

  const handleLogin = async () => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      console.log('loged in successfully!!');
      setIsUserAuthenticated(true)
    } catch (error) {
      alert(error.message)
    }
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
          borderRadius: 12,
          position:'absolute',
          left: -200,
          top: -200,
        }} />
      </TouchableOpacity>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleLogin}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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
  },
  button: {
    backgroundColor: '#0782F9',
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
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
  },
})

export default Login