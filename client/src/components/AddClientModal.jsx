import { useState } from "react";
import { FaUser } from 'react-icons/fa';
import { useMutation } from "@apollo/client";
import { ADD_CLIENT } from '../mutations/clientMutations'
import { GET_CLIENTS } from "../queries/clientQueries";


const AddClientModal = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

const [addClient] = useMutation(ADD_CLIENT, {
    variables:{ name, email, phone},
    refetchQueries: [{query: GET_CLIENTS}], // so easy to refect, forget about caching
})

const onSubmit = (e) => {
    e.preventDefault();
    
    if(name === '' || email === '' || phone === '') {
        return alert('Please Fill in ALL fields');
    }
    addClient(name, email, phone);
    setName('');
    setEmail('');
    setPhone(''); 
    console.log(name, email, phone)
};

  return (
    <>  
        <button
        type='button'
        className='btn btn-secondary'
        data-bs-toggle='modal'
        data-bs-target='#addClientModal'
      >
        <div className='d-flex align-items-center'>
          <FaUser className='icon' />
          <div>Add Client</div>
        </div>
      </button>

      <div
        className='modal fade'
        id='addClientModal'
        aria-labelledby='addClientModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='addClientModalLabel'>
                Add Client
              </h5>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div className='modal-body'>
              <form onSubmit={onSubmit}>
                <div className='mb-3'>
                  <label className='form-label'>Name</label>
                  <input
                    type='text'
                    className='form-control'
                    id='name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className='mb-3'>
                  <label className='form-label'>Email</label>
                  <input
                    type='email'
                    className='form-control'
                    id='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className='mb-3'>
                  <label className='form-label'>Phone</label>
                  <input
                    type='text'
                    className='form-control'
                    id='phone'
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <button
                  type='submit'
                  data-bs-dismiss='modal'
                  className='btn btn-secondary'
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    {/* <form onSubmit={onSubmit}>
        <div className="form-group d-flex align-items-left mb-1">
            <div className="form-group col-md-12 ">
                <input type="text" className="form-control"  placeholder="First & Last Name" value={name} onChange={(e) => setName(e.target.value)} 
                />
            </div>
        </div> 
        <div className="form-group d-flex align-items-left">
            <div className="form-group col-md-6">
                <input type="text" className="form-control" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} 
                />
            </div>
            <div className="form-group col-md-6 mb-1">
                <input type="text" className="form-control"   placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} 
                />
            </div>
        </div> 
            <button className="d-flex align-items-center btn btn-primary" type="submit" >ADD CLIENT
            <FaUser className="icon" />
            </button>
        </form>
        <hr/> */}
    </>
  )
}

export default AddClientModal