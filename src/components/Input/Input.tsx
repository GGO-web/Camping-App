import React, { useCallback } from "react";
import { Colors } from "react-native-ui-lib";

import { TextField } from "react-native-ui-lib/src/incubator";

import { globalStyles } from "../../styles/global";

export const Input = ({
   formik,
   fieldName,
   label,
   fieldStyles = {},
   validate = true,
   ...inputAttributes
}: {
   formik: any;
   fieldName: string;
   label: string;
   fieldStyles?: {};
   validate?: boolean;
   inputAttributes?: any;
}) => {
   return (
      <TextField
         label={label}
         onChangeText={formik.handleChange(fieldName)}
         value={formik.values[fieldName]}
         validationMessageStyle={{
            ...globalStyles.validationMessage,
            ...(!validate ? { marginTop: 0 } : []),
         }}
         labelStyle={{ ...globalStyles.text, ...globalStyles.label }}
         autoCapitalize="none"
         fieldStyle={{
            ...globalStyles.text,
            ...globalStyles.input,
            ...fieldStyles,
            ...(formik.touched[fieldName] && validate
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
            validate
               ? formik.errors[fieldName]
                  ? globalStyles.isError
                  : globalStyles.isValid
               : { color: Colors.dark }
         }
         {...inputAttributes}
      />
   );
};
