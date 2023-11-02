import { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Spinner } from "../components/Spinner";
import { useDispatch } from 'react-redux'
import { fetchDetails } from "../slice/detailsSlice";

function Details({ route }) {
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = route.params;
  
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      const response = await dispatch(fetchDetails(id)).unwrap()
      setPost(response);
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
