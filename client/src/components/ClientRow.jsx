import {FaTrash} from 'react-icons/fa';
import { useMutation } from '@apollo/client';
import { DELETE_CLIENT } from '../mutations/clientMutations';
import { GET_CLIENTS } from '../queries/clientQueries';


const ClientRow = ({client}) => { 
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: client.id },
    refetchQueries: [{query: GET_CLIENTS}], // refetch otherwise you have to reload the page when deleting. It could be done with cache reload but very cumbersome
  });
 
  return (
    <tr>
        <td>{client.name}</td>
        <td>{client.email}</td>
        <td>{client.phone}</td>
        <td>
            <button className='btn btn-danger btn-sm' onClick={deleteClient}>
                <FaTrash />
            </button>
        </td>
    </tr>
  )
}

export default ClientRow