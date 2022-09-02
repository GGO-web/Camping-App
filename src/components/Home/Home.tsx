import React from "react";
import { Text, View } from "react-native-ui-lib";

import { useAppSelector } from "../../redux/hooks";
import { userSelector } from "../../redux/userConfig/userSlice";
import { globalStyles } from "../../styles/global";
import { ClipboardID } from "../common/ClipboardID";

import { Header } from "../Header/Header";

export const Home = () => {
   const user = useAppSelector(userSelector);

   return (
      <View style={{ ...globalStyles.container, ...globalStyles.navcontainer }}>
         <Header title="Camping Trips"></Header>
         <ClipboardID></ClipboardID>
      </View>
   );
};
