const express = require("express");
const graphqlHTTP = require("express-graphql");
const mongoose = require("mongoose");
// const schema = require("./schema/schema");
const schema2 = require("./test-schema");

const app = express();

const PORT = process.env.PORT || 4000;

mongoose.connect("mongodb://alabs:test123@ds119060.mlab.com:19060/gqllearning");
mongoose.connection.once("open", () => console.log("Connected to DB"));

app.use("/graphql", graphqlHTTP({
    schema: schema2,
    // schema,
    graphiql: true
}));

app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));