import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Button, Colors, Image, Text, View,
} from 'react-native-ui-lib';
import { globalStyles } from '../../styles/global';
import { ScreenNavigationProp } from '../../types';

export function Hurrey({
  route,
}: {
  route: any;
}) {
  const navigation = useNavigation<ScreenNavigationProp>();

  return (
    <View style={globalStyles.container}>
      <Image
        marginB-24
        style={{
          ...globalStyles.imageCenter,
          width: 230,
          height: 180,
          resizeMode: 'contain',
        }}
        source={require('../../../assets/hurrey.png')}
      />
      <Text marginB-8 textCenter heading2>
        Hurrey
      </Text>
      <Text marginB-24 textCenter paragraph2>
        {route.params?.text}
      </Text>

      <Button
        style={globalStyles.button}
        mode="contained"
        backgroundColor={Colors.primary}
        onPress={() => navigation.navigate(route.params?.page || 'Login')}
      >
        <Text style={{ ...globalStyles.text, ...globalStyles.buttonText }}>
          Go Back
        </Text>
      </Button>
    </View>
  );
}
