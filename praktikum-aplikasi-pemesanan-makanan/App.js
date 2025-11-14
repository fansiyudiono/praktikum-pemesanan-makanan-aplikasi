import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';

export default function App() {
  const [pesanan, setPesanan] = useState([]);

  const menuMakanan = [
    { id: '1', nama: 'Nasi Goreng', harga: 20000, gambar: require('./assets/fried-chicken.png') },
    { id: '2', nama: 'Mie Ayam', harga: 15000, gambar: require('./assets/food.png') },
    { id: '3', nama: 'Sate Ayam', harga: 25000, gambar: require('./assets/satay.png') },
    { id: '4', nama: 'Bakso', harga: 18000, gambar: require('./assets/meatballs.png') },
    { id: '5', nama: 'Ayam Geprek', harga: 22000, gambar: require('./assets/fried-chicken.png') },
  ];

  const tambahPesanan = (item) => {
    const index = pesanan.findIndex((p) => p.id === item.id);
    if (index !== -1) {
      const updated = [...pesanan];
      updated[index].qty += 1;
      setPesanan(updated);
    } else {
      setPesanan([...pesanan, { ...item, qty: 1 }]);
    }
  };

  const kurangiPesanan = (item) => {
    const index = pesanan.findIndex((p) => p.id === item.id);
    if (index !== -1) {
      const updated = [...pesanan];
      if (updated[index].qty > 1) {
        updated[index].qty -= 1;
      } else {
        updated.splice(index, 1);
      }
      setPesanan(updated);
    }
  };

  const hitungTotal = () => {
    return pesanan.reduce((total, item) => total + item.harga * item.qty, 0);
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={item.gambar} style={styles.image} />
      <View style={{ flex: 1, marginLeft: 10 }}>
        <Text style={styles.nama}>{item.nama}</Text>
        <Text style={styles.harga}>Rp {item.harga.toLocaleString()}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => tambahPesanan(item)}>
        <Text style={styles.textButton}>Pesan</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
     <Text style={styles.header}>🏠 Rumah Makan Yudiono</Text>
      <Text style={styles.judul}>🍱 Daftar Menu Makanan</Text>
      <FlatList
        data={menuMakanan}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
      />
      <View style={styles.pesananBox}>
        <Text style={styles.subJudul}>🧾 Daftar Pesanan</Text>
        {pesanan.length > 0 ? (
          <>
            {pesanan.map((item) => (
              <View key={item.id} style={styles.row}>
                <Text style={styles.nama}>{item.nama}</Text>
                <View style={styles.qtyContainer}>
                  <TouchableOpacity onPress={() => kurangiPesanan(item)} style={styles.qtyButton}>
                    <Text style={styles.qtyText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.qtyValue}>{item.qty}</Text>
                  <TouchableOpacity onPress={() => tambahPesanan(item)} style={styles.qtyButton}>
                    <Text style={styles.qtyText}>+</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.harga}>Rp {(item.harga * item.qty).toLocaleString()}</Text>
              </View>
            ))}
            <View style={styles.totalBox}>
              <Text style={styles.totalText}>Total Harga:</Text>
              <Text style={styles.totalHarga}>Rp {hitungTotal().toLocaleString()}</Text>
            </View>
          </>
        ) : (
          <Text style={styles.pesananKosong}>Belum ada pesanan</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDF6EC',
    padding: 20,
  },
  judul: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2C3E50',
    textAlign: 'center',
  },
  subJudul: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#16A085',
  },
  item: {
    backgroundColor: '#FFF',
    padding: 10,
    marginVertical: 6,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  nama: {
    fontSize: 16,
    fontWeight: '600',
  },
  harga: {
    fontSize: 14,
    color: '#888',
  },
  button: {
    backgroundColor: '#2ECC71',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  textButton: {
    color: '#FFF',
    fontWeight: '600',
  },
  pesananBox: {
    marginTop: 20,
    backgroundColor: '#E8F8F5',
    padding: 15,
    borderRadius: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 6,
  },
  qtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  qtyButton: {
    backgroundColor: '#16A085',
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  qtyText: {
    color: '#FFF',
    fontSize: 16,
  },
  qtyValue: {
    marginHorizontal: 8,
    fontWeight: 'bold',
    fontSize: 16,
  },
  totalBox: {
    marginTop: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
    paddingTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalText: {
    fontWeight: '600',
    fontSize: 16,
  },
  totalHarga: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#E74C3C',
  },
  pesananKosong: {
    textAlign: 'center',
    color: '#999',
    marginTop: 10,
  },
});
