import { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Spinner } from "../components/Spinner";

function Details({ route, navigation }) {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = route.params;

  const fetchData = async () => {
    try {
      let response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${id}`
      );
      const result = await response.json();
      setUser(result);
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
      <Text>NAME: {user.name}</Text>
      <Text>EMAIL: {user.email}</Text>
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
