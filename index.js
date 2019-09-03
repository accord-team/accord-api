"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_1 = require("apollo-server");
var graphql_tools_1 = require("graphql-tools");
var jwt = require("jsonwebtoken");
var lodash_1 = require("lodash");
var rootTypes_1 = require("./resources/rootTypes");
var User_schema_1 = require("./resources/User/User.schema");
var schema = graphql_tools_1.makeExecutableSchema({
    typeDefs: [rootTypes_1.rootTypeDefs, User_schema_1.userTypeDefs],
    resolvers: lodash_1.merge(User_schema_1.userResolvers),
});
var server = new apollo_server_1.ApolloServer({
    schema: schema,
    playground: true,
    introspection: true,
    mocks: false,
    debug: true,
    tracing: true,
    context: function (_a) {
        var req = _a.req;
        // Auth
        var noAuthEndpoints = [];
        var operationName = req.body.operationName;
        var token = req.headers.Authorization;
        var decodedToken = {};
        if (noAuthEndpoints.indexOf(operationName) === -1 && false) {
            try {
                decodedToken = jwt.verify(token, '1234');
            }
            catch (_b) {
                throw new apollo_server_1.AuthenticationError('Aaaa, takiego wała, spierdalaj');
            }
        }
        return { token: decodedToken };
    }
});
server.listen({ port: process.env.PORT || 4000 }).then(function (_a) {
    var url = _a.url;
    console.log("\uD83D\uDE80 Server ready at " + url);
});
//# sourceMappingURL=index.js.map