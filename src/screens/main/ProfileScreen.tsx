import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { logoutUser } from '../../store/slices/authSlice';

export const ProfileScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => dispatch(logoutUser()),
        },
      ]
    );
  };

  const handleEditProfile = () => {
    Alert.alert('Edit Profile', 'Profile editing functionality will be implemented.');
  };

  const handleAddresses = () => {
    Alert.alert('Addresses', 'Address management functionality will be implemented.');
  };

  const handlePaymentMethods = () => {
    Alert.alert('Payment Methods', 'Payment method management will be implemented.');
  };

  const handleNotifications = () => {
    Alert.alert('Notifications', 'Notification settings will be implemented.');
  };

  const handleSupport = () => {
    Alert.alert('Support', 'Customer support functionality will be implemented.');
  };

  const handleAbout = () => {
    Alert.alert(
      'About',
      'E-commerce Mobile App\nVersion 1.0.0\n\nBuilt with React Native and Expo',
      [{ text: 'OK' }]
    );
  };

  const menuItems = [
    {
      id: 'edit-profile',
      title: 'Edit Profile',
      icon: '👤',
      onPress: handleEditProfile,
    },
    {
      id: 'addresses',
      title: 'Addresses',
      icon: '📍',
      onPress: handleAddresses,
    },
    {
      id: 'payment-methods',
      title: 'Payment Methods',
      icon: '💳',
      onPress: handlePaymentMethods,
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: '🔔',
      onPress: handleNotifications,
    },
    {
      id: 'support',
      title: 'Support',
      icon: '🆘',
      onPress: handleSupport,
    },
    {
      id: 'about',
      title: 'About',
      icon: 'ℹ️',
      onPress: handleAbout,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>

        {/* User Info */}
        <View style={styles.userInfoContainer}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </Text>
          </View>
          <Text style={styles.userName}>{user?.name || 'User'}</Text>
          <Text style={styles.userEmail}>{user?.email || 'user@example.com'}</Text>
          <Text style={styles.userRole}>
            {user?.role === 'ADMIN' ? 'Administrator' : 
             user?.role === 'SELLER' ? 'Seller' : 'Customer'}
          </Text>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={item.onPress}
            >
              <View style={styles.menuItemLeft}>
                <Text style={styles.menuItemIcon}>{item.icon}</Text>
                <Text style={styles.menuItemTitle}>{item.title}</Text>
              </View>
              <Text style={styles.menuItemArrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Button */}
        <View style={styles.logoutContainer}>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
          >
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appInfoText}>
            E-commerce Mobile App v1.0.0
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    padding: 20,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
  },
  userInfoContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F9F9F9',
    margin: 20,
    borderRadius: 16,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 8,
  },
  userRole: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  menuContainer: {
    margin: 20,
    backgroundColor: '#F9F9F9',
    borderRadius: 16,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemIcon: {
    fontSize: 20,
    marginRight: 16,
  },
  menuItemTitle: {
    fontSize: 16,
    color: '#333333',
    fontWeight: '500',
  },
  menuItemArrow: {
    fontSize: 20,
    color: '#666666',
  },
  logoutContainer: {
    padding: 20,
  },
  logoutButton: {
    backgroundColor: '#FF6B6B',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  appInfo: {
    alignItems: 'center',
    padding: 20,
    paddingBottom: 40,
  },
  appInfoText: {
    fontSize: 14,
    color: '#999999',
  },
});
