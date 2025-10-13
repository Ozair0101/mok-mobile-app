import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const OrdersScreen: React.FC = () => {
  // Mock orders data
  const [orders] = React.useState([
    {
      id: '1',
      orderNumber: 'ORD-001',
      status: 'DELIVERED',
      total: 179.98,
      date: '2024-01-15',
      items: [
        { name: 'Wireless Headphones', quantity: 1, price: 99.99 },
        { name: 'Bluetooth Speaker', quantity: 1, price: 79.99 },
      ],
    },
    {
      id: '2',
      orderNumber: 'ORD-002',
      status: 'SHIPPED',
      total: 249.99,
      date: '2024-01-10',
      items: [
        { name: 'Smart Watch', quantity: 1, price: 249.99 },
      ],
    },
    {
      id: '3',
      orderNumber: 'ORD-003',
      status: 'PROCESSING',
      total: 89.99,
      date: '2024-01-08',
      items: [
        { name: 'Phone Case', quantity: 2, price: 44.99 },
      ],
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'DELIVERED':
        return '#4CAF50';
      case 'SHIPPED':
        return '#2196F3';
      case 'PROCESSING':
        return '#FF9800';
      case 'PENDING':
        return '#9E9E9E';
      case 'CANCELLED':
        return '#F44336';
      default:
        return '#9E9E9E';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'DELIVERED':
        return '✅';
      case 'SHIPPED':
        return '🚚';
      case 'PROCESSING':
        return '⏳';
      case 'PENDING':
        return '⏸️';
      case 'CANCELLED':
        return '❌';
      default:
        return '❓';
    }
  };

  const handleOrderPress = (order: any) => {
    Alert.alert(
      'Order Details',
      `Order: ${order.orderNumber}\nStatus: ${order.status}\nTotal: $${order.total.toFixed(2)}\nDate: ${order.date}`,
      [{ text: 'OK' }]
    );
  };

  const handleTrackOrder = (order: any) => {
    Alert.alert(
      'Track Order',
      `Tracking functionality will be implemented for order ${order.orderNumber}`,
      [{ text: 'OK' }]
    );
  };

  const renderOrderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.orderItem}
      onPress={() => handleOrderPress(item)}
    >
      <View style={styles.orderHeader}>
        <View style={styles.orderInfo}>
          <Text style={styles.orderNumber}>{item.orderNumber}</Text>
          <Text style={styles.orderDate}>{item.date}</Text>
        </View>
        <View style={styles.orderStatus}>
          <Text style={styles.statusIcon}>{getStatusIcon(item.status)}</Text>
          <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
            {item.status}
          </Text>
        </View>
      </View>

      <View style={styles.orderItems}>
        {item.items.map((orderItem: any, index: number) => (
          <Text key={index} style={styles.orderItemText}>
            {orderItem.name} x{orderItem.quantity} - ${orderItem.price.toFixed(2)}
          </Text>
        ))}
      </View>

      <View style={styles.orderFooter}>
        <Text style={styles.orderTotal}>Total: ${item.total.toFixed(2)}</Text>
        {item.status === 'SHIPPED' && (
          <TouchableOpacity
            style={styles.trackButton}
            onPress={() => handleTrackOrder(item)}
          >
            <Text style={styles.trackButtonText}>Track</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyStateIcon}>📦</Text>
      <Text style={styles.emptyStateTitle}>No orders yet</Text>
      <Text style={styles.emptyStateSubtitle}>
        Your order history will appear here
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Orders</Text>
        <Text style={styles.orderCount}>
          {orders.length} {orders.length === 1 ? 'order' : 'orders'}
        </Text>
      </View>

      {orders.length === 0 ? (
        renderEmptyState()
      ) : (
        <FlatList
          data={orders}
          renderItem={renderOrderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      )}
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
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
  },
  orderCount: {
    fontSize: 14,
    color: '#666666',
  },
  listContainer: {
    padding: 20,
    paddingTop: 10,
  },
  orderItem: {
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  orderInfo: {
    flex: 1,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  orderDate: {
    fontSize: 14,
    color: '#666666',
  },
  orderStatus: {
    alignItems: 'center',
  },
  statusIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  orderItems: {
    marginBottom: 12,
  },
  orderItemText: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 2,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  trackButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  trackButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyStateIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  emptyStateSubtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 24,
  },
});
