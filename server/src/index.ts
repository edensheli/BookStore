import "reflect-metadata"
import { ApolloServer } from 'apollo-server-express'
import * as Express from 'express'
import { buildSchema } from 'type-graphql'
import { connectDB } from "./dbconfig"
import * as cors from "cors"
import { CategoryResolver, AuthorResolver,UserResolver } from "./resolvers"
import * as cookieParser from 'cookie-parser'

const main = async () => {

  await connectDB()

  const schema = await buildSchema({
    resolvers: [CategoryResolver, AuthorResolver, UserResolver]
  })

  const apolloServer = new ApolloServer({ schema, context: ({ req, res }: any) => ({ req, res }) })

  const app = Express()

  app.use(cors({ credentials: true, origin: true }))

  app.use(cookieParser())

  apolloServer.applyMiddleware({ app })

  app.listen(4000, () => {
    console.log('server started on http://localhost:4000/graphql');
  })
}

main()
