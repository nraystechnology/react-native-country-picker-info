import React, { useState, useEffect, useMemo } from 'react';
import {
    Modal,
    TouchableOpacity,
    View,
    Text,
    StyleSheet,
    TextInput,
    FlatList,
} from 'react-native';

import ConstantFile from './utility/ConstantFile';
import Colors from "./utility/colors";

const RPCountryPickerInfo = (props) => {

    const {
        isVisible,
        onPressClosePicker,
        countryCode = "+91",
        isVisibleCancelButton = true,
        onPressSelect,
        styleSearch = {},
        styleSearchText = {},
        styleItemContainer = {},
        styleItemContainerSelected = {},
        styleCountryText = {},
        styleCountryTextSelected = { color: 'green' },
    } = props;

    const [isShowCountryPicker, setIsShowCountryPicker] = useState(isVisible)
    const [arrCountryList, setArrCountryList] = useState(JSON.parse(ConstantFile.coutrylistString));
    const [arrCountryListShow, setArrCountryListShow] = useState(JSON.parse(ConstantFile.coutrylistString));
    const [selectedCountryCode, setSelectedCountryCode] = useState(countryCode);
    const [selectedCountryInfo, setSelectedCountryInfo] = useState({});
    const [txtSearch, setTxtSearch] = useState("");


    useEffect(() => {
        
        const delayDebounceFn = setTimeout(() => {
            onChangeSearch()
        }, 500)

        return () => clearTimeout(delayDebounceFn)
    }, [txtSearch, selectedCountryCode, isShowCountryPicker])


    const onPressSelectItem = (item) => {

        setSelectedCountryCode(item.dial_code)
    }

    
    const onChangeSearch = () => {

        if (txtSearch.length > 0) {
            const arrFilter = arrCountryList.filter(item => item.name.includes(txtSearch))
            setArrCountryListShow(arrFilter)
        }
        else {
            setArrCountryListShow(arrCountryList)
        }

        let countryInfoObj = arrCountryListShow.filter(item => item.dial_code == selectedCountryCode)

        if (countryInfoObj.length > 0) {
            setSelectedCountryInfo(countryInfoObj[0])
        }
    }


    return (
        <Modal
            animationType="fade"
            visible={isVisible}>

            <View style={{ flex: 1, backgroundColor: 'transparent', paddingVertical: 50, paddingHorizontal: 20 }}>

                <View style={[styles.txtSearch, styleSearch]}>
                    <TextInput style={[styles.textInputStyle, styleSearchText]}
                        placeholder={"Search Country"}
                        clearButtonMode="always"
                        returnKeyType="done"
                        value={txtSearch}
                        // onSubmitEditing={onSubmitEditingTxt}
                        // onChangeText={text => onChangeSearch(text)} />
                        onChangeText={text => setTxtSearch(text)} />

                </View>

                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={arrCountryListShow}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity
                                // onPress={() => onPressSelectItem(item)}
                                onPress={() => { onPressSelect(item) }}
                                style={[styles.containerItem, selectedCountryCode == item.dial_code ? styleItemContainerSelected : styleItemContainer]}>

                                <Text style={[styles.titleTextStyle, selectedCountryCode == item.dial_code ? styleCountryTextSelected : styleCountryText]}>{item.name}</Text>
                                <Text style={[styles.titleTextStyle, selectedCountryCode == item.dial_code ? styleCountryTextSelected : styleCountryText]}>{item.dial_code}</Text>
                            </TouchableOpacity>
                        )
                    }}
                    keyExtractor={(item) => item.name}
                />

                {isVisibleCancelButton && <View style={{ height: 50, width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity
                        onPress={onPressClosePicker}
                        style={{ height: 50, width: '100%', borderRadius: 12, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.colorButtonBG, }}>
                        <Text style={[styles.titleTextStyle, { color: '#FFF' }]}>Close</Text>
                    </TouchableOpacity>
                </View>
                }

            </View>
        </Modal>
    )
}

export default RPCountryPickerInfo;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    txtSearch: {
        height: 50,
        borderWidth: 1,
        borderColor: Colors.colorText,
        borderRadius: 5,
        paddingHorizontal: 10
    },
    textInputStyle: {
        height: 50,
        color: Colors.colorText,
        fontSize: 18,
        padding: 0,
    },
    containerItem: {
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomColor: Colors.colorText,
        borderBottomWidth: 0.5,
        borderColor: 'red',
        borderWidth: 0
    },
    titleTextStyle: {
        color: Colors.colorText,
        fontSize: 18,
    },
});