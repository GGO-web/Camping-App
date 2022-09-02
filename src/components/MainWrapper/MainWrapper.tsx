import React, { useState, useRef } from "react";
import { Animated, SafeAreaView, TouchableOpacity } from "react-native";
import { Assets, View } from "react-native-ui-lib";
import { IRoute } from "../../App.models";

import { globalStyles } from "../../styles/global";

import { Header } from "../Header/Header";
import { Navbar } from "../Navbar/Navbar";

export const MainWrapper = ({
   headerTitle,
   children,
}: {
   headerTitle: string;
   children: any;
}) => {
   const [showMenu, setShowMenu] = useState(false);

   const offsetValue = useRef(new Animated.Value(0)).current;
   const scaleValue = useRef(new Animated.Value(1)).current;

   const routes: IRoute[] = [
      {
         name: "Home",
         path: "Homepage",
         icon: Assets.icons.homeIcon,
      },
      {
         name: "How to use",
         path: "HowToUse",
         icon: Assets.icons.question,
      },
      {
         name: "Language",
         path: "Language",
         icon: Assets.icons.globe,
      },
      {
         name: "Log-out",
         path: "Logout",
         icon: Assets.icons.logout,
      },
   ];

   return (
      <SafeAreaView style={{ flex: 1 }}>
         <Navbar routes={routes}></Navbar>

         <Animated.View
            style={{
               ...globalStyles.container,
               ...globalStyles.navcontainer,
               ...{
                  flexGrow: 1,
                  backgroundColor: "white",
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
               },
               ...{
                  transform: [
                     { scale: scaleValue },
                     { translateX: offsetValue },
                  ],
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
                  title={headerTitle}
               ></Header>
               {children}
            </TouchableOpacity>
         </Animated.View>
      </SafeAreaView>
   );
};
