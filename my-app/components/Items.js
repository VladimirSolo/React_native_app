import { StyleSheet, Text } from "react-native";

export function Items({ element }) {
  return (
      <Text style={styles.text}>{element.username}</Text>
  );
}

const styles = StyleSheet.create({
  text: {
    padding: 20,
    textAlign: "center",
    borderRadius: 5,
    borderWidth: 1,
    marginTop: 20,
  }
});
