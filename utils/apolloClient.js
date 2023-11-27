import { ApolloClient, InMemoryCache } from '@apollo/client';

const spaceId = process.env.CONTENTFUL_SPACE_ID;
const environmentId = process.env.CONTENTFUL_ENV_ID;
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;

const client = new ApolloClient({
  uri: `https://graphql.contentful.com/content/v1/spaces/${spaceId}/environments/${environmentId}`,
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
  cache: new InMemoryCache(),
});

export default client;