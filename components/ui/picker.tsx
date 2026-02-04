import { Option, PickerProps } from "@/types";
import { useMemo, useState } from "react";
import { Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

// 1. The user selects an option.
// 2. The option's value will be saved via onSelect()
// 3. onSelect() will save that input into the "value" attribute
// 4. The dependencies in useMemo will update, running the useMemo hook
// 5. useMemo saves the value in "selectedOption", which will be displayed in TextInput
export default function Picker({ optionList, value, onSelect }: PickerProps) {

    const [pickerToggle, setPickerToggle] = useState<boolean>(false);

    // useMemo saves and returns a cached value.
    // The value will not be removed unless there are changes in the dependecies array
    const selectedOption = useMemo(() => {
        return optionList.find(option => option.value === value)?.label ?? "";
    }, [value]); 

    function selectOption(option: Option) {
        onSelect(option);
        setPickerToggle(false);
    }

    return (
        <View>
            <TextInput style={styles.inputBar} 
            onTouchStart={() => setPickerToggle(true)}
            value={selectedOption} />
            {pickerToggle ?
            <Modal visible={pickerToggle}>
            <View style={styles.optionsContainer}>
                {optionList.map((option) => (
                    <Pressable onPress={() => {selectOption(option)}} key={option.id}
                    style={styles.option}>
                        <Text>{option.label}</Text>
                    </Pressable>
                ))}
            </View>
            </Modal> : null}
        </View>
    )
}

const styles = StyleSheet.create({
    inputBar: {
        height: 50,
        backgroundColor: "#E0F2E9",
        borderWidth: 1,
        borderColor: "#274156",
        marginVertical: 5,
        padding: 10,
        borderRadius: 5,
    },
    
    optionsContainer: {
        zIndex: 20,
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#ffffff",
        padding: 5,
        position: "absolute",
        width: "100%"
    },

    option: {
        paddingVertical: 20,
        paddingInline: 10,
        flex: 1,
        borderWidth: 1,
        marginVertical: 5,
        borderColor: "#274156"
    }
})