import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, FlatList, TouchableOpacity, RefreshControl } from "react-native";
import { useEffect, useRef, useState } from "react";
import { Items } from "../components/Items";
import { Spinner } from "../components/Spinner";
import { useDispatch } from 'react-redux'
import { fetchPosts } from "../slice/postsSlice";

function Main({ navigation }) {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [lastRefreshTime, setLastRefreshTime] = useState(0);

  const dispatch = useDispatch();
  
  const fetchData = async () => {
    try {
      const response = await dispatch(fetchPosts()).unwrap();
      setList(response);
      setLoading(false);
      setRefresh(false);
      setLastRefreshTime(Date.now());
    } catch (error) {
      console.log(error);
      setLoading(false);
      setRefresh(false);
    }
  };

  const onPull = () => {
    if (!refresh && Date.now() - lastRefreshTime > 15000) {
      setRefresh(true);
      fetchData();
    }
  };

  const handleScroll = () => {
    clearInterval(intervalRef.current);
  };

  const intervalRef = useRef(null);

  useEffect(() => {
    fetchData();
    setLastRefreshTime(Date.now());

    intervalRef.current = setInterval(fetchData, 60000);

    return () => {
      clearInterval(intervalRef.current);
    };

  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {

      if (Date.now() - lastRefreshTime > 15000) {
        onPull();
      }
    });

    return unsubscribe;
  }, [navigation, lastRefreshTime]);

  return (
    <View style={styles.main}>
      {loading ? (
        <Spinner />
      ) : (
        <FlatList
        data={list.slice(0, 25)}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={styles.item}
                onPress={() => navigation.navigate("Details", { id: item.id })}
              >
                <Items post={item} />
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item.id.toString()}
          refreshControl={
            <RefreshControl 
            refreshing={refresh}
            onRefresh={onPull}/>
          }
          onScrollBeginDrag={handleScroll}
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
