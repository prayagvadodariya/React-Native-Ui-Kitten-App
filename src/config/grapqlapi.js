import { ApolloClient, InMemoryCache } from '@apollo/client';

const SHOPIFY_SITE_DOMAIN = 'heels-spurs.myshopify.com';
const STOREFRONT_ACCESS_TOKEN = 'e309e5dab167ea6319b9030318b8ebc2';

const client = new ApolloClient({
  // uri: 'https://48p1r2roz4.sse.codesandbox.io',
 
  uri: `https://${SHOPIFY_SITE_DOMAIN}/api/2020-04/graphql.json`,
  headers: {
    'X-Shopify-Storefront-Access-Token': STOREFRONT_ACCESS_TOKEN,
    'Content-Type': 'application/json',
  },
  cache: new InMemoryCache(),
  queryDeduplication: false,
  defaultOptions: {
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
    mutate: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  },
});

export default client; 
