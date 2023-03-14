import { StyleSheet, Text, View, FlatList, Pressable } from "react-native";

import { useMutation, useQuery } from "react-query";
import axios from "axios";

const Blogs = ({ navigation }) => {
  //getting all blogs
  const { data, isLoading, isError } = useQuery("blogs", () => {
    return axios.get("http://192.168.0.5:8000/api/posts/");
  });

  //delete a blog (CORS ERROR)
  const deletePost = () => {
    const postId = "63a0b80702fddd87de968822";
    return axios.delete(
      `http://192.168.0.5:8000/api/posts/63a0b80702fddd87de968822`
    );
  };

  const useDeletePost = () => {
    return useMutation(deletePost);
  };

  const { mutate } = useDeletePost();

  const handleDelete = (id) => {
    mutate();
    console.log("first", id);
  };

  if (isError) {
    return <Text style={styles.h1}>Error</Text>;
  }

  if (isLoading) {
    return <Text style={styles.h1}>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      {/* Featured blogs */}
      <Text style={styles.h1}>Featured News</Text>

      <FlatList
        keyExtractor={(key) => {
          return key.roll;
        }}
        horizontal={true}
        data={data?.data?.data}
        renderItem={(element) => {
          if (element.item.isFeatured) {
            return (
              <View style={styles.cardFeatured}>
                <Text style={styles.title}>{element.item.title}aaaa</Text>
                <Text style={styles.description}>
                  {element.item.description}
                </Text>

                <Pressable
                  style={styles.button}
                  onPress={() => {
                    navigation.navigate("Blog Details", {
                      newsId: `${element.item._id}`,
                    });
                  }}
                >
                  <Text style={styles.buttonText}>view details</Text>
                </Pressable>
              </View>
            );
          }
        }}
      />

      {/* general blogs */}
      <Text style={styles.h1}>All News</Text>

      <FlatList
        keyExtractor={(key) => {
          return key.roll;
        }}
        data={data?.data?.data}
        renderItem={(element) => {
          if (!element.item.isFeatured) {
            return (
              <View style={styles.card} key={element.item._id}>
                <Text style={styles.title}>{element.item.title}</Text>
                <Text style={styles.description}>
                  {element.item.description}
                </Text>

                <Pressable
                  style={styles.button}
                  onPress={() => {
                    navigation.navigate("Blog Details", {
                      newsId: `${element.item._id}`,
                    });
                  }}
                >
                  <Text style={styles.buttonText}>view details</Text>
                </Pressable>
              </View>
            );
          }
        }}
      />
    </View>
  );
};

export default Blogs;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    minHeight: "100vh",
  },

  button: {
    backgroundColor: "green",
    paddingVertical: 4,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600px",
  },

  h1: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: "600px",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 8,
    color: "#fff",
  },

  title: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600px",
    color: "#fff",
    marginBottom: 8,
  },

  description: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "500px",
    color: "#fff",
    marginBottom: 16,
  },
  card: {
    marginBottom: 20,
    backgroundColor: "#1E1E1E",
    padding: 10,
    paddingBottom: 0,
  },

  cardFeatured: {
    margin: 20,
    borderRadius: 8,
    backgroundColor: "#1E1E1E",
    padding: 16,
    width: 300,
    borderColor: "#fff",
    borderWidth: 0.5,
  },

  timeToRead: {
    fontSize: 10,
    lineHeight: 16,
    fontWeight: "500px",
    marginBottom: 2,
  },

  address: {
    fontSize: 10,
    lineHeight: 16,
    fontWeight: "500px",
    fontStyle: "italic",
    marginBottom: 8,
  },
});
