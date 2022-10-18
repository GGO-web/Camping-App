import React from "react";
import { Button, Colors, Text, View } from "react-native-ui-lib";

import { FormikProps, useFormikContext } from "formik";

import { ITeammateId } from "../../Teammates";
import { globalStyles } from "../../../../../../styles/global";
import { Input } from "../../../../../../components/Input/Input";

export const TeammatesForm = ({
   formSubmitHandler,
   formik,
}: {
   formSubmitHandler: Function;
   formik: FormikProps<ITeammateId>;
}) => {
   const actions = useFormikContext();

   return (
      <View>
         <View style={globalStyles.formGroup}>
            <Input
               formik={formik}
               fieldName="teammateId"
               label="ID"
               {...{
                  caretHidden: false,
               }}
            ></Input>
         </View>

         <Button
            style={globalStyles.button}
            mode="contained"
            backgroundColor={Colors.primary}
            disabledBackgroundColor={Colors.gray400}
            disabled={!formik.isValid}
            onPress={() => formSubmitHandler(formik.values, actions)}
         >
            <Text style={{ ...globalStyles.text, ...globalStyles.buttonText }}>
               Send request
            </Text>
         </Button>
      </View>
   );
};
