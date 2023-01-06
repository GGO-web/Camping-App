import React from 'react';
import {
  View, Image, Text, Colors, Button,
} from 'react-native-ui-lib';

import { AssetsGraphicType } from '../../matherialUI';
import { globalStyles } from '../../styles/global';

export function NoResults({
  image,
  text,
  buttonText,
  buttonCallback,
}: {
  image: AssetsGraphicType | any,
  text: string,
  buttonText?: string,
  buttonCallback?: Function
}) {
  return (
    <View center flex>
      <Image
        marginB-24
        source={image}
        style={{
          width: 230,
          height: 180,
          resizeMode: 'contain',
        }}
      />

      <Text marginB-8 paragraph2 gray700>
        {text}
      </Text>

      {buttonText ? (
        <View left>
          <Button
            style={globalStyles.buttonOutlined}
            backgroundColor={Colors.primary}
            mode="outlined"
            onPress={buttonCallback}
          >
            <Text
              style={{
                ...globalStyles.text,
                ...globalStyles.buttonText,
                ...globalStyles.buttonTextOutlined,
              }}
            >
              {buttonText}
            </Text>
          </Button>
        </View>
      ) : null}
    </View>
  );
}
