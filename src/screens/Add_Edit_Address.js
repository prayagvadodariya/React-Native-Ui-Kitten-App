import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, TextInput, FlatList, TouchableOpacity, ActivityIndicator, ImageBackground, Dimensions, SafeAreaView,TouchableHighlight, Text, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, Entypo, Ionicons, Feather, EvilIcons } from '@expo/vector-icons';
import { Drawer, Switch, Paragraph, useTheme, Appbar } from 'react-native-paper';
import * as graph_ql from '../graph_ql/Mutation';
import Custom_Button from '../component/Custom_Button';
import {addressValidationSchema} from '../yupValidation/ValidationSchema';
import { Formik } from 'formik';
import * as yup from 'yup';


const AddEditAddress = (props) => {
  const navigation = useNavigation(); 
  const [isfirst, first] = useState(10);
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [company, setCompany] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const  colors  = useTheme();
  const [animating, setAnimating] = useState(false);
  // console.log("props",props);


  useEffect(() => {
    if (props.route.params.active===true) {
        navigation.setOptions({
          header: ({ navigation, scene, previous,style }) => (
            <Appbar.Header style={{backgroundColor: colors.colors.surface}}>
              <Appbar.Action
                  icon={ props => <AntDesign name='left' {...props} color={colors.colors.text}/>}
                  onPress={() =>
                    navigation.navigate('UserStack', { screen: 'Address'})
                  }
                />
              <Appbar.Content title={<Text style={{fontSize:15, fontWeight:'bold'}}>ADD NEW ADDRESS</Text>} style={{ alignItems: 'center' }} color={colors.colors.text}/>
              </Appbar.Header>
              )
        });   
    }else{
        navigation.setOptions({title: 'EDIT ADDRESS'}); 
    }
  }, [navigation, props.route]);
  
  useEffect(() => {
    if(props.route.params.active===true){
      setFirstName(''),
      setLastName(''),
      setCompany(''),
      setAddress1(''),
      setAddress2(''),
      setCity(''),
      setPincode('')
      // console.log('add');
    }else{
        setFirstName(props.route.params.data.firstName),
        setLastName(props.route.params.data.lastName),
        setCompany(props.route.params.data.company),
        setAddress1(props.route.params.data.address1),
        setAddress2(props.route.params.data.address2),
        setCity(props.route.params.data.city),
        setPincode(props.route.params.data.zip)
    }    
  }, [props.route]);


  const onSave = (value) => {
    let address1 = value.address1;
    let address2 = value.address2;
    let city = value.city;
    let company = value.company;
    let firstName = value.firstname;
    let lastName = value.lastname;
    let zip = value.pincode;
    let id = props.route.params.id;

    if(props.route.params.active===true){
      setAnimating(true);
      graph_ql.create_address(address1,address2,city,company,firstName,lastName,zip).then(results =>{
        setAnimating(false);
        navigation.navigate('UserStack', { screen: 'Address',params: {first: isfirst}})
        // console.log('your address',results);
      })
    }else{
      setAnimating(true);
      graph_ql.edit_address(address1,address2,city,company,firstName,lastName,zip,id).then(results =>{
        setAnimating(false);
        navigation.navigate('UserStack', { screen: 'Address',params: {first: isfirst}})
        // console.log('your addressUPADTE',results);
      })
      
    }
  }
        
    return (
      <ScrollView style={{ backgroundColor: colors.colors.background }}>
          <Formik
            enableReinitialize={true}
            validationSchema={addressValidationSchema}
            initialValues={{ firstname: firstname, lastname: lastname, company: company, address1: address1, address2: address2, city: city, pincode: pincode }}
            onSubmit={values => onSave(values)}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, isValid,}) => (
            <>
            <View>
                <Text style={styles.name}>First Name</Text>  
                <View style={{flex:1, marginLeft:20, marginRight:20, backgroundColor:colors.colors.text, borderRadius:10, height:40, borderColor:colors.colors.text, borderWidth:1, justifyContent:"center", padding:10}} >
                    <TextInput style={{color: colors.colors.surface}}
                     placeholder="First Name"
                     name="firstname"
                     onChangeText={handleChange('firstname')}
                     onBlur={handleBlur('firstname')}
                     value={values.firstname}
                     keyboardType="firstname"
                    //  onChangeText={first}
                    //  value={text}    
                     />
                </View>
            </View>

            {errors.firstname &&
               <Text style={{ fontSize: 13, color: 'red', marginLeft: 40, marginTop: 10 }}>{errors.firstname}</Text>
            }

            <View>
                <Text style={styles.name}>Last Name</Text>  
                <View style={{flex:1, marginLeft:20, marginRight:20, backgroundColor:colors.colors.text, borderRadius:10, height:40, borderColor:colors.colors.text, borderWidth:1, justifyContent:"center", padding:10}}>
                    <TextInput style={{color: colors.colors.surface}}
                     placeholder="Last Name"
                     name="lastname"
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
                <Text style={styles.name}>Company</Text>  
                <View style={{flex:1, marginLeft:20, marginRight:20, backgroundColor:colors.colors.text, borderRadius:10, height:40, borderColor:colors.colors.text, borderWidth:1, justifyContent:"center", padding:10}}>
                    <TextInput style={{color: colors.colors.surface}}
                     placeholder="Company"
                     name="company"
                     onChangeText={handleChange('company')}
                     onBlur={handleBlur('company')}
                     value={values.company}
                     keyboardType="company"
                     />
                </View>
            </View>

            {errors.company &&
               <Text style={{ fontSize: 13, color: 'red', marginLeft: 40, marginTop: 10 }}>{errors.company}</Text>
            }

            <View>
                <Text style={styles.name}>Address 1</Text>  
                <View style={{flex:1, marginLeft:20, marginRight:20, backgroundColor:colors.colors.text, borderRadius:10, height:40, borderColor:colors.colors.text, borderWidth:1, justifyContent:"center", padding:10}}>
                    <TextInput style={{color: colors.colors.surface}}
                     placeholder="Address 1"
                     name="address1"
                     onChangeText={handleChange('address1')}
                     onBlur={handleBlur('address1')}
                     value={values.address1}
                     keyboardType="address1"
                     />
                </View>
            </View>

            {errors.address1 &&
               <Text style={{ fontSize: 13, color: 'red', marginLeft: 40, marginTop: 10 }}>{errors.address1}</Text>
            }

            <View>
                <Text style={styles.name}>Address 2</Text>  
                <View style={{flex:1, marginLeft:20, marginRight:20, backgroundColor:colors.colors.text, borderRadius:10, height:40, borderColor:colors.colors.text, borderWidth:1, justifyContent:"center", padding:10}}>
                    <TextInput style={{color: colors.colors.surface}}
                     placeholder="Address 2"
                     name="address2"
                     onChangeText={handleChange('address2')}
                     onBlur={handleBlur('address2')}
                     value={values.address2}
                     keyboardType="address2"
                    />
                </View>
            </View>

            {errors.address2 &&
               <Text style={{ fontSize: 13, color: 'red', marginLeft: 40, marginTop: 10 }}>{errors.address2}</Text>
            }

            <View>
                <Text style={styles.name}>City</Text>  
                <View style={{flex:1, marginLeft:20, marginRight:20, backgroundColor:colors.colors.text, borderRadius:10, height:40, borderColor:colors.colors.text, borderWidth:1, justifyContent:"center", padding:10}}>
                    <TextInput style={{color: colors.colors.surface}}
                     placeholder="City"
                     name="city"
                     onChangeText={handleChange('city')}
                     onBlur={handleBlur('city')}
                     value={values.city}
                     keyboardType="city"
                     />
                </View>
            </View>

            {errors.city &&
               <Text style={{ fontSize: 13, color: 'red', marginLeft: 40, marginTop: 10 }}>{errors.city}</Text>
            }

            {/* <View>
                <Text style={styles.name}>Country</Text>  
                <View style={styles.inputView} >
                    <Text style={styles.inputText}>India</Text>
                </View>
            </View>
            <View>
                <Text style={styles.name}>State</Text>  
                <View style={styles.inputView} >
                    <Text style={styles.inputText}>Gujarat</Text>
                </View>
            </View> */}
            <View>
                <Text style={styles.name}>Zip</Text>  
                <View style={{flex:1, marginLeft:20, marginRight:20, backgroundColor:colors.colors.text, borderRadius:10, height:40, borderColor:colors.colors.text, borderWidth:1, justifyContent:"center", padding:10}}>
                    <TextInput style={{color: colors.colors.surface}}
                     placeholder="Pin code"
                     name="pincode"
                     onChangeText={handleChange('pincode')}
                     onBlur={handleBlur('pincode')}
                     value={values.pincode}
                     keyboardType="numeric"
                     />
                </View>
            </View>

            {errors.pincode &&
               <Text style={{ fontSize: 13, color: 'red', marginLeft: 40, marginTop: 10 }}>{errors.pincode}</Text>
            }

            {/* <View>
                <Text style={styles.name}>Language</Text>  
                <View style={styles.inputView} >
                    <Text style={styles.inputText}>Language</Text>
                </View>
            </View>  */}

            <View>
              <ActivityIndicator
                  animating={animating}
                  color="#2196f3"
                  size="large"
                  style={styles.activityIndicator}
              />
            </View>
            <Custom_Button onPress={handleSubmit} disabled={!isValid}>SAVE</Custom_Button>
            
            
         </>
         )}
         </Formik>   
      </ScrollView>
  
    );
  
}


const styles = StyleSheet.create({
  activityIndicator: {
    marginTop:20
  },
  cover: {
    marginTop:10,
    marginLeft:15,
    marginRight:15,
    backgroundColor:"#fff"
  },
  name: {
    marginTop: 20,
    marginLeft: 21,
    marginBottom:4, 
    fontSize:12,
    fontWeight: 'bold',
    color: '#808080',  
  },
  inputView: {
    flex:1, marginLeft:20, marginRight:20, backgroundColor:"white", borderRadius:10, height:20, borderColor:'white', borderWidth:1, justifyContent:"center", padding:10  
  },
});

export default AddEditAddress;