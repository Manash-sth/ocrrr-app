import { StyleSheet, Text, View } from 'react-native';
import Home from './screens/Home';

export default function App() {
  return (
 <View style={styles.container}>
 <Home/>
 </View>
  );
 }
 
 const styles = StyleSheet.create({
  container: {
    paddingTop:50,
    backgroundColor: '#02182A',
  },
 });