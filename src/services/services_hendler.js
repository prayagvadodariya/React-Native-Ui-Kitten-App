import * as services  from '../services/api';
import axios from 'axios';


export const getHomePage = () =>{
  let URL = services.Api + 'app-content';
   return axios.get(URL)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      return error
    });
}

export const getHeader = () =>{
  let URL = services.Api + 'app-header';
   return axios.get(URL)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      return error
    });
}

export const getSideMenu = () =>{
  let URL = services.Api + 'menu';
   return axios.get(URL)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      return error
    });
}

