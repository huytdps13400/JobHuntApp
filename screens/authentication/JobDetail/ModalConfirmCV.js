import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';

import Modal from 'react-native-modal';
import Button from '../../../components/Button';
import { get } from 'lodash';
import { FontFamily } from '../../../assets';
import { useSelector } from 'react-redux';
import { baseURL } from '../../../apiServer';

const ModalConfirmCv = ({
     isShowAlert,
     contentFirst,
     contentSecond,
     childContentSecond,
     jobDetail,
     onClose,
     onSuccess
}) => {
     const { profile } = useSelector(state => state.user)
     const RJTitle = get(jobDetail, "RJTitle", "");
     const CPAvatar = get(profile, "CPAvatar", "");
     const CddEmail = get(profile, "CddEmail", "");
     const AspNetUserDTO = get(profile, "AspNetUserDTO", "");
     const PhoneNumber = get(AspNetUserDTO, "PhoneNumber", "");
     const nameFileCV = get(profile, "nameFileCV", "");



     return (
          <Modal
               animationIn={'zoomIn'}
               animationOut={'zoomOut'}
               useNativeDriver={true}
               hideModalContentWhileAnimating={true}
               isVisible={isShowAlert}
               backdropOpacity={0.7}>
               <View style={styles.modal}>
                    <View style={styles.container}>
                         <View style={styles.wrapTitle}>
                              <Text style={styles.titleText}>
                                   Bạn đang ứng tuyển vào vị trí
                                   <Text style={{ fontFamily: FontFamily.SoDoSansSemiBold, fontSize: 18 }}>{' '}{RJTitle}</Text>
                              </Text>
                              <View style={{ alignItems: 'center' }}>
                                   <Image style={styles.imageView} source={{ uri: baseURL + CPAvatar }} />
                                   <Text style={{ marginTop: 10, fontFamily: FontFamily.SoDoSansBold, fontSize: 15 }}>{profile.CddFullName || 'User Name'}</Text>
                              </View>
                              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, }}>
                                   <Text style={{ fontSize: 18, fontFamily: FontFamily.SoDoSansSemiBold }}>Email:</Text>
                                   <Text style={{ fontSize: 18, }}>{' '}{CddEmail}</Text>
                              </View>
                              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, }}>
                                   <Text style={{ fontSize: 18, fontFamily: FontFamily.SoDoSansSemiBold }}>Số điện thoại:</Text>
                                   <Text style={{ fontSize: 18, }}>{' '}{PhoneNumber}</Text>
                              </View><View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, }}>
                                   <Text style={{ fontSize: 18, fontFamily: FontFamily.SoDoSansSemiBold }}>CV:</Text>
                                   <Text style={{ fontSize: 18, }}>{' '}{nameFileCV}</Text>
                              </View>

                         </View>
                         <View style={styles.wrapContent}>


                              <Button title={'Nộp đơn'} onPress={() => {
                                   onSuccess();
                                   onClose();
                              }} />
                              <Button title={'Huỷ'} onPress={onClose} style={{ backgroundColor: 'gray', marginVertical: 10 }} />
                         </View>
                    </View>
               </View>
          </Modal>
     );
};

export default ModalConfirmCv;

const styles = StyleSheet.create({
     imageView: {
          width: 80,
          height: 80,
          borderRadius: 80,
     },
     modal: {
          flex: 1,
          justifyContent: 'center',
          backgroundColor: 'transparent',
     },
     container: {
          backgroundColor: 'white',
          minHeight: 100,
          borderRadius: 8,
          paddingBottom: 16,
     },
     wrapContent: {
          paddingHorizontal: 16,
     },
     wrapTitle: {
          paddingTop: 24,
          marginBottom: 24,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          paddingHorizontal: 16,
     },
     titleText: {
          fontSize: 18,
     },
     textDesc: {

     },
     buttonNeverMindText: {

     },
     buttonContinueText: {

     },
     buttonCard: {

     },
     textDeactivated: {

     },
});
