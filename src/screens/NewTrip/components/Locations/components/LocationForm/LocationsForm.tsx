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
import { useActions } from '../../../../../../hooks/actions';
import { useAppSelector } from '../../../../../../redux/hooks';
import { useDidMountEffect } from '../../../../../../hooks/componentDidMount';

export function LocationsForm({
  formik,
}: {
  formik: FormikProps<ILocationValue>;
}) {
  const locationQuery = useAppSelector((store) => store.trip.latestLocation) || '';
  const debouncedSearchQuery = useDebounce(locationQuery, 1000);

  const [getCampingLocations] = useLazyGetCampingPlacesQuery();
  const locations = useAppSelector((store) => store.trip.latestLocationsList) || [];
  const [isLoadingLocations, setIsLoadingLocations] = useState(false);

  const { setLatestLocation, setLatestLocationsList } = useActions();

  const getLocationsByQuery = async () => {
    setIsLoadingLocations(true);
    const locationsResponse = await getCampingLocations({
      name: locationQuery as string,
    }).unwrap();

    setLatestLocationsList(locationsResponse.data);
    await AsyncStorage.setItem(CAMPING_LOCATIONS, JSON.stringify(locationsResponse.data));

    setIsLoadingLocations(false);
  };

  useDidMountEffect(() => {
    getLocationsByQuery();
  }, [debouncedSearchQuery]);

  useEffect(() => {
    const getAllLocationsFromStorage = async () => {
      const campingLocationsStringified = await AsyncStorage.getItem(CAMPING_LOCATIONS);
      const campingLocationsStorage: ILocation[] = JSON.parse(
        campingLocationsStringified as string,
      );

      if (campingLocationsStorage.length) {
        setLatestLocationsList(campingLocationsStorage);
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
            value={locationQuery}
            onChangeFunction={(newValue: string) => {
              setLatestLocation(newValue);
            }}
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
        {isLoadingLocations && (
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
