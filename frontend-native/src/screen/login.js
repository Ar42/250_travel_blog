import { useState } from "react";
import { Text, View, TextInput, StyleSheet } from "react-native";
import { Button } from "react-native-web";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {};
  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Registration</Text>

      <View style={styles.form}>
        <View style={styles.block}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Your Email"
            onChangeText={(newText) => setEmail(newText)}
            defaultValue={email}
          />
        </View>

        <View style={styles.block}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Your Password"
            onChangeText={(newText) => setPassword(newText)}
            defaultValue={password}
          />
        </View>

        <Button
          onPress={handleSubmit}
          title="Register"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: "20px",
  },
  form: {
    backgroundColor: "#ececec",
    padding: "8px",
  },
  h1: {
    fontSize: "18px",
    lineHeight: "28px",
    fontWeight: 700,
    marginVertical: "10px",
  },
  label: {
    fontSize: "14px",
    lineHeight: "20px",
    fontWeight: "500px",
    marginBottom: "2px",
  },
  block: {
    marginBottom: "10px",
  },
  input: {
    borderBottomColor: "red",
    borderBottomWidth: "1px",
  },
});
