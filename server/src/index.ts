import "reflect-metadata"
import { ApolloServer } from 'apollo-server-express'
import * as Express from 'express'
import { buildSchema } from 'type-graphql'
import { connectDB } from "./dbconfig"
import * as cors from "cors"
import { CategoryResolver,AuthorResolver } from "./resolvers"


const main = async () => {

  await connectDB()

  const schema = await buildSchema({
    resolvers: [CategoryResolver,AuthorResolver]
  })

  const apolloServer = new ApolloServer({ schema, context: ({ req }: any) => ({ req }) })

  const app = Express()

  app.use(cors({ credentials: true, origin: true }))

  apolloServer.applyMiddleware({ app })

  app.listen(4000, () => {
    console.log('server started on http://localhost:4000/graphql');
  })
}

main()
