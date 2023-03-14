import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Button,
  FlatList,
} from "react-native";
import axios from "axios";

const BlogDetails = ({ route }) => {
  // const BlogDetails = () => {
  const { newsId } = route.params;
  // const newsId = "63a0b80702fddd87de968822";

  const queryClient = useQueryClient();

  const [comment, setComment] = useState("");

  const { data, isLoading, isError } = useQuery("single-blog", () => {
    return axios.get(`http://192.168.0.5:8000/api/posts/${newsId}`);
  });

  const addComment = (comment) => {
    return axios.post(
      `http://192.168.0.107:8000/api/comments/${newsId}`,
      comment
    );
  };

  const useAddComment = () => {
    return useMutation(addComment, {
      onSuccess: () => {
        queryClient.invalidateQueries("single-blog");
      },
    });
  };

  const { mutate: mutateAddComment } = useAddComment();

  const handleSubmit = () => {
    const commentData = { comment };
    mutateAddComment(commentData);
    setComment("");
  };

  if (isError) {
    return <Text style={styles.h1}>Error</Text>;
  }

  if (isLoading) {
    return <Text style={styles.h1}>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{data?.data?.data?.title}</Text>
      <Text style={styles.timeToRead}>
        Time to read : {data?.data?.data?.timeToRead}
      </Text>
      <Text style={styles.description}>{data?.data?.data?.description}</Text>
      <Text style={styles.address}>
        {data?.data?.data?.address}, {data?.data?.data?.city}
      </Text>

      <View style={styles.block}>
        <Text style={styles.label}>Write you comment</Text>
        <TextInput
          style={styles.input}
          onChangeText={(newText) => setComment(newText)}
          defaultValue={comment}
        />
      </View>

      <Button
        onPress={handleSubmit}
        title="comment"
        color="green"
        accessibilityLabel="Learn more about this purple button"
      />

      <FlatList
        keyExtractor={(key) => {
          return key.roll;
        }}
        data={data?.data?.data?.comments}
        renderItem={(element) => {
          return (
            <View>
              <Text style={styles.commentList}>{element.item.data}</Text>
            </View>
          );
        }}
      />
    </View>
  );
};

export default BlogDetails;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    minHeight: "100vh",
    padding: 16,
  },

  h1: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600px",
    marginBottom: 8,
    color: "#fff",
  },

  title: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: "600px",
    color: "#fff",
    textAlign: "center",
  },

  description: {
    fontSize: 18,
    lineHeight: 28,
    fontWeight: "400px",
    marginBottom: 2,
    color: "#fff",
  },

  timeToRead: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "500px",
    marginBottom: 2,
    color: "#fff",
  },

  address: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "500px",
    fontStyle: "italic",
    marginBottom: 8,
    color: "#fff",
  },

  input: {
    borderColor: "#fff",
    borderWidth: 1.5,
    paddingHorizontal: 5,
    paddingVertical: 8,
    marginVertical: 10,
    color: "#fff",
  },

  commentList: {
    backgroundColor: "#fff",
    color: "#000",
    width: "90vw",
    marginVertical: 5,
    fontWeight: "600px",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderTopStartRadius: 10,
    borderBottomEndRadius: 10,
  },
});
