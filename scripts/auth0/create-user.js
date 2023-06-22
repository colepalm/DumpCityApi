const axios = require('axios');
const graphql = require('graphql')
const gql = require('graphql-tag');

/**
 * Handler that will be called during the execution of a PreUserRegistration flow.
 *
 * @param {Event} event - Details about the context and user that is attempting to register.
 * @param {PreUserRegistrationAPI} api - Interface whose methods can be used to change the behavior of the signup.
 */
exports.onExecutePreUserRegistration = async (event, api) => {
    const createUserMutation = gql`
        mutation createUser($email:String!){
            createUser(user: {
                email: $email
            }) { id }
        }
    `;

    await axios.post("https://dump-city-api.fly.dev/graphql", {
        query: graphql.print(createUserMutation),
        variables: {
            email: event.user.email
        }
    })
        .then(res => {
            if (res.data.data.createUser.id) {
                api.user.setAppMetadata("id", res.data.data.createUser.id);
            }
        })
        .catch(err => console.log(err))
};
