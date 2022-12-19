import React, { useEffect } from "react";
import { Assets, Button, Colors, Text, View } from "react-native-ui-lib";
import { useNavigation } from "@react-navigation/native";
import { Formik, FormikHelpers, useFormikContext } from "formik";

import { CrumbsLink } from "../../../../components/common/CrumbsLink";
import { Input } from "../../../../components/Input/Input";

import { locationSchema } from "../../../../helpers/validationSchema";

import { globalStyles } from "../../../../styles/global";
import { LocationsForm } from "./LocationForm/LocationsForm";

export interface ILocationValue {
   location: string;
   // coords
}

export const Locations = () => {
   const formInitialValues: ILocationValue = {
      location: "",
   };

   const navigation = useNavigation();

   const formSubmitHandler = async (
      values: ILocationValue,
      actions: FormikHelpers<ILocationValue>
   ) => {
      try {
         // find person by id on the database and throw the error when it is't present

         navigation.goBack();
      } catch (error) {
         actions.setFieldError(
            "teammateId",
            "Looks like this ID is not valid. try another one"
         );
      }
   };

   return (
      <View style={{ ...globalStyles.container, ...globalStyles.navcontainer }}>
         <CrumbsLink>Locations</CrumbsLink>

         <Formik
            initialValues={formInitialValues}
            onSubmit={(values: ILocationValue, actions) => {
               formSubmitHandler(values, actions);
            }}
            validationSchema={locationSchema}
            validateOnMount={true}
         >
            {(formik) => (
               <LocationsForm
                  formSubmitHandler={formSubmitHandler}
                  formik={formik}
               ></LocationsForm>
            )}
         </Formik>
      </View>
   );
};
