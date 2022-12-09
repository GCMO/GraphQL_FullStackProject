// this is where the Clients are fetched via GraphQL

import { useQuery} from '@apollo/client'
import { GET_CLIENTS } from '../queries/clientQueries';
// Components
import ClientRow from './ClientRow';
import Spinner from './Spinner';
import AddClientModal from './AddClientModal';

// create a const to get the clients, it reflect exactly the graphiql query
// then you pass the useQuery in the renderZone. Apollo basically becomes a state manager
// const GET_CLIENTS = gql `
    // query getClients{ 
    //     clients {
    //         id 
    //         name
    //         email
    //         phone
    //     }
    // }
// `;

const Clients = () => {
  const {data, error, loading} = useQuery(GET_CLIENTS);
    if (loading) return <Spinner />;
    if (error) return <h3>Something Went Wrong</h3>;

  return (
    <>  
      <h3>CLIENTS</h3>
      <AddClientModal />
        { !loading && !error && 
            <table className='table table-hover mt-3'>
                <thead>
                  <tr> 
                    <th>Name:</th>
                    <th>Email:</th>
                    <th>Phone:</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                    {data.clients.map(client => (
                        <ClientRow key={client.id} client={client} />
                    ))}
                </tbody>
            </table>
        }
    </>
  )
};

export default Clients