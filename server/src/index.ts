import "reflect-metadata"
import { ApolloServer } from 'apollo-server-express'
import * as Express from 'express'
import { buildSchema } from 'type-graphql'
import { connectDB } from "./dbconfig"
import * as cors from "cors"
import { CategoryResolver, AuthorResolver, UserResolver, BookResolver } from "./resolvers"
import * as cookieParser from 'cookie-parser'

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const main = async () => {

  await connectDB()

  const schema = await buildSchema({
    resolvers: [CategoryResolver, AuthorResolver, UserResolver, BookResolver]
  })

  const apolloServer = new ApolloServer({ schema, context: ({ req, res }: any) => ({ req, res }) })

  const app = Express()

  app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))

  app.use(cookieParser())

  apolloServer.applyMiddleware({ app, cors: false })

  app.listen(process.env.PORT, () => {
    console.log(`server started on http://localhost:${process.env.PORT}/graphql`);
  })
}

main()
