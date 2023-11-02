import { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Spinner } from "../components/Spinner";

function Details({ route }) {
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = route.params;

  const fetchData = async () => {
    try {
      let response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      );
      const result = await response.json();
      setPost(result);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <View style={styles.details}>
      <Text>{post.body}</Text>
    </View>
  );
}

export default Details;

const styles = StyleSheet.create({
  details: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
  },
});
