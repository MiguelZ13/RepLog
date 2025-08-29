import { Modal, Pressable, Text, View } from "react-native";

export default function DeleteMessage() {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            >
            <View>
                <Text>delete?</Text>
                <View>
                    <Pressable>
                        <Text>Yes</Text>
                    </Pressable>
                    <Pressable>
                        <Text>No</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    )
}