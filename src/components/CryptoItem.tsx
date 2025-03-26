import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

type CryptoItemProps = {
  id: number;
  name: string;
  ticker: string;
  purchase_price: number;
  purchase_quantity: number;
  invested_amount: number;
  onEdit: () => void;
  onDelete: () => void;
};

const CryptoItem: React.FC<CryptoItemProps> = ({
  name,
  ticker,
  purchase_price,
  purchase_quantity,
  invested_amount,
  onEdit,
  onDelete,
}) => {
  return (
    <View style={styles.cryptoItem}>
      <View>
        <Text style={styles.itemText}>Nombre: {name || 'N/A'}</Text>
        <Text style={styles.itemText}>Ticker: {ticker || 'N/A'}</Text>
        <Text style={styles.itemText}>
          Precio de compra: ${parseFloat(purchase_price.toString() || '0').toFixed(2)}
        </Text>
        <Text style={styles.itemText}>Cantidad: {purchase_quantity || 0}</Text>
        <Text style={styles.itemText}>
          Monto invertido: ${parseFloat(invested_amount.toString() || '0').toFixed(2)}
        </Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={onEdit} style={styles.actionButton}>
          <Icon name="edit" size={20} color="#4CAF50" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete} style={styles.actionButton}>
          <Icon name="trash" size={20} color="#F44336" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cryptoItem: {
    backgroundColor: '#f9f9f9',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  itemText: {
    fontSize: 16,
    marginBottom: 4,
  },
  actions: {
    flexDirection: 'row',
  },
  actionButton: {
    marginLeft: 10,
  },
});

export default CryptoItem;