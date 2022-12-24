import React from 'react';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  Assets,
  Avatar,
  Button,
  Colors,
  Icon,
  Text,
  View,
} from 'react-native-ui-lib';

import { FormikProps, useFormikContext } from 'formik';

import { Input } from '../../../../components/Input/Input';

import type { INewTrip } from '../../NewTrip';

import { globalStyles } from '../../../../styles/global';
import { ITeamMate } from '../../NewTrip.model';
import { CalendarToggler } from '../../../../components/CalendarToggler/CalendarToggler';
import { useAppSelector } from '../../../../redux/hooks';

export function NewTripForm({
  formSubmitHandler,
  formik,
}: {
  formSubmitHandler: Function;
  formik: FormikProps<INewTrip>;
}) {
  const actions = useFormikContext();

  const navigation = useNavigation();

  const selectedLocations = useAppSelector(
    (store) => store.selectedLocations.selectedLocations.map(
      (selectedLocation) => selectedLocation.name,
    ),
  );

  return (
    <View>
      <View style={globalStyles.formGroup}>
        <Input
          formik={formik}
          fieldName="name"
          label="Trip Name"
          {...{
            caretHidden: false,
          }}
        />
      </View>

      <View style={globalStyles.formGroup}>
        {selectedLocations.length ? (
          <Input
            formik={formik}
            fieldName="location"
            label="Locations"
            value={selectedLocations.join(', ')}
            validate={false}
            {...{
              editable: false,
              contextMenuHidden: true,
            }}
          />
        ) : <Text style={{ ...globalStyles.text, ...globalStyles.label }}>Locations</Text>}

        <View left>
          <Button
            style={globalStyles.buttonOutlined}
            backgroundColor={Colors.primary}
            mode="outlined"
            onPress={() => navigation.navigate('Locations' as never)}
          >
            <Text
              style={{
                ...globalStyles.text,
                ...globalStyles.buttonText,
                ...globalStyles.buttonTextOutlined,
              }}
            >
              View locations
            </Text>
          </Button>
        </View>
      </View>

      <View style={globalStyles.formGroup}>
        <Text marginB-8 paragraph2 gray500>
          Teammates
        </Text>

        <ScrollView
          style={{ paddingHorizontal: 0, marginBottom: 16 }}
          horizontal
        >
          {formik.values.teammates.map(
            (teamMate: ITeamMate) => (
              <View
                key={teamMate.id}
                center
                style={{ width: 80, height: 80, borderRadius: 12 }}
                marginR-16
              >
                <Avatar
                  imageStyle={{
                    width: 80,
                    height: 80,
                    resizeMode: 'cover',
                    borderRadius: 12,
                  }}
                  size={80}
                  source={
                    teamMate.avatar
                      ? { uri: teamMate.avatar }
                      : Assets.icons.avatar
                  }
                />
              </View>
            ),
          )}

          <View center style={{ width: 80, height: 80 }} marginR-16>
            <Button
              mode="contained"
              backgroundColor={Colors.gray}
              disabledBackgroundColor={Colors.gray400}
              disabled={!formik.isValid}
              style={{
                minWidth: 80,
                width: 80,
                height: 80,
                borderRadius: 12,
              }}
              onPress={() => navigation.navigate('Teammates' as never)}
            >
              <Icon
                style={{
                  width: 16,
                  height: 16,
                  resizeMode: 'contain',
                }}
                assetName="plus"
              />
            </Button>
          </View>
        </ScrollView>

        <View left>
          <Button
            style={globalStyles.buttonOutlined}
            backgroundColor={Colors.primary}
            mode="outlined"
            onPress={() => navigation.navigate('Teammates' as never)}
          >
            <Text
              style={{
                ...globalStyles.text,
                ...globalStyles.buttonText,
                ...globalStyles.buttonTextOutlined,
              }}
            >
              Add new teammates
            </Text>
          </Button>
        </View>
      </View>

      <View paddingV-10 style={globalStyles.formGroup}>
        <CalendarToggler />
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
          Continue
        </Text>
      </Button>
    </View>
  );
}
