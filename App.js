import React, { useRef, useState } from "react"
import { TouchableOpacity, View, Image } from "react-native"
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ModalComponent from "./ModalComponent";

const App = () => {

  const [image, setImage] = useState(null)
  const modalRef = useRef()
  const pressBtn = () => {
    modalRef.current.onVisible()
  }
  const setImageLink = (uri) => {
    setImage(uri)
  }
  const clickLibrary = async () => {
     const result = await launchImageLibrary({mediaType:"photo", quality: 0.5})
     setImage(result.assets[0].uri)
     console.log(JSON.stringify(result))
  }
  return (

    <View style={{ backgroundColor: "yellow", flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image source={{ uri: image }} resizeMode="contain" style={{ width: "100%", height: 700 }} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' , width: '100%'}}>
        <TouchableOpacity onPress={pressBtn}>
          <Icon name="camera-alt" size={50} color={"red"} />
        </TouchableOpacity>
        <TouchableOpacity onPress={clickLibrary}>
          <Icon name="library-add" size={50} color={"green"} />
        </TouchableOpacity>
      </View>

      <ModalComponent
        ref={modalRef}
        imageLink={setImageLink}

      />
    </View>
  )
}
export default App