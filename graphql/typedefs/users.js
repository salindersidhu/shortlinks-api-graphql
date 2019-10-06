module.exports = {
    types: `
        type AuthData {
            token: String!
        }
    `,
    inputs: `
        input LoginInput {
            email: String!
            password: String!
        }
        input RegisterInput {
            email: String!
            username: String!
            password: String!
            confirmPassword: String!
        }
    `,
    mutations: `
        login(loginInput: LoginInput): AuthData!
        register(registerInput: RegisterInput): AuthData!
    `
};
