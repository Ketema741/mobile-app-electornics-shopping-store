import React, { useEffect, useContext } from 'react'
import { useNavigation } from '@react-navigation/core'
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

import { Formik } from 'formik';
import * as yup from 'yup';

import { COLORS } from '../../constants';
import LoginHeader from '../layouts/LoginHeader';
import AuthContext from '../../context/auth/authContext';


const Login = () => {

  const authContext = useContext(AuthContext)
  const { isUserAuthenticated, userLogin } = authContext

  const navigation = useNavigation()

  useEffect(() => {
    if (isUserAuthenticated) {
      navigation.goBack()
    }
    
  }, [isUserAuthenticated])


  return (

    <KeyboardAvoidingView style={styles.container} >
      <LoginHeader />
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <MaterialCommunityIcons name="chevron-left" style={{
          fontSize: 20,
          color: COLORS.black,
          padding: 12,
          marginTop: 5,
          backgroundColor: COLORS.white,
          borderRadius: 50,
          position: 'absolute',
          left: 30,
          top: -150,
        }} />
      </TouchableOpacity>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={yup.object().shape({
          email: yup.string()
            .email('Invalid email address')
            .required('Email is required'),
          password: yup.string()
            .min(8, 'Password must be at least 8 characters')
            .required('Password is required'),
        })}

        onSubmit={(values) => {
          userLogin(values)
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <>
            <View style={styles.inputContainer}>
              <Text style={styles.loginHeader}>
                Login To TechTronix
              </Text>
              <TextInput
                placeholder="Email"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                style={styles.input}
              />
              <Text style={styles.errorText} >{errors.email}</Text>
              <TextInput
                placeholder="Password"
                style={styles.input}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                secureTextEntry
              />
              <Text style={styles.errorText}>{errors.password}</Text>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={handleSubmit}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={()=>navigation.navigate('Register')}
                style={[styles.button, styles.buttonOutline]}
              >
                <Text style={styles.buttonOutlineText}>Register</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </KeyboardAvoidingView >
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    width: '80%',
    marginLeft: 30,
    marginTop: 50,
  },
  loginHeader: {
    color: COLORS.primary,
    fontWeight: '700',
    fontSize: 18,
    margin: 20,
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  errorText: {
    color: 'red',
  },
  buttonContainer: {
    width: '60%',
    marginLeft: 60,
    marginTop: 40,
    justifyContent: 'center',
  },
  button: {
    backgroundColor: COLORS.primary,
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: COLORS.primary,
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

export default Login