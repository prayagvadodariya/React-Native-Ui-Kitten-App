import React, { useState } from 'react';
import { View, Image, StyleSheet, TextInput, FlatList, TouchableOpacity, ActivityIndicator, ImageBackground, Dimensions, SafeAreaView,TouchableHighlight, Text, ScrollView } from 'react-native';
import { AntDesign, Entypo, EvilIcons, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { signupValidationSchema } from '../yupValidation/ValidationSchema';
import { Formik } from 'formik';
import * as graph_ql from '../graph_ql/Mutation';
import ContentText from '../component/ContentText';
import ContentImage from '../component/ContentImage';
import Custom_Button from '../component/Custom_Button';
import { Chip, useTheme } from 'react-native-paper';
import { colors } from 'react-native-elements';

const Signup = () => {
  const [animating, setAnimating] = useState(false);
  const navigation = useNavigation(); 
  const colors  = useTheme();

const onSignUp = (value) => {
  let email = value.email;
  let password = value.confirmpassword;
  let firstName = value.firstname;
  let lastName = value.lastname;
  let phone = value.phone;
  
  setAnimating(true);
  graph_ql.signup(email,password,firstName,lastName,phone).then(results =>{
    // console.log('check',results);
    if(results.data.customerCreate.customer==null){

    }else{
      navigation.navigate('LoginStack', { screen: 'Login' });
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
            <ContentText>SIGN UP</ContentText>
            <ContentImage/> 
          </View>

          <Formik
            validationSchema={signupValidationSchema}
            initialValues={{ firstname: '', lastname: '', email: '', phone: '', password: '', confirmpassword: '' }}
            onSubmit={values => onSignUp(values)}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, isValid,}) => (
          <View>
              <View>
                <Text style={styles.name}>First Name</Text>  
                <View style={{flex:1, marginLeft:20, marginRight:20, backgroundColor:"white", borderRadius:30, height:50, borderColor:colors.colors.text, borderWidth:1, justifyContent:"center", padding:20}}>
                    <TextInput
                    name="firstname"
                    style={styles.inputText}
                    placeholder="Enter your first name here"
                    onChangeText={handleChange('firstname')}
                    onBlur={handleBlur('firstname')}
                    value={values.firstname}
                    keyboardType="firstname"
                    />
                </View>
              </View>

              {errors.firstname &&
                <Text style={{ fontSize: 13, color: 'red', marginLeft: 40, marginTop: 10 }}>{errors.firstname}</Text>
              }

              <View>
                <Text style={styles.name}>Last Name</Text>  
                <View style={{flex:1, marginLeft:20, marginRight:20, backgroundColor:"white", borderRadius:30, height:50, borderColor:colors.colors.text, borderWidth:1, justifyContent:"center", padding:20}}>
                    <TextInput
                    name="lastname"
                    style={styles.inputText}
                    placeholder="Enter your last name here"
                    onChangeText={handleChange('lastname')}
                    onBlur={handleBlur('lastname')}
                    value={values.lastname}
                    keyboardType="lastname"
                    />
                </View>
              </View>

              {errors.lastname &&
                <Text style={{ fontSize: 13, color: 'red', marginLeft: 40, marginTop: 10 }}>{errors.lastname}</Text>
              }

              <View>
                <Text style={styles.name}>Email</Text>  
                <View style={{flex:1, marginLeft:20, marginRight:20, backgroundColor:"white", borderRadius:30, height:50, borderColor:colors.colors.text, borderWidth:1, justifyContent:"center", padding:20}}>
                    <TextInput
                    name="email"
                    style={styles.inputText}
                    placeholder="Enter your email address here"
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    keyboardType="email"
                    />
                </View>
              </View> 

              {errors.email &&
                <Text style={{ fontSize: 13, color: 'red', marginLeft: 40, marginTop: 10 }}>{errors.email}</Text>
              }

              <View>
                <Text style={styles.name}>Phone</Text>  
                <View style={{flex:1, marginLeft:20, marginRight:20, backgroundColor:"white", borderRadius:30, height:50, borderColor:colors.colors.text, borderWidth:1, justifyContent:"center", padding:20}}>
                    <TextInput
                    name="phone"
                    style={styles.inputText}
                    placeholder="Enter your phone number here"
                    onChangeText={handleChange('phone')}
                    onBlur={handleBlur('phone')}
                    value={values.phone}
                    keyboardType='numeric'
                    />
                </View>
              </View>

              {errors.phone &&
                <Text style={{ fontSize: 13, color: 'red', marginLeft: 40, marginTop: 10 }}>{errors.phone}</Text>
              }

              <View>
                <Text style={styles.name}>Password</Text>  
                <View style={{flex:1, marginLeft:20, marginRight:20, backgroundColor:"white", borderRadius:30, height:50, borderColor:colors.colors.text, borderWidth:1, justifyContent:"center", padding:20}}>
                    <TextInput
                    name="password"
                    style={styles.inputText}
                    placeholder="Enter your password here"
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    keyboardType="password"
                    secureTextEntry
                    />
                </View>
              </View>
              
              {errors.password &&
                <Text style={{ fontSize: 13, color: 'red', marginLeft: 40, marginTop: 10 }}>{errors.password}</Text>
              }

              <View>
                <Text style={styles.name}>Comfirm Password</Text>  
                <View style={{flex:1, marginLeft:20, marginRight:20, backgroundColor:"white", borderRadius:30, height:50, borderColor:colors.colors.text, borderWidth:1, justifyContent:"center", padding:20}}>
                    <TextInput
                    name="confirmpassword"
                    style={styles.inputText}
                    placeholder="Re-enter your password here"
                    onChangeText={handleChange('confirmpassword')}
                    onBlur={handleBlur('confirmpassword')}
                    value={values.confirmpassword}
                    keyboardType="confirmpassword"
                    secureTextEntry
                    />
                </View>
              </View> 
              
              {errors.confirmpassword &&
                <Text style={{ fontSize: 13, color: 'red', marginLeft: 40, marginTop: 10 }}>{errors.confirmpassword}</Text>
              }

            <Custom_Button onPress={handleSubmit} disabled={!isValid}>SIGN UP</Custom_Button>
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
              <TouchableOpacity><Text style={{textAlign:'center', color:colors.colors.text, marginTop: 15, marginBottom:20, fontWeight: 'bold',}} onPress={ () => navigation.navigate('LoginStack', { screen: 'Login' })}>ALL READY HAVE AN ACCOUNT ? SIGN IN</Text></TouchableOpacity>
            </View>
      </ScrollView>
  
    );
  
}


const styles = StyleSheet.create({
 logo: {
   flex:1,
   justifyContent:"center",
   marginTop:30
 },
 logopossition: {
  width:"100%",
  height:130,
  marginTop:25,
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
forget: {
  textAlign:"center",
  color:'#5e290e',
  marginTop: 10,
  fontWeight: 'bold'
},
name: {
  marginTop: 20,
  marginLeft: 40,
  marginBottom:4, 
  fontSize:18,
  fontWeight: 'bold',
  color: '#808080',  
}

});

export default Signup;