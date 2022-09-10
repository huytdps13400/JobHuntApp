import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import WebView from 'react-native-webview';
import { baseURL } from '../../../apiServer';
import Loader from '../../../components/Loading';
import { useNavigation } from '@react-navigation/native';
import { FontFamily, Icon } from '../../../assets';

const InfoProfile = () => {
     const inset = useSafeAreaInsets();
     const navigation = useNavigation();
     const WebAPICode = `alert('Hello')`;

     return (
          <View style={[styles.container, { paddingTop: inset.top }]}>
               <View
                    style={{
                         padding: 16,
                         alignItems: "center",
                         flexDirection: "row",

                    }}
               >
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                         <Image
                              style={{ width: 24, height: 24, }}
                              resizeMode="contain"
                              source={Icon.leftarrow}
                         />
                    </TouchableOpacity>

                    <Text
                         numberOfLines={1}
                         style={{
                              flex: 1,
                              justifyContent: "center",
                              marginLeft: 8,
                              fontSize: 15,
                              fontFamily: FontFamily.SoDoSansSemiBold,
                         }}
                    >
                         {'Hồ Sơ Cá Nhân'}
                    </Text>
               </View>
               <WebView source={{ uri: baseURL + '/ung-vien/ho-so-ca-nhan' }} style={{ width: '100%' }} startInLoadingState={true} onNavigationStateChange={(data) => {
                    console.log({ alo: data })
               }}

                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    onMessage={(data) => console.log({ data })}
                    renderLoading={() => {
                         return <Loader />
                    }}
                    injectedJavaScript={`document.getElementById('updatecontactandsocial').onClick('alert('haha')');`}



               />
          </View>
     )
}

const styles = StyleSheet.create({
     container: {
          flex: 1,
          backgroundColor: 'white'
     }
})

export default InfoProfile