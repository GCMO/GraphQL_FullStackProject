import {gql} from '@apollo/client';

// GET all clients
const GET_CLIENTS = gql `
    query getClients{ 
        clients {
            id 
            name
            email
            phone
        }
    }
`;

export { GET_CLIENTS, }
