import { useState } from 'react';
import UserForm from '../Forms/UserForm';
import CRUDOverlay from '../CRUDOverlay';

const UserDetails = ({user, refresh, _regions}) => {
    const [showModal, setShowModal] = useState(false)
    const toggleShowModal = () => setShowModal(!showModal)
    
    return (
            <tr>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td><input type="checkbox" defaultChecked={user.verified} className='form-check-input' /></td>
                <td><input type="checkbox" defaultChecked={user.active} className='form-check-input' /></td>
                <td>
                    <div className="dropdown">
                        <button className="dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Actions</button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <span className="dropdown-item" onClick={toggleShowModal}>Profile</span>
                        </div>
                    </div>
                    {showModal && <CRUDOverlay element={<UserForm user={user} refresh={refresh} regions={_regions} crud={`${user.firstName} ${user.lastName}`} />} visible={toggleShowModal} />}
                </td>
            </tr>
    );
}
 
export default UserDetails;