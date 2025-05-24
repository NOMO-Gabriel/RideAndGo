import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { Link } from 'expo-router';
export default function Home() {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.text, { color: colors.text }]}>Bienvenue sur RideAndGo !</Text>
      <Link href={"/profile"}>Profile</Link>
      <Link href={"/home"}>Home</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 18 },
});
