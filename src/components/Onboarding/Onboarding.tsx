import React, { useRef, useState } from "react";

import { Text, View, Image } from "react-native";
import { Button, Colors, PageControl, Typography } from "react-native-ui-lib";
import { Carousel } from "react-native-ui-lib/src/components/carousel";
import { Link } from "@react-navigation/native";

import { globalStyles, mergeStyles } from "../../styles/global";

import { onboardingScreens } from "./OnboardingScreens";
import { onboardingStyles } from "./OnboardingStyles";

export const Onboarding = ({ navigation }: { navigation: any }) => {
   const [currentPage, setCurrentPage] = useState(0);
   const numOfPages = 4;

   const carousel = useRef<any>(null);

   const moveBack = () => {
      const page = Math.max(0, currentPage - 1);

      carousel.current.goToPage(page);

      setCurrentPage(page);
   };

   const moveFront = () => {
      const page = Math.min(currentPage + 1, numOfPages);

      carousel.current.goToPage(page);

      setCurrentPage(page);
   };

   const moveTo = (index: number) => {
      carousel.current.goToPage(index);

      setCurrentPage(index);
   };

   const isDisabled = (type: string) => {
      switch (type) {
         case "prev":
            return currentPage === 0;
         case "next":
            return currentPage === numOfPages - 1;
      }
   };

   return (
      <View style={globalStyles.container}>
         <Carousel
            ref={carousel}
            pagingEnabled={true}
            initialPage={currentPage}
            pageControlProps={{ currentPage: currentPage }}
            onChangePage={moveTo}
         >
            {onboardingScreens.map((item, index) => {
               return (
                  <View key={index} style={onboardingStyles.carousel}>
                     <View>
                        <Image
                           style={onboardingStyles.carouselImage}
                           source={item.image}
                        />
                        <Text
                           style={mergeStyles([
                              onboardingStyles.carouselTitle,
                              { ...Typography.textCenter },
                              { ...Typography.heading2 },
                           ])}
                        >
                           {item.title}
                        </Text>
                        <Text
                           style={mergeStyles([
                              onboardingStyles.carouselText,
                              { ...Typography.textCenter },
                              { ...Typography.paragraph2 },
                           ])}
                        >
                           {item.text}
                        </Text>
                     </View>

                     <View style={onboardingStyles.pagination}>
                        <Button
                           onPress={moveBack}
                           style={mergeStyles([
                              onboardingStyles.button,
                              { backgroundColor: Colors.primary100, left: 0 },
                              isDisabled("prev")
                                 ? globalStyles.visuallyHidden
                                 : null,
                           ])}
                           iconSource={require("../../../assets/prev.png")}
                           iconStyle={{ tintColor: Colors.primary900 }}
                           disabled={isDisabled("prev")}
                        ></Button>

                        <PageControl
                           style={{ backgroundColor: "#eee" }}
                           color={Colors.primary}
                           inactiveColor={Colors.gray}
                           onPagePress={moveTo}
                           numOfPages={numOfPages}
                           spacing={8}
                           size={24}
                           currentPage={currentPage}
                        />

                        <Button
                           onPress={moveFront}
                           style={mergeStyles([
                              onboardingStyles.button,
                              { backgroundColor: Colors.primary900, right: 0 },
                              isDisabled("next")
                                 ? globalStyles.visuallyHidden
                                 : null,
                           ])}
                           iconSource={require("../../../assets/next.png")}
                           iconStyle={{ tintColor: Colors.primary100 }}
                           disabled={isDisabled("next")}
                        ></Button>
                     </View>

                     <Button
                        backgroundColor={Colors.primary}
                        uppercase={false}
                        style={mergeStyles([
                           globalStyles.button,
                           { width: "100%", marginBottom: 16 },
                        ])}
                        mode="contained"
                        onPress={() => navigation.navigate("Login")}
                     >
                        <Text
                           style={mergeStyles([
                              globalStyles.text,
                              globalStyles.buttonText,
                           ])}
                        >
                           Log In
                        </Text>
                     </Button>

                     <Text style={{ ...Typography.textCenter }}>
                        Don’t have an Account?{" "}
                        {
                           <Link
                              style={{
                                 ...Typography.paragraph2,
                                 ...Typography.underline,
                              }}
                              to={{ screen: "SignUp" }}
                           >
                              Register
                           </Link>
                        }
                     </Text>
                  </View>
               );
            })}
         </Carousel>
      </View>
   );
};
