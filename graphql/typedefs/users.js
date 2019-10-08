module.exports = {
    types: `
        """
        User authentication data.
        """
        type AuthData {
            """
            JSON Web Token containing User's ID.
            """
            token: String!
        }
    `,
    inputs: `
        """
        User login input.
        """
        input LoginInput {
            """
            Existing User's email.
            """
            email: String!
            """
            Existing User's password.
            """
            password: String!
        }
        """
        User registration input.
        """
        input RegisterInput {
            """
            New User's email.
            """
            email: String!
            """
            New User's name.
            """
            username: String!
            """
            New User's password.
            """
            password: String!
            """
            New User's password.
            """
            confirmPassword: String!
        }
    `,
    mutations: `
        """
        Login and authenticate an existing User.
        """
        login(loginInput: LoginInput): AuthData!
        """
        Register and authenticate a new User.
        """
        register(registerInput: RegisterInput): AuthData!
    `
};
