import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server";
import { dataSource } from "./config/db";

// to delete
const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
  }
`;

const books = [
  {
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
  },
];

const resolvers = {
  Query: {
    books: () => books,
  },
};

//end to delete

const port: number = 5000;

const start = async () => {
  await dataSource.initialize();

  //   const schema = await buildSchema({
  //     resolvers: [""],
  //     validate: { forbidUnknownValues: false },
  //   });

  //   const server = new ApolloServer({ schema });

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  try {
    const { url } = await server.listen({ port });
    console.log(`Server running on ${url}`);
  } catch (err) {
    console.error("Error while starting the server");
  }
};

void start();
