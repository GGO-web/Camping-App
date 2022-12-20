import React, { useEffect, useState } from 'react';

import { FormikProps, useFormikContext } from 'formik';

import {
  Assets, Button, Carousel, Colors, Text, View, Image,
} from 'react-native-ui-lib';

import { Input } from '../../../../../components/Input/Input';

import { useLazyGetCampingPlacesQuery } from '../../../../../redux/api/camping';

import type { ILocation } from '../../../../../models/Locations.model';
import { ILocationValue } from '../Locations';

import { globalStyles } from '../../../../../styles/global';
import { useDebounce } from '../../../../../hooks/debounce';
import { mockedLocations } from '../../../../../constants';

export function LocationsForm({
  formSubmitHandler,
  formik,
}: {
  formSubmitHandler: Function;
  formik: FormikProps<ILocationValue>;
}) {
  const actions = useFormikContext();

  const debouncedSearchQuery = useDebounce(formik.values.location || 'camp', 400);

  const [getCampingLocations] = useLazyGetCampingPlacesQuery();
  const [locations, setLocations] = useState<ILocation[]>(mockedLocations);
  const [isLoadingLocations, setIsLoadingLocations] = useState(false);

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
    // getLocationsByQuery();
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
        {isLoadingLocations && <Text>Campings is loading, please wait a second...</Text>}

        {(!isLoadingLocations && locations.length === 0)
        && <Text>No camping matches with provided query</Text>}

        {(!isLoadingLocations && locations.length > 0) && (
        <Carousel
          containerStyle={{
            minHeight: '100%',
          }}
          pageControlProps={{
            size: 10,
          }}
          pageControlPosition={Carousel.pageControlPositions.OVER}
        >
          {
            locations?.map((camp: ILocation) => {
              console.log(camp.images);

              return (
                <View flex paddingH-16 centerV key={camp.id}>
                  <View flex style={{ height: '100%' }}>
                    <Image
                      overlayType={Image.overlayTypes.BOTTOM}
                      style={{
                        height: '100%',
                        borderRadius: 36,
                        overflow: 'hidden',
                      }}
                      source={camp.images.length > 0
                        ? ({
                          uri: camp.images[0].url,
                        })
                        : Assets.graphic.camp}
                    />
                  </View>

                  <View flex style={{ marginTop: -70 }}>
                    <Text white heading3 textCenter marginB-16>{camp.name}</Text>

                    <View centerH>
                      <Button
                        activeOpacity={0.97}
                        style={{ ...globalStyles.button, minWidth: 160 }}
                        backgroundColor={Colors.primary}
                        disabledBackgroundColor={Colors.gray400}
                        mode="contained"
                      >
                        <Text
                          style={{
                            ...globalStyles.text,
                            ...globalStyles.buttonText,
                          }}
                        >
                          Explore
                        </Text>
                      </Button>
                    </View>
                  </View>
                </View>
              );
            })
            }
        </Carousel>
        )}
      </View>
    </View>
  );
}
