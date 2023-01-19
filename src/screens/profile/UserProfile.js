import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, Image, TouchableOpacity, StyleSheet, AsyncStorage } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, assets } from '../../constants';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default UserProfile = ({ navigation }) => {
  const [user, setUser] = useState({
    name: 'Ketema',
    profile_picture: 'assets/images/person01.png',
    email: 'kgirma363@gmail.com',
  });

  useEffect(() => {
    const getUser = async () => {
      const userData = await AsyncStorage.getItem('userData');
      setUser(JSON.parse(userData));
    }
    getUser();
  }, [])

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userData');
    navigation.navigate('Auth');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Image
            source={assets.person04}
            style={styles.profileImage}
          />
          <View style={styles.editProfile}>
            <MaterialCommunityIcons name="account-edit-outline" size={24} color="black" />
          </View>
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.nameText}>Ohana Ketema</Text>
          <Text style={styles.emailText}>kgirma363@gmail.com</Text>
        </View>
        <TouchableOpacity onPress={handleLogout}>
          <Ionicons name="ios-log-out" size={24} color="#777" style={styles.logoutButton} />
        </TouchableOpacity>
      </View>
      <View style={styles.orderContainer}>
        <View style={styles.orderHistory}>
          <Text style={styles.orderHistoryText}>Order History</Text>
            <FlatList
              data={[{ orderNumber: "12", date: "1/19/2023", total: 234 }]}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => navigate('OrderDetails', { order: item })}>
                  <View style={styles.orderSubContainer}>
                    <Text style={styles.orderNumber}>Order Number: {item.orderNumber}</Text>
                    <Text style={styles.orderDate}>Date: {item.date}</Text>
                    <Text style={styles.orderTotal}> Total: {item.total}</Text>
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.orderNumber}
            />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  orderContainer: {
    flex: 1,
    padding: 30,
    backgroundColor: '#fafafa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    backgroundColor: COLORS.primary,
    padding: SIZES.font,
    height: 160,
  },
  editProfile: {
    position: 'absolute',
    top: 65,
    left: 25,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 30,
    height: 30,
    backgroundColor: COLORS.white,
    borderRadius: 40,

  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 10,
  },
  userInfo: {
    flex: 1,
  },
  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: COLORS.white,

  },
  emailText: {
    fontSize: 14,
    color: '#777',
  },
  logoutButton: {
    padding: 10,
  },
  orderHistory: {
    marginTop: 20,
  },
  orderHistoryText: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  orderContainer: {
    flex: 1,
    padding: 10,
  },
  orderSubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    margin: 5,
    backgroundColor: '#F5F5F5',
    borderRadius: 5,
  },
  orderNumber: {
    fontWeight: 'bold',
    marginRight: 10,
  },
  orderDate: {
    color: 'gray',
  },
});