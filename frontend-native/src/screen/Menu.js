import { Text, View } from "react-native";
import { NativeRouter, Route, Link } from "react-router-native";
import Custom from "./Custom";

const Menu = () => {
  return (
    <NativeRouter>
      <View>
        <View>
          {/* <Link to="/" underlayColor="#f0f4f7" style={styles.navItem}>
              <Text>Home</Text>
            </Link> */}
          <Link to="/custom" underlayColor="#f0f4f7">
            <Text>Custom</Text>
          </Link>
        </View>

        {/* <Route exact path="/" component={Home} /> */}
        <Route path="/custom" component={Custom} />
      </View>
    </NativeRouter>
  );
};

export default Menu;
