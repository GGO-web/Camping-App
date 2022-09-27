import React, { useCallback } from "react";

import { TextField } from "react-native-ui-lib/src/incubator";

import { globalStyles } from "../../styles/global";

export const Input = ({
   formik,
   fieldName,
   label,
   ...inputAttributes
}: {
   formik: any;
   fieldName: string;
   label: string;
   inputAttributes?: any;
}) => {
   return (
      <TextField
         label={label}
         onChangeText={formik.handleChange(fieldName)}
         value={formik.values[fieldName]}
         validationMessageStyle={globalStyles.validationMessage}
         labelStyle={{ ...globalStyles.text, ...globalStyles.label }}
         autoCapitalize="none"
         fieldStyle={{
            ...globalStyles.text,
            ...globalStyles.input,
            ...(formik.touched[fieldName]
               ? formik.errors[fieldName]
                  ? globalStyles.isError
                  : globalStyles.isValid
               : []),
         }}
         onChange={useCallback(
            () => formik.setFieldTouched(fieldName, true, true),
            [formik.touched[fieldName]]
         )}
         enableErrors={true}
         validateOnChange={true}
         validateOnBlur={true}
         onBlur={formik.handleBlur(fieldName)}
         validate={[() => false]}
         validationMessage={[formik.errors[fieldName]]}
         style={
            formik.errors[fieldName]
               ? globalStyles.isError
               : globalStyles.isValid
         }
         {...inputAttributes}
      />
   );
};
