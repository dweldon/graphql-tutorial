/* eslint-disable global-require, import/no-dynamic-require */
const glob = require('glob');
const path = require('path');
const resolvers = require('../data/resolvers');
const { makeExecutableSchema } = require('graphql-tools');

// Require all schema files in this directory.
const schemas = glob
  .sync(path.join(__dirname, '*.js'))
  .filter(f => f !== __filename)
  .map(f => require(f));

const Query = `
type Query {
  posts: [Post]
}
`;

const Mutation = `
type Mutation {
  upvotePost(postId: Int!): Post
}
`;

const Schema = `
schema {
  query: Query
  mutation: Mutation
}
`;

module.exports = makeExecutableSchema({
  typeDefs: [Schema, Query, Mutation, ...schemas],
  resolvers,
});
