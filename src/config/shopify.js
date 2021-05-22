// Doc : https://shopify.github.io/js-buy-sdk/

import Client from "shopify-buy";

// Initializing a client to return content in the store's primary language
const shopify = Client.buildClient({
  domain: "heels-spurs.myshopify.com",
  storefrontAccessToken: "7159788693928bde9cf03fe9765ad6a3",
});

export default shopify;
