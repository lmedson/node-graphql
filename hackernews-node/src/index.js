const { GraphQLServer } = require('graphql-yoga');

// 1
const links = [
  {
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL',
  },
];

let idCount = links.length;

const resolvers = {
  Query: {
    info: () => 'This is the API of a Hackernews Clone',
    // 2
    feed: () => links,
  },

  Mutation: {
    // 2
    post: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      };
      links.push(link);
      return link;
    },
    deleteLink: (parent, args) => {
      const deletion = links.filter((currentLink) => {
        if (currentLink.id === args.id) {
          links.splice(links.indexOf(currentLink), 1);
        }
        return links;
      });
      return deletion;
    },
  },

  // 3
  Link: {
    id: parent => parent.id,
    description: parent => parent.description,
    url: parent => parent.url,
  },
};

const server = new GraphQLServer({
  typeDefs: './schema.graphql',
  resolvers,
});

server.start(() => console.log('Server is running on http://localhost:4000'));