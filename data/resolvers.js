const _ = require('lodash');

const authors = [
  { id: 1, firstName: 'Tom', lastName: 'Coleman' },
  { id: 2, firstName: 'Sashko', lastName: 'Stubailo' },
];

const posts = [
  { id: 1, authorId: 1, title: 'Introduction to GraphQL', votes: 2 },
  { id: 2, authorId: 2, title: 'GraphQL Rocks', votes: 3 },
  { id: 3, authorId: 2, title: 'Advanced GraphQL', votes: 1 },
];

const resolveFunctions = {
  Query: {
    posts() {
      return posts;
    },
  },
  Mutation: {
    upvotePost(x, { postId }) {
      const post = _.find(posts, { id: postId });
      if (!post) throw new Error(`Post not found with id: ${postId}`);
      post.votes += 1;
      return post;
    },
  },
  Author: {
    posts(author) {
      return _.filter(posts, { authorId: author.id });
    },
  },
  Post: {
    author(post) {
      return _.find(authors, { id: post.authorId });
    },
  },
};

module.exports = resolveFunctions;
