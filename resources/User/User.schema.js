"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var User_model_1 = require("./User.model");
var jwt = require("jsonwebtoken");
var apollo_server_1 = require("apollo-server");
var userTypeDefs = "\n  input UserInput {\n    first_name: String\n    last_name: String\n    email: String\n    password: String\n    avatar: String\n    is_payed_user: Boolean\n  }\n\n  input UserFilter {\n    first_name: String\n  }\n\n  type User {\n    id: ID!\n    first_name: String\n    last_name: String\n    email: String!\n    password: String\n    avatar: String\n    is_payed_user: Boolean\n    created_at: String\n    updated_at: String\n  }\n\n  type Login {\n    token: String\n  }\n\n  extend type Query {\n    login(first_name: String!): Login\n    user(id: ID!): User\n    users(filter: UserFilter!, offset: Int, limit: Int): [User]\n    usersAll: [User]\n  }\n\n  extend type Mutation {\n    createUser (props: UserInput!): User\n    updateUser(id: ID!, props: UserInput!): Boolean\n    removeUser (id: ID!): Boolean\n  }\n";
exports.userTypeDefs = userTypeDefs;
var userResolvers = {
    Query: {
        login: function (_, _a) {
            var first_name = _a.first_name;
            return __awaiter(_this, void 0, void 0, function () {
                var user, token;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, User_model_1.User.findOne({ first_name: first_name })];
                        case 1:
                            user = _b.sent();
                            token = '';
                            if (user) {
                                token = jwt.sign({ id: user.id, expiresIn: '1h' }, '1234');
                            }
                            else {
                                throw new apollo_server_1.AuthenticationError('Aaaa, takiego wała, spierdalaj');
                            }
                            return [2 /*return*/, { token: token }];
                    }
                });
            });
        },
        user: function (_, _a) {
            var id = _a.id;
            return User_model_1.User.findById(id);
        },
        users: function (_, _a) {
            var filter = _a.filter, offset = _a.offset, limit = _a.limit;
            return User_model_1.User.find(filter, offset, limit);
        },
        usersAll: function () { return User_model_1.User.findAll(); },
    },
    Mutation: {
        createUser: function (_, _a) {
            var props = _a.props;
            return User_model_1.User.create(props);
        },
        updateUser: function (_, _a) {
            var id = _a.id, props = _a.props;
            return User_model_1.User.update(id, props);
        },
        removeUser: function (_, _a) {
            var id = _a.id;
            return User_model_1.User.destroy(id);
        }
    },
};
exports.userResolvers = userResolvers;
//# sourceMappingURL=User.schema.js.map