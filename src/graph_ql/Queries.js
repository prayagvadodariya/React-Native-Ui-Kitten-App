import { gql } from '@apollo/client';
import client from '../config/grapqlapi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as StorageKeys from '../constant/StorageKeys';

export const profile = async () => {
  var accessTokenGet = await AsyncStorage.getItem(StorageKeys.V_AccessToken);
  var customerAccessToken = JSON.parse(accessTokenGet);
    return client
      .query({
        query: gql`
        query {
          customer(customerAccessToken: "${customerAccessToken}") {
            id
            email
            firstName
            lastName
          }
        }
        `
      })
      .then((results) => {
        return results;
      })
      .catch(error => {
        return error
      }); 
  }     


export const address = async (firsts) => {
  var accessTokenGet = await AsyncStorage.getItem(StorageKeys.V_AccessToken);
  var customerAccessToken = JSON.parse(accessTokenGet);
    return client
      .query({
        query: gql`
        query {
          customer(customerAccessToken: "${customerAccessToken}") {
            id
            addresses(first: ${firsts}) {
              edges {
                node {
                  address1
                  address2
                  city
                  company
                  firstName
                  id
                  lastName
                  zip
                }
              }
            }
          }
        }
        `
      })
      .then((results) => {
        return results;
      })
      .catch(error => {
        return error
      }); 
  }     




export const product_list = (handle, firsts) => {
  return client
    .query({
      query: gql`
        query  {
            collectionByHandle(handle: "${handle}"){
              title
              products(first: ${firsts}) {
                edges {
                  cursor
                  node {
                    handle
                    id
                    images(first: ${firsts}) {
                      edges {
                        node {
                          src
                        }
                        cursor
                      }
                    }
                    title
                    variants(first: ${firsts}) {
                      edges {
                        node {
                          priceV2 {
                            amount
                            currencyCode
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
      `
    })
    .then((results) => {
      return results;
    })
    .catch(error => {
      return error
    }); 
}

export const product_details = (handle, firsts) => {
  return client
    .query({
      query: gql`
      {
        productByHandle(handle: "${handle}") {
          title
          id
          images(first: ${firsts}) {
            edges {
              node {
                src
              }
            }
          }
          variants(first: ${firsts}) {
            edges {
              node {
                priceV2 {
                  amount
                  currencyCode
                }
                available
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
          descriptionHtml
          description
          options(first: ${firsts}) {
            name
            values
          }
        }
      }
      `
    })
    .then((results) => {
      return results;
    })
    .catch(error => {
      return error
    }); 
}     

export const product_select = (arr, checkactive) => {
  console.log('arrrr',arr ,checkactive);
  return client
  .query({
    query: gql`
    
    query MyQuery($arr: [SelectedOptionInput!]!, $checkactive: String!){
      productByHandle(handle: $checkactive) {
        variantBySelectedOptions(selectedOptions: $arr) {
          available
          priceV2 {
            amount
            currencyCode
          }
          selectedOptions {
            name
            value
          }
        }
      }
    }
    
    `,variables:{ arr, checkactive }
    })
    .then((results) => {
      return results;
    })
    .catch(error => {
      return error
    }); 
}     