import { StyleSheet, Text } from "react-native";

export function Items({ post }) {
  return (
      <Text style={styles.text}>{post.title}</Text>
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
