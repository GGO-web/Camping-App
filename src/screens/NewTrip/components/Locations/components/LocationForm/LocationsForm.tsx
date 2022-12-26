import React, { useEffect, useState } from 'react';

import { FormikProps } from 'formik';

import {
  Assets, Button, Carousel, Colors, Text, View,
} from 'react-native-ui-lib';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Input } from '../../../../../../components/Input/Input';
import { LocationCard } from './LocationCard';

import { useLazyGetCampingPlacesQuery } from '../../../../../../redux/api/camping';

import type { ILocation } from '../../../../../../models/Locations.model';
import type { ILocationValue } from '../../Locations';

import { globalStyles } from '../../../../../../styles/global';
import { useDebounce } from '../../../../../../hooks/debounce';

import { CAMPING_LOCATIONS } from '../../../../../../constants';

export function LocationsForm({
  formik,
}: {
  formik: FormikProps<ILocationValue>;
}) {
  const [query, setQuery] = useState(formik.values.location);
  const debouncedSearchQuery = useDebounce(query, 1000);

  const [getCampingLocations] = useLazyGetCampingPlacesQuery();
  const [locations, setLocations] = useState<ILocation[]>([]);
  const [isLoadingLocations, setIsLoadingLocations] = useState(false);

  const getLocationsByQuery = async () => {
    setIsLoadingLocations(true);
    const locationsResponse = await getCampingLocations({
      name: formik.values.location,
    }).unwrap();

    setLocations(locationsResponse.data);
    await AsyncStorage.setItem(CAMPING_LOCATIONS, JSON.stringify(locationsResponse.data));

    setIsLoadingLocations(false);
  };

  useEffect(() => {
    getLocationsByQuery();
  }, [debouncedSearchQuery]);

  useEffect(() => {
    const getAllLocationsFromStorage = async () => {
      const campingLocationsStringified = await AsyncStorage.getItem(CAMPING_LOCATIONS);
      const campingLocationsStorage = JSON.parse(campingLocationsStringified as string);

      if (campingLocationsStorage.length) {
        setLocations(campingLocationsStorage);
      }
    };

    getAllLocationsFromStorage();
  }, []);

  return (
    <View flex>
      <View row style={globalStyles.formGroup}>
        <View flex>
          <Input
            formik={formik}
            fieldName="location"
            label=""
            value={query}
            onChangeFunction={(newValue: string) => setQuery(newValue)}
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
            onPress={() => getLocationsByQuery()}
          />
        </View>
      </View>

      <View flex>
        {isLoadingLocations
          && (
          <Text>
            Campings is loading, please wait a second...
          </Text>
          )}

        {(!isLoadingLocations && locations.length === 0) && (
        <Text>
          No camping matches with provided query
        </Text>
        )}

        {(!isLoadingLocations && locations.length > 0) && (
        <Carousel
          containerStyle={{
            minHeight: 700,
          }}
          pageControlProps={{
            size: 10,
          }}
          pageControlPosition={Carousel.pageControlPositions.OVER}
        >
          {
            locations?.map((camp: ILocation) => <LocationCard key={camp.id} camp={camp} />)
          }
        </Carousel>
        )}
      </View>
    </View>
  );
}
