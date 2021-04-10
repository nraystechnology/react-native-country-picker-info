# React Native Country Picker Info

**React Native Country Picker Info v1.0.0** you can get country name, dial code, country code by this package.

## Getting Started

##### Installation

----------

**With NPM**

```bash
npm install --save react-native-country-picker-info
```

**With YARN**

```bash
yarn add react-native-country-picker-info
```

-----

### Usage

```javascript
import RPCountryPickerInfo from "react-native-country-picker-info";
```

This constant will provide you name dial_code and code of countries. (I.E: `[{name: "India", dial_code: "+91", code: "IN"},{{name: "Canada", dial_code: "+1", code: "CA"}]` )

### Sample Usage

```javascript
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

```


### Example

You can find the usage example of the package in the example folder. 

```console
git clone https://github.com/nraystechnology/react-native-country-picker-info.git

cd react-native-country-picker-info/example

npm install

npx react-native run-ios or android
```

### License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
