import React, { useEffect, useState } from 'react';

import { FormikProps, useFormikContext } from 'formik';

import {
  Assets, Button, Colors, Text, View,
} from 'react-native-ui-lib';

import { Input } from '../../../../../components/Input/Input';

import { useLazyGetCampingPlacesQuery } from '../../../../../redux/api/camping';

import type { ILocation } from '../../../../../models/Locations.model';
import { ILocationValue } from '../Locations';

import { globalStyles } from '../../../../../styles/global';
import { useDebounce } from '../../../../../hooks/debounce';

export function LocationsForm({
  formSubmitHandler,
  formik,
}: {
  formSubmitHandler: Function;
  formik: FormikProps<ILocationValue>;
}) {
  const actions = useFormikContext();

  const debouncedSearchQuery = useDebounce(formik.values.location, 400);

  const [getCampingLocations] = useLazyGetCampingPlacesQuery();
  const [locations, setLocations] = useState<ILocation[]>([]);
  const [isLoadingLocations, setIsLoadingLocations] = useState(true);

  const setQueryLocationResults = (newValue: string) => {
    formik.setFieldValue('location', newValue);
  };

  useEffect(() => {
    const getLocationsByQuery = async () => {
      setIsLoadingLocations(true);
      const locationsResponse = await getCampingLocations({
        name: formik.values.location,
      }).unwrap();
      setIsLoadingLocations(false);

      setLocations(locationsResponse.data);
    };

    getLocationsByQuery();
  }, [debouncedSearchQuery]);

  return (
    <View flex>
      <View row style={globalStyles.formGroup}>
        <View flex>
          <Input
            formik={formik}
            fieldName="location"
            label=""
            onChangeFunction={setQueryLocationResults}
            fieldStyles={{
              minHeight: 48,
              marginRight: 24,
            }}
            {...{
              caretHidden: false,
              placeholder: 'Search',
            }}
          />
        </View>

        <View right>
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
          />
        </View>
      </View>

      <View>
        {isLoadingLocations && <Text>Campings is loading, please give a second...</Text>}

        {!isLoadingLocations && locations.length === 0
          ? <Text>No camping matches with provided query</Text>
          : (
            <View>
              {
              locations?.map((camp: ILocation) => (
                <View key={camp.id}>
                  <Text>{camp.name}</Text>
                  <Text>{camp.description}</Text>
                </View>
              ))
            }
            </View>
          )}
      </View>
    </View>
  );
}
