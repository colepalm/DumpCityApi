const axios = require('axios');
const graphql = require('graphql')
const gql = require('graphql-tag');
/**
 * Handler that will be called during the execution of a PostUserRegistration flow.
 *
 * @param {Event} event - Details about the context and user that has registered.
 */
exports.onExecutePostUserRegistration = async (event) => {
    const createSetMutation = gql`
        mutation createUser($email:String!){
            createUser(user: {
                email: $email
            }) { id }
        }
    `;

    await axios.post("https://dump-city-api.herokuapp.com/graphql", {
        query: graphql.print(createSetMutation),
        variables: {
            email: event.user.email
        }
    })
        .then(res => console.log(res))
        .catch(err => console.log(err))
};
