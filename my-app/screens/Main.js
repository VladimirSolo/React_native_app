import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, FlatList, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { Items } from "../components/Items";
import { Spinner } from "../components/Spinner";

function Main({ navigation }) {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      let response = await fetch("https://jsonplaceholder.typicode.com/users");
      const result = await response.json();
      setList(result);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.main}>
      {loading ? (
        <Spinner />
      ) : (
        <FlatList
          data={list}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={styles.item}
                onPress={() => navigation.navigate("Details", { id: item.id })}
              >
                <Items element={item} />
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "yellow",
  },
  item: {
    paddingLeft: 20,
    paddingRight: 20,
  },
});

export default Main;
