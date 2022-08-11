import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { registerRootComponent } from "expo";

export default function App() {
   return (
      <View style={styles.container}>
         <Text>Testing App.tsx on android studio asd</Text>
         <StatusBar style="auto" />
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      paddingVertical: 100,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "flex-start",
   },
});

registerRootComponent(App);
