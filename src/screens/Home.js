import { StatusBar } from 'expo-status-bar';
import React ,{ useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity, Dimensions, ScrollView, FlatList } from 'react-native';
import { Button, Title, Paragraph, Caption, Chip, useTheme } from 'react-native-paper';
import * as StaticData from '../constant/StaticData';
import { AntDesign, Entypo, Ionicons, Feather, EvilIcons } from '@expo/vector-icons';
import Announcement_Bar from '../component/Announcement_Bar';
import Hero_Image from '../component/Hero_Image';
import Shop from '../component/Shop';
import Gift_Card from '../component/Gift_Card';
import ProductHome from '../component/ProductHome';
import Simple_Paragraph from '../component/Simple_Paragraph';
import Card from '../component/Card';
import Cover_Layout from '../component/Cover_Layout';
import Image_With_Text from '../component/Image_With_Text';
import ContentText from '../component/ContentText';
import ContentImage from '../component/ContentImage';
import Slider from '../component/Slider';
import Image_with_text_overlay from '../component/Image_with_text_overlay';
import Simple_Image from '../component/Simple_Image'
import Loader from '../component/Loader';
import * as Services  from '../services/services_hendler';
// import { useNavigation } from '@react-navigation/native'

 const Home = () => {
  const [header, setHeader] = useState(null); 
  const [result, setResult] = useState(null);
  const [isloading, setLoding] = useState(true);
  const  colors  = useTheme();

  // console.log('color',colors);

  useEffect (() => {
    Services.getHeader().then(data => {
      setHeader(data.data[0].sections[0]);
      //  console.log('header',data);  
    })
    
  },[])

  useEffect (() => {
    Services.getHomePage().then(data => {
      data.data[0].sections.map((item, index) => renderSection(item, index))
      setResult(data.data[0].sections);
      setLoding(false);
      // console.log('checkok',data.data[0].sections);    
    })
    
  },[]) 

   
  const renderSection = (item, key) => {
    switch(item.contentType.key) {

    case 'hero-image':
      return (
        <Hero_Image key={key} settings={item.settings}/>
      )

    case 'featured-categories':
      return (
        <View key={key}>

          {item.settings?.heading?.text!=''?<ContentText>{item.settings.heading.text}</ContentText>:null}
          {item.settings?.subHeading?.text!=''?<Text style={{fontSize:item.settings?.subHeading?.style?.fontSize, fontFamily:'ptsans_regular', marginLeft:25, marginRight:25, textAlign:item.settings?.subHeading?.style?.textAlign, color:item.settings?.subHeading?.style?.color?.value, marginBottom:10}}>{item.settings?.subHeading?.text}</Text>:null}
          <ContentImage/>

          {item.settings.collections.map( (item,key) => (
            <Shop key={key} item={item}/> ))
          }
        </View>
        
      )

    case 'gift-card':
      return (
        <Gift_Card key={key} settings={item.settings}/>
      )
      
    case 'featured-products':
      return (
        <ProductHome key={key} settings={item.settings}/>
      )     
      
    case 'simple-paragraph':
      return (
        <Simple_Paragraph key={key} settings={item.settings}/>
      )
      
    case 'card':
      return (
        <Card key={key} settings={item.settings}/>
      )

    case 'custom-content':
      return (
        <View key={key}>
          {item.settings?.heading?.text!=''?<ContentText>{item.settings.heading.text}</ContentText>:null}
          {item.settings?.subHeading?.text!=''?<Text style={{fontSize:item.settings?.subHeading?.style?.fontSize, fontFamily:'ptsans_regular', marginLeft:25, marginRight:25, textAlign:item.settings?.subHeading?.style?.textAlign, color:item.settings?.subHeading?.style?.color?.value, marginBottom:10}}>{item.settings?.subHeading?.text}</Text>:null}
          <ContentImage/>

          <Cover_Layout key={key} item={item}/>
        </View>
      )

    case 'image-with-text':
      return (
        <Image_With_Text key={key} settings={item.settings}/>
      )
      
    case 'slider':
      return (
        <Slider key={key} item={item}/>
      )
       
    case 'image-with-text-overlay':
      return (
        <Image_with_text_overlay key={key} settings={item.settings}/>
      )
       
    case 'simple-image':
      return (
        <View key={key}>
          {item.settings?.heading?.text!=''?<ContentText>{item.settings.heading.text}</ContentText>:null}
          {item.settings?.subHeading?.text!=''?<Text style={{fontSize:item.settings?.subHeading?.style?.fontSize, fontFamily:'ptsans_regular', marginLeft:25, marginRight:25, textAlign:item.settings?.subHeading?.style?.textAlign, color:item.settings?.subHeading?.style?.color?.value, marginBottom:10}}>{item.settings?.subHeading?.text}</Text>:null}
          <ContentImage/>

          <Simple_Image key={key} settings={item.settings}/>
        </View>  
      ) 
    
    default: {
      return null
    }
    }
  }

  if(isloading===true && !result){
   
    return (
    <Loader/>
    )
  }

  return (

  <ScrollView style={{backgroundColor:colors.colors.background}}>
    {header?.settings!=null?<Announcement_Bar settings={header.settings}/>:null}
    {result.map((item, index) => renderSection(item, index))}
  </ScrollView>
    
  );
}

const styles = StyleSheet.create({
 
});

export default Home;
