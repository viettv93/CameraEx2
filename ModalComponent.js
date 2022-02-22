import React, { forwardRef, useImperativeHandle, useRef, useState } from "react"
import { View, StyleSheet, TouchableOpacity, Modal } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"
import { RNCamera } from 'react-native-camera'


const ModalComponent = (props, ref) => {
    const camera = useRef(null)

    const [cameraDirection, setCameraDirection] = useState(RNCamera.Constants.Type.back)
    const [visible, setVisible] = useState(false)
    const changeDirection = () => {
        if (cameraDirection == RNCamera.Constants.Type.back)
            setCameraDirection(RNCamera.Constants.Type.front)
        else setCameraDirection(RNCamera.Constants.Type.back)
    }
    const onVisible = () => {
        setVisible(true)
    }
    useImperativeHandle(ref, () => ({
        onVisible: onVisible
    }))

    const takePicture = async () => {
        if (camera) {
            const options = { quality: 0.5, base64: true };
            const data = await camera.current.takePictureAsync(options);
            console.log(data.uri)
            props.imageLink(data.uri)
            setVisible(false)
        }
    }
    return (
        <View style={{ backgroundColor: "white", flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Modal visible={visible}>
                <RNCamera ref={camera}
                    style={styles.preview}
                    type={cameraDirection}
                    flashMode={RNCamera.Constants.FlashMode.off}
                    androidCameraPermissionOptions={{
                        title: 'Permission to use camera',
                        message: 'We need your permission to use your camera',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}
                    androidRecordAudioPermissionOptions={{
                        title: 'Permission to use audio recording',
                        message: 'We need your permission to use your audio',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }} />
                <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={takePicture} style={styles.capture}>
                        <Icon name="circle" size={50} color={"red"} />
                    </TouchableOpacity>
                </View>
                <View style={{ position: "absolute", alignItems: 'center', top: 20, right: 0 }}>
                    <Icon name="flip-camera-android" size={50} onPress={changeDirection} color={"red"} />
                </View>
            </Modal>


        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
    },
})
export default forwardRef(ModalComponent)