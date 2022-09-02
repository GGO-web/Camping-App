import React, { useState, useRef } from "react";
import { Animated, TouchableOpacity } from "react-native";
// import { TouchableOpacity } from "react-native-ui-lib/src/incubator";

import { globalStyles } from "../../styles/global";
import { ClipboardID } from "../common/ClipboardID";

import { Header } from "../Header/Header";

export const Home = () => {
   const [showMenu, setShowMenu] = useState(false);

   // Animated Properties...

   const offsetValue = useRef(new Animated.Value(0)).current;
   // Scale Intially must be One...
   const scaleValue = useRef(new Animated.Value(1)).current;

   return (
      <Animated.View
         style={{
            ...globalStyles.container,
            ...globalStyles.navcontainer,
            ...{
               transform: [{ scale: scaleValue }, { translateX: offsetValue }],
               borderRadius: showMenu ? 40 : 0,
            },
         }}
      >
         <TouchableOpacity
            activeOpacity={1}
            style={{ flex: 1 }}
            onPress={() => {
               setShowMenu(false);
            }}
         >
            <Header
               {...{
                  showMenu,
                  setShowMenu,
                  offsetValue,
                  scaleValue,
               }}
               title="Camping Trips"
            ></Header>
            <ClipboardID></ClipboardID>
         </TouchableOpacity>
      </Animated.View>
   );
};
