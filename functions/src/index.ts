import * as functions from 'firebase-functions'
import { ApolloServer } from 'apollo-server-cloud-functions';
import { makeExecutableSchema } from 'graphql-tools';

import { merge } from 'lodash';

import { rootTypeDefs } from './resources/rootTypes';
import { userResolvers, userTypeDefs } from './resources/User/User.schema';

import { firebase, knex } from './db';

const schema = makeExecutableSchema({
  typeDefs: [rootTypeDefs, userTypeDefs],
  resolvers: merge(userResolvers),
});

const server = new ApolloServer({
  schema,
  playground: true,
  introspection: true,
})


export const apollo = functions.https.onRequest(server.createHandler())
