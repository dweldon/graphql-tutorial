const { makeExecutableSchema } = require('graphql-tools');

const Post = require('./Post');
const Author = require('./Author');
const resolvers = require('../data/resolvers');

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
  typeDefs: [Schema, Query, Mutation, Post, Author],
  resolvers,
});
