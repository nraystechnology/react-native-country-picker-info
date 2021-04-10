import React from 'react';

import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';

import RPCountryPickerInfo from './RPCountryPickerInfo';

const App = () => {

  const [isOpenCountryPicker, setIsOpenCountryPicker] = React.useState(false)
  const [countryCode, setCountryCode] = React.useState("+91")

  const onPressOpenPicker = () => {

    setIsOpenCountryPicker(!isOpenCountryPicker)
  }

  const onPressCountryItem = (countryInfo) => {

    setCountryCode(countryInfo.dial_code)
    setIsOpenCountryPicker(false)
  }

  return (
    <SafeAreaView >
      <StatusBar />

      <TouchableOpacity onPress={onPressOpenPicker}>
        <Text>{countryCode}</Text>
      </TouchableOpacity>
      <RPCountryPickerInfo
        isVisible={isOpenCountryPicker}
        isVisibleCancelButton={false}
        onPressClosePicker={onPressOpenPicker}
        onPressSelect={onPressCountryItem}
      />

    </SafeAreaView>
  );
};


export default App;
