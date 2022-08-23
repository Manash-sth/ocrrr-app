import React, { useState, useEffect } from 'react'
import { Image, View, ScrollView, TouchableOpacity, Text, StyleSheet, Button, Modal, Pressable } from 'react-native'
import { AntDesign, Entypo } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import axios from 'axios';

export default function Home() {
 const [image, setImage] = useState(null)
 const [result, setResult] = useState("That is where digitization comes in. In the era of rapid technological evolution, digital technology increasingly covers many areas of our life: from finance and business to travel and leisure. Therefore, it is logical to use all the advantages of digitization and scanning documents. A decade ago, digitizing documents was pricey and required specific training, equipment and software, but nowadays, it is no longer a luxury. With this, one can easily query the required document and get it in a matter of seconds. Having documents in digital form also means we can have multiple redundant backups preventing any kind of data loss. But It also has its shortcomings. Simply scanning the documents is not enough. Although you may have a digital copy of it, it would be completely un-editable if or when needed.")
 const [load, setLoad] = useState(false)
 const [modalVisible, setModalVisible] = useState(false);

 const img_to_text = async()=>{
    const frm = new FormData()
    if(image.endsWith('png')){
        frm.append('file', {uri: image, name: 'photo.png', filename :'imageName.png', type: 'image/png'})
    }
    if(image.endsWith('jpg')){
        frm.append('file', {uri: image, name: 'photo.jpg', filename :'imageName.jpg', type: 'image/jpg'})
    }

    const url = "http://192.168.23.113:5000/upload"
    try{
        const res = await axios.post(url, frm, { headers: { 'Content-Type': 'multipart/form-data'}})
        setResult(res.data)
    }catch(err){
        console.log(err)
    }
 }

 const openCamera = async () => {
    let _image = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3,4],
      quality: 1,
    });
    if (!_image.cancelled) {
        setImage(_image.uri)
      }
  };

  const openGallery = async () => {
    let _image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3,4],
      quality: 1,
    });
    if (!_image.cancelled) {
        setImage(_image.uri)
    }
  };

 return (
<View style={imageUploaderStyles.main}>

    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
    >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View onPress={() => setModalVisible(true)}>
                {
                    image  &&<Image source={{ uri: image }} style={{ width: 450, height: 600 }} />
                }
            </View>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </TouchableOpacity>
          </View>
        </View>
    </Modal>

    <View style={imageUploaderStyles.top}>
      <Pressable style={imageUploaderStyles.container} onPress={()=>{setModalVisible(!modalVisible)}}>
          {
              image  &&<Image source={{ uri: image }} style={{ width: 120, height: 200 }} />
          }
      </Pressable>

      <View>
        <Button title='Clear' onPress={()=>{}}></Button>
        <View style={{height:20}}></View>
        <Button title='Update' onPress={()=>{}}></Button>

      </View>

    </View>


    <Button title='Send' onPress={img_to_text}></Button>

    <ScrollView style={imageUploaderStyles.res}>
        <Text style={{marginVertical:20,fontSize:16}}>RESULT</Text>
        <View>
            <Text style={{marginVertical:20,fontSize:16}}>{result}</Text>
        </View>
    </ScrollView>

    <View style={imageUploaderStyles.uploadBtnContainer}>
        <TouchableOpacity onPress={openCamera} style={imageUploaderStyles.uploadBtn} >
            <AntDesign name="camera" size={20} color="black" />
            <Text>{'From Camera'}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={openGallery} style={imageUploaderStyles.uploadBtn} >
            <Entypo name="image" size={20} color="black" />
            <Text>{'From Gallary'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={imageUploaderStyles.uploadBtn} >
            <AntDesign name="folder1" size={20} color="black" />
            <Text>{'Past Files'}</Text>
        </TouchableOpacity>
    </View>

</View>
 );
}

const imageUploaderStyles=StyleSheet.create({
    main: {
        justifyContent: 'space-between',
        height: '100%'
    },
    container:{
        elevation:2,
        height:200,
        width:120,
        flexDirection: 'row',
        alignItems: 'space-between',
        backgroundColor:'#efefef',
        position:'relative',
    },
    res:{
        margin: 5
    },
    uploadBtnContainer:{
        marginHorizontal: 10,
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'space-between',
        opacity:0.7,
        backgroundColor:'lightgrey',
        height:'10%',
        padding: 5
    },
    uploadBtn:{
        alignItems:"center",
        justifyContent:'center'
    },
    top:{
      flexDirection: 'row',
      justifyContent: 'space-between'
    }
})

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },

    buttonClose: {
      backgroundColor: "#2196F3",
    },
});