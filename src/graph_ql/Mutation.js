import { gql } from '@apollo/client';
import client from '../config/grapqlapi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as StorageKeys from '../constant/StorageKeys';

export const signup = (email,password,firstName,lastName,phone) => {
    return client
    .mutate({
      mutation: gql`
      mutation {
        customerCreate(
          input: {email: "${email}", password: "${password}", firstName: "${firstName}", lastName: "${lastName}"}
        ) {
          customerUserErrors {
            message
            code
            field
          }
          customer {
            email
            firstName
            lastName
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

export const login = (email,password) => {
  return client
  .mutate({
    mutation: gql`
    mutation {
        customerAccessTokenCreate(input: {email: "${email}", password: "${password}"}) {
          customerAccessToken {
            accessToken
          }
          customerUserErrors {
            code
            field
            message
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

export const create_address = async (address1,address2,city,company,firstName,lastName,zip) => {
  var accessTokenGet = await AsyncStorage.getItem(StorageKeys.V_AccessToken);
  const customerAccessToken = JSON.parse(accessTokenGet);
  return client
  .mutate({
    mutation: gql`
    mutation {
      customerAddressCreate(
        address: {address1: "${address1}", address2: "${address2}", city: "${city}", company: "${company}", firstName: "${firstName}", lastName: "${lastName}", zip: "${zip}"}
        customerAccessToken: "${customerAccessToken}"
      ) {
        customerAddress {
          address1
          address2
          city
          company
          firstName
          id
          lastName
          zip
        }
        customerUserErrors {
          code
          field
          message
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

export const remove_address = async (id) => {
  var accessTokenGet = await AsyncStorage.getItem(StorageKeys.V_AccessToken);
  const customerAccessToken = JSON.parse(accessTokenGet);
  return client
  .mutate({
    mutation: gql`
    mutation MyMutation {
      customerAddressDelete(customerAccessToken: "${customerAccessToken}", id: "${id}") {
        customerUserErrors {
          code
          field
          message
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

export const edit_address = async (address1,address2,city,company,firstName,lastName,zip,id) => {
  console.log('id',id);
  var accessTokenGet = await AsyncStorage.getItem(StorageKeys.V_AccessToken);
  const customerAccessToken = JSON.parse(accessTokenGet);
  return client
  .mutate({
    mutation: gql`
    mutation  {
      customerAddressUpdate(
        address: {address1: "${address1}", address2: "${address2}", city: "${city}", company: "${company}", firstName: "${firstName}", lastName: "${lastName}", zip: "${zip}"}
        customerAccessToken: "${customerAccessToken}"
        id: "${id}"
      ) {
        customerAddress {
          address1
          address2
          city
          company
          firstName
          id
          lastName
          zip
        }
        customerUserErrors {
          code
          field
          message
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