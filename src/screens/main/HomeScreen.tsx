import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export const HomeScreen: React.FC = () => {
  const featuredProducts = [
    {
      id: '1',
      title: 'Wireless Headphones',
      price: 99.99,
      salePrice: 79.99,
      image: 'https://via.placeholder.com/200x200',
      rating: 4.5,
    },
    {
      id: '2',
      title: 'Smart Watch',
      price: 299.99,
      salePrice: 249.99,
      image: 'https://via.placeholder.com/200x200',
      rating: 4.8,
    },
    {
      id: '3',
      title: 'Bluetooth Speaker',
      price: 149.99,
      image: 'https://via.placeholder.com/200x200',
      rating: 4.3,
    },
  ];

  const categories = [
    { id: '1', name: 'Electronics', image: 'https://via.placeholder.com/150x150' },
    { id: '2', name: 'Clothing', image: 'https://via.placeholder.com/150x150' },
    { id: '3', name: 'Home & Garden', image: 'https://via.placeholder.com/150x150' },
    { id: '4', name: 'Sports', image: 'https://via.placeholder.com/150x150' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>E-commerce</Text>
          <TouchableOpacity style={styles.searchButton}>
            <Text style={styles.searchIcon}>🔍</Text>
          </TouchableOpacity>
        </View>

        {/* Hero Banner */}
        <View style={styles.heroBanner}>
          <Image
            source={{ uri: 'https://via.placeholder.com/400x200' }}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <View style={styles.heroOverlay}>
            <Text style={styles.heroTitle}>Summer Sale</Text>
            <Text style={styles.heroSubtitle}>Up to 50% off on selected items</Text>
            <TouchableOpacity style={styles.heroButton}>
              <Text style={styles.heroButtonText}>Shop Now</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}
          >
            {categories.map((category) => (
              <TouchableOpacity key={category.id} style={styles.categoryItem}>
                <Image
                  source={{ uri: category.image }}
                  style={styles.categoryImage}
                />
                <Text style={styles.categoryName}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Featured Products */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Products</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.productsContainer}
          >
            {featuredProducts.map((product) => (
              <TouchableOpacity key={product.id} style={styles.productItem}>
                <Image
                  source={{ uri: product.image }}
                  style={styles.productImage}
                />
                <Text style={styles.productTitle} numberOfLines={2}>
                  {product.title}
                </Text>
                <View style={styles.productPriceContainer}>
                  {product.salePrice && (
                    <Text style={styles.productSalePrice}>
                      ${product.salePrice}
                    </Text>
                  )}
                  <Text style={[
                    styles.productPrice,
                    product.salePrice && styles.productPriceCrossed
                  ]}>
                    ${product.price}
                  </Text>
                </View>
                <View style={styles.productRating}>
                  <Text style={styles.ratingText}>⭐ {product.rating}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsContainer}>
            <TouchableOpacity style={styles.quickActionItem}>
              <Text style={styles.quickActionIcon}>🛒</Text>
              <Text style={styles.quickActionText}>My Cart</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionItem}>
              <Text style={styles.quickActionIcon}>📦</Text>
              <Text style={styles.quickActionText}>Orders</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionItem}>
              <Text style={styles.quickActionIcon}>❤️</Text>
              <Text style={styles.quickActionText}>Wishlist</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionItem}>
              <Text style={styles.quickActionIcon}>👤</Text>
              <Text style={styles.quickActionText}>Profile</Text>
            </TouchableOpacity>
          </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
  },
  searchButton: {
    padding: 8,
  },
  searchIcon: {
    fontSize: 24,
  },
  heroBanner: {
    height: 200,
    margin: 20,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#ffffff',
    marginBottom: 16,
    textAlign: 'center',
  },
  heroButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  heroButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  categoriesContainer: {
    paddingHorizontal: 20,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 20,
    width: 80,
  },
  categoryImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
  },
  productsContainer: {
    paddingHorizontal: 20,
  },
  productItem: {
    width: 160,
    marginRight: 16,
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    padding: 12,
  },
  productImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
    lineHeight: 18,
  },
  productPriceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
  },
  productPriceCrossed: {
    textDecorationLine: 'line-through',
    color: '#999999',
    marginLeft: 8,
    fontWeight: 'normal',
  },
  productSalePrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  productRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    color: '#666666',
  },
  quickActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },
  quickActionItem: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    minWidth: 80,
  },
  quickActionIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  quickActionText: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
  },
});
