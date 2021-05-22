import React, { useState } from 'react';
import { View, Image, StyleSheet, TextInput, FlatList, TouchableOpacity, ActivityIndicator, ImageBackground, Dimensions, SafeAreaView,TouchableHighlight, Text, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as StorageKeys from '../constant/StorageKeys';
import {loginValidationSchema, forgetValidationSchema} from '../yupValidation/ValidationSchema';
import Dialog, { SlideAnimation, DialogContent } from 'react-native-popup-dialog';
import * as graph_ql from '../graph_ql/Mutation';
import ContentText from '../component/ContentText';
import ContentImage from '../component/ContentImage';
import Custom_Button from '../component/Custom_Button';
import Custom_Model_Button from '../component/Custom_Modal_Button';
import { Chip, useTheme } from 'react-native-paper';
import { connect } from 'react-redux';
import { addItemAction} from '../actions/userAction'


const Login = (props) => {
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const [animating, setAnimating] = useState(false);
  const navigation = useNavigation(); 
  const  colors  = useTheme();

  const onLogin = (value) => {
    let email = value.email;
    let password = value.password;

    setAnimating(true);
    graph_ql.login(email,password).then(results =>{
      // console.log('login',results);
      if(results.data.customerAccessTokenCreate.customerAccessToken==null){
        
      }else{
        AsyncStorage.setItem(StorageKeys.V_AccessToken, JSON.stringify(results.data.customerAccessTokenCreate.customerAccessToken.accessToken))
        const userItem = {
          id: 1,
          useractive: true
         }
        props.addItemAction(userItem);
        props.navigation.goBack();
      }
      setAnimating(false);
    })
  }

    return (
      <ScrollView style={{backgroundColor: colors.colors.background}}>
          <View style={styles.logo}>
          <Image resizeMode="contain" style={styles.logopossition} source={require('../assets/images/logo.png')}/> 
          </View>

          <View>
            <ContentText>LOGIN</ContentText>
            <ContentImage/>
          </View>

          <Formik
            validationSchema={loginValidationSchema}
            initialValues={{ email: '', password: '' }}
            onSubmit={values => onLogin(values)}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, isValid,}) => (
          <View>
            <View style={{flex:1, marginTop: 25, marginLeft:20, marginRight:20, backgroundColor:"white", borderRadius:30, height:50, marginBottom:20, borderColor:colors.colors.text, borderWidth:1, justifyContent:"center", padding:20}}>
              <TextInput
              name="email"
              style={styles.inputText}
              placeholder="Enter your email here" 
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              keyboardType="email-address"
              />
              </View>
              
              {errors.email &&
                <Text style={{ fontSize: 13, color: 'red', marginLeft: 40 }}>{errors.email}</Text>
              }

              <View style={{flex:1, marginTop: 25, marginLeft:20, marginRight:20, backgroundColor:"white", borderRadius:30, height:50, marginBottom:20, borderColor:colors.colors.text, borderWidth:1, justifyContent:"center", padding:20}}>
              <TextInput
              name="password"
              style={styles.inputText}
              placeholder="Enter your password here"
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              secureTextEntry 
              />
              </View>

              {errors.password &&
                <Text style={{ fontSize: 13, color: 'red', marginLeft: 40 }}>{errors.password}</Text>
              }

              <Custom_Button  onPress={handleSubmit} disabled={!isValid}>LOGIN</Custom_Button>
            </View>
            )}
            </Formik>
            
            <View>
              <ActivityIndicator
                animating={animating}
                color="#2196f3"
                size="large"
                style={styles.activityIndicator}
              />
            </View>

            <View>
              <TouchableOpacity><Text style={{ textAlign:"center", color:colors.colors.text, marginTop: 10, fontWeight: 'bold' }}  onPress={showModal} >FORGET PASSWORD ?</Text></TouchableOpacity>
              <TouchableOpacity><Text style={{ textAlign:'center', color:colors.colors.text, marginTop: 20, marginBottom:10, fontWeight: 'bold' }} onPress={ () => navigation.navigate('LoginStack', { screen: 'Signup' })}>DON'T HAVE AN ACCOUNT ? SIGN UP</Text></TouchableOpacity>
            </View>

            <View style={styles.container}>
              <Dialog
                height={300}
                onTouchOutside={() => {
                 setVisible(false)
                }}
                visible={visible} onPress={hideModal}
                dialogAnimation={new SlideAnimation({
                  slideFrom: 'bottom',})}>
                <DialogContent>

                <View>
                  <Text style={styles.fname}>FORGOT PASSWORD ?</Text>
                  <Text style={styles.fdetail}>Well'll send you a reset link.</Text>
                </View>

              <Formik
                  validationSchema={forgetValidationSchema}
                  initialValues={{ email: ''}}
                  onSubmit={values => console.log(values)}
              >
            {({ handleChange, handleBlur, handleSubmit, values, errors, isValid,}) => (
                <>    
                <View>
                    <Text style={styles.name}>Email</Text>  
                    <View style={styles.inputView1} >
                        <TextInput
                        style={styles.inputText}
                        name="email"
                        placeholder="Enter your email here" 
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                        keyboardType="email-address"
                        />
                    </View>
                </View>

                {errors.email &&
                  <Text style={{ fontSize: 13, color: 'red', marginLeft: 25, marginTop:10 }}>{errors.email}</Text>
                }

                <Custom_Model_Button  onPress={handleSubmit} disabled={!isValid}>GET LINK</Custom_Model_Button>
                </>
                 )}
                 </Formik>

                <View>
                  <ActivityIndicator
                    animating={animating}
                    color="#2196f3"
                    size="large"
                    style={styles.activityIndicator}
                  />
                </View>
                </DialogContent>
              </Dialog>
            </View>
      </ScrollView>
  
    );
  
}


const styles = StyleSheet.create({
  container: {
    // width:"100%",
    // height:200,
    // margin:10
    // flex:1,
    // alignItems:'center',
    // justifyContent:"center"
  },
 logo: {
   flex:1,
   justifyContent:"center"
 },
 logopossition: {
  width:"100%",
  height:130,
  marginTop:50,
 },
 title: {
  fontSize:45,
  fontFamily:"Roboto",
  color:"#1c4252",
  marginTop:18,
  // margin:15,
  textAlign:"center"
 },
 img: {
  width:"100%",
  height:20,
 },
inputText:{
  height:50,
  color:"black"
},
fname: {
  marginTop:10,
  fontSize:30,
  fontFamily:"Roboto",
  color:"#1c4252",
},
fdetail: {
 fontSize:15, 
 fontWeight:'bold', 
 color:"#54524d",
 marginBottom:20
},
inputView1: {
  flex:1,
  backgroundColor:"white",
  borderRadius:30,
  height:50,
  borderColor:'#5e290e',
  borderWidth:1,
  justifyContent:"center",
  padding:20  
},
name: {
  marginTop: 15,
  marginLeft: 25,
  marginBottom:4, 
  fontSize:18,
  fontWeight: 'bold',
  color: '#808080',  
},

});




const mapDispatchToProps = (dispatch) => ({
  addItemAction: (userItem) => dispatch(addItemAction(userItem)),
});

export default connect(null,mapDispatchToProps) (Login);