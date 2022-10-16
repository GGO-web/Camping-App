import React from "react";
import { View } from "react-native-ui-lib";

import { Formik, FormikHelpers } from "formik";

import { CrumbsLink } from "../../components/common/CrumbsLink";

import { NewTripForm } from "./components/NewTripForm";

import { ITeamMate } from "./NewTrip.model";

import { globalStyles } from "../../styles/global";
import { firebaseAuth } from "../../firebase/firebase";

export interface INewTrip {
   name: string;
   location: string;
   teammates: Array<ITeamMate>;
}

export const NewTrip = () => {
   const formInitialValues: INewTrip = {
      name: "",
      location: "",
      teammates: [{ avatar: firebaseAuth.currentUser?.photoURL as string }],
   };

   const formSubmitHandler = async (
      values: INewTrip,
      actions: FormikHelpers<INewTrip>
   ) => {};

   return (
      <View style={{ ...globalStyles.container, ...globalStyles.navcontainer }}>
         <CrumbsLink>Add new Trip</CrumbsLink>

         <Formik
            initialValues={formInitialValues}
            onSubmit={(values: INewTrip, actions) => {
               formSubmitHandler(values, actions);
            }}
         >
            {(formik) => (
               <NewTripForm
                  formSubmitHandler={formSubmitHandler}
                  formik={formik}
               ></NewTripForm>
            )}
         </Formik>
      </View>
   );
};
