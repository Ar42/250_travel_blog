import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { QueryClientProvider, QueryClient } from "react-query";

import PostCreate from "./src/screen/postCreate";
import BlogDetails from "./src/screen/blogDetails";
import Blogs from "./src/screen/Blogs";

export default function App() {
  const Stack = createNativeStackNavigator();
  const queryClient = new QueryClient();

  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <View style={styles.container}>
          {/* <Stack.Navigator initialRouteName="Blog Details"> */}
          <Stack.Navigator initialRouteName="Post Create">
            <Stack.Screen name="Post Create" component={PostCreate} />
            <Stack.Screen name="Blogs" component={Blogs} />
            <Stack.Screen name="Blog Details" component={BlogDetails} />
          </Stack.Navigator>
        </View>
      </QueryClientProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: "#000",
  },
});
