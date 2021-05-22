import { StatusBar } from 'expo-status-bar';
import React,  {Component}  from 'react';
import Router from './Router';
import { Provider } from 'react-redux';
import InitialLoadData from './src/component/InitialLoadData';
import configureStore from './src/store/configureStore';
import { NavigationContainer, DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';
import { Provider as PaperProvider, DarkTheme as PaperDarkTheme, DefaultTheme as PaperDefaultTheme } from 'react-native-paper';
import { PreferencesContext } from './src/constant/PreferencesContext';
import { AntDesign, Entypo, Ionicons, Feather, EvilIcons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/AntDesign';
import { useFonts } from 'expo-font';
 
// import merge from 'deepmerge';
// const CombinedDefaultTheme = merge(PaperDefaultTheme, NavigationDefaultTheme);
// const CombinedDarkTheme = merge(PaperDarkTheme, NavigationDarkTheme);

const initialState = {};
const store = configureStore(initialState);

const CombinedDefaultTheme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  colors: {
    accent: "#5e290e",
    backdrop: "rgba(0, 0, 0, 0.5)",
    background: "rgb(242, 242, 242)",
    border: "rgb(216, 216, 216)",
    card: "rgb(255, 255, 255)",
    disabled: "rgba(0, 0, 0, 0.26)",
    error: "#B00020",
    notification: "rgb(255, 59, 48)",
    onBackground: "#000000",
    onSurface: "#000000",
    placeholder: "rgba(0, 0, 0, 0.54)",
    primary: "#5e290e",
    surface: "#ffffff",
    text: "#5e290e",
  },
};
const CombinedDarkTheme = {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
  colors: {
    ...PaperDarkTheme.colors,
    ...NavigationDarkTheme.colors,
  },
};

const App = () => {

  const [isThemeDark, setIsThemeDark] = React.useState(false);

  let theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme;

  const toggleTheme = React.useCallback(() => {
    return setIsThemeDark(!isThemeDark);
  }, [isThemeDark]);

  const preferences = React.useMemo(
    () => ({
      toggleTheme,
      isThemeDark,
    }),
    [toggleTheme, isThemeDark]
  );

  const [loaded] = useFonts({
    roboto: require('./src/assets/fonts/CHESTER-Basic.ttf'),
    ptsans_regular: require('./src/assets/fonts/PTSans-Regular.ttf'),
    dustWest: require('./src/assets/fonts/DustWest.ttf'),
    helvetica: require('./src/assets/fonts/Helvetica.ttf'),
    net: require('./src/assets/fonts/DustWest.ttf'),
    about: require('./src/assets/fonts/PTSans-Regular.ttf'),
    text1: require('./src/assets/fonts/Catamaran-Regular.ttf'),
    text2: require('./src/assets/fonts/DustWest.ttf'),
    });
    
    if (!loaded) {
      return null;
    }
  
    return (
      
      <PreferencesContext.Provider value={preferences}>
      <StatusBar  backgroundColor="white"/>
      <PaperProvider theme={theme}>
      <Provider store={store}>
      <InitialLoadData/>  
      <Router/>
      </Provider>
      </PaperProvider>
      </PreferencesContext.Provider>
    );
  }

 export default App;
    


