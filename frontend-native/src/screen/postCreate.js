import { useMutation } from "react-query";
import { useState } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  CheckBox,
  Pressable,
} from "react-native";

// import CheckBox from "@react-native-community/checkbox";

import axios from "axios";

const PostCreate = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [timeToRead, setTimeToRead] = useState(0);
  const [isFeatured, setIsFeatured] = useState(false);

  const addPost = (post) => {
    return axios.post("http://192.168.0.107:8000/api/posts", post);
  };

  const useAddPost = () => {
    return useMutation(addPost, {
      onSuccess: () => {
        queryClient.invalidateQueries("blogs");
        setTitle("");
        setDescription("");
        setCity("");
        setAddress("");
        setTimeToRead(0);
        setIsFeatured(false);
      },
    });
  };

  const { mutate } = useAddPost();

  const handleSubmit = () => {
    console.log({ title, description, city, address, timeToRead, isFeatured });
    const postData = { title, description, city, address, timeToRead };

    if (title !== "" && description !== "" && city !== "" && address) {
      mutate(postData);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Create Post</Text>
      <View style={styles.form}>
        <View style={styles.block}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            // placeholder="Title"
            onChangeText={(newText) => setTitle(newText)}
            defaultValue={title}
          />
        </View>

        <View style={styles.block}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            // placeholder="Enter Your Des"
            onChangeText={(newText) => setDescription(newText)}
            defaultValue={description}
          />
        </View>

        <View style={styles.block}>
          <Text style={styles.label}>City</Text>
          <TextInput
            style={styles.input}
            // placeholder="Enter Your City"
            onChangeText={(newText) => setCity(newText)}
            defaultValue={city}
          />
        </View>

        <View style={styles.block}>
          <Text style={styles.label}>Address</Text>
          <TextInput
            style={styles.input}
            // placeholder="Enter Your Address"
            onChangeText={(newText) => setAddress(newText)}
            defaultValue={address}
          />
        </View>

        <View style={styles.block}>
          <Text style={styles.label}>Time to read</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Your Password"
            onChangeText={(newText) => setTimeToRead(newText)}
            defaultValue={timeToRead}
          />
        </View>

        <View style={styles.checkboxContainer}>
          <CheckBox
            value={isFeatured}
            onValueChange={setIsFeatured}
            style={styles.checkbox}
          />
          <Text style={styles.label}>Feature post?</Text>
        </View>

        <Pressable style={styles.buttonCreate} onPress={handleSubmit}>
          <Text style={styles.buttonTextCreate}>create post</Text>
        </Pressable>

        <Pressable
          style={styles.buttonView}
          onPress={() => {
            navigation.navigate("Blogs");
          }}
        >
          <Text style={styles.buttonTextView}>view all post</Text>
        </Pressable>
      </View>
      buttonTextCreate:{},
    </View>
  );
};

export default PostCreate;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    minHeight: "100vh",
  },
  form: {
    padding: 8,
  },

  buttonCreate: {
    backgroundColor: "green",
    textAlign: "center",
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600px",
    paddingVertical: 4,
    marginTop: 10,
  },

  buttonView: {
    backgroundColor: "#fff",

    paddingVertical: 4,
    marginTop: 10,
  },

  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
    gap: 6,
  },
  checkbox: {
    alignSelf: "center",
  },

  buttonTextCreate: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600px",
  },

  buttonTextView: {
    color: "#000",
    textAlign: "center",
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600px",
  },

  h1: {
    marginTop: 20,
    fontSize: 24,
    lineHeight: 32,
    fontWeight: 700,
    marginVertical: 10,
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "500px",
    marginVertical: 6,
    color: "#fff",
  },
  block: {
    marginBottom: 10,
  },
  input: {
    borderBottomColor: "#fff",
    borderBottomWidth: 1,
    color: "#fff",
  },
});
