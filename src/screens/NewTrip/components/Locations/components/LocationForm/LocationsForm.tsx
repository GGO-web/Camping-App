import React, { useEffect, useRef, useState } from 'react';

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

interface ILocationsStorage {
  query: string;
  data: ILocation[]
}

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

  const locationSuggestionsLoaded = useRef<boolean>();

  const getLocationsByQuery = async () => {
    if (!locationSuggestionsLoaded.current) {
      setIsLoadingLocations(true);
      const locationsResponse = await getCampingLocations({
        name: locationQuery as string,
      }).unwrap();

      setLatestLocationsList(locationsResponse.data);

      await AsyncStorage.setItem(CAMPING_LOCATIONS, JSON.stringify({
        query: locationQuery,
        data: locationsResponse.data,
      }));

      setIsLoadingLocations(false);
    }

    locationSuggestionsLoaded.current = false;
  };

  useDidMountEffect(() => {
    getLocationsByQuery();
  }, [debouncedSearchQuery]);

  useEffect(() => {
    const getAllLocationsFromStorage = async () => {
      const campingLocationsStringified = await AsyncStorage.getItem(CAMPING_LOCATIONS);

      const campingLocationsStorage: ILocation[] = (JSON.parse(
        campingLocationsStringified as string,
      ) as ILocationsStorage).data;

      const campingLocationQueryStorage: string = (JSON.parse(
        campingLocationsStringified as string,
      ) as ILocationsStorage).query;

      if (campingLocationsStorage.length) {
        setLatestLocationsList(campingLocationsStorage);
        setLatestLocation(campingLocationQueryStorage);

        formik.setFieldValue('location', campingLocationQueryStorage);

        locationSuggestionsLoaded.current = true;
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
            iconStyle={{
              tintColor: Colors.white,
              width: 18,
              height: 18,
              resizeMode: 'contain',
            }}
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
