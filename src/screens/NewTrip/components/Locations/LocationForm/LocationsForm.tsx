import { BaseQueryFn } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import { QueryDefinition } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta } from "@reduxjs/toolkit/dist/query/fetchBaseQuery";
import { UseQueryHookResult } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import { FormikProps, useFormikContext } from "formik";
import React, { useState } from "react";
import { Assets, Button, Colors, Text, View } from "react-native-ui-lib";
import { Input } from "../../../../../components/Input/Input";
import { useGetCampingPlacesQuery } from "../../../../../redux/api/camping";
import { globalStyles } from "../../../../../styles/global";
import { ILocationValue } from "../Locations";
import type { ILocation, ILocationResponse } from "../Locations.model";

export const LocationsForm = ({
   formSubmitHandler,
   formik,
}: {
   formSubmitHandler: Function;
   formik: FormikProps<ILocationValue>;
}) => {
   const actions = useFormikContext();

   const [searchQuery, setSearchQuery] = useState("camp");

   const {data: camps, error, isLoading}: UseQueryHookResult<QueryDefinition<{ name: string; limit: number; }, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>, never, ILocationResponse, "campingApi">> = useGetCampingPlacesQuery({
      name:searchQuery,
      limit: 2
   });

   if (isLoading) {
      return <Text>Campings is loading, please give a second...</Text>
   }

   console.log(camps);


   return (
      <View>
         <View flex centerV style={globalStyles.formGroup}>
            <Input
               formik={formik}
               fieldName="location"
               label=""
               fieldStyles={{
                  minHeight: 48,
                  width: "80%",
               }}
               {...{
                  caretHidden: false,
                  placeholder: "Search",
               }}
            ></Input>

            <View flex right>
               <Button
                  style={{
                     ...globalStyles.button,
                     width: 48,
                     height: 48,
                  }}
                  mode="contained"
                  backgroundColor={Colors.primary}
                  disabledBackgroundColor={Colors.gray400}
                  disabled={!formik.isValid}
                  iconSource={Assets.icons.search}
                  iconStyle={{ tintColor: Colors.white }}
                  onPress={() => formSubmitHandler(formik.values, actions)}
               ></Button>
            </View>
         </View>

         {isLoading ?
            <Text>Campings is loading, please give a second...</Text>
         :
            <View>
               {
                  camps?.data.map((camp: ILocation) => (
                     <View key={camp.id}>
                        <Text>{camp.name}</Text>
                        <Text>{camp.description}</Text>
                     </View>
                  ))
               }
            </View>
         }
      </View>
   );
};
