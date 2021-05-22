export const Api = "https://shopify-mobile-app-server.herokuapp.com/api/";

const accessToken ="enter yot token"

export const headers = {  
    'Content-Type': 'application/json',
    'Accept': 'application/json'
};

export const headers1= {
    'Content-Type': 'application/json',
    'Accept' : 'application/json',
    'Authorization' : 'Bearer' + accessToken
}