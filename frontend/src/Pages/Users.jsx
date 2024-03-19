import { useCallback, useEffect, useState } from "react";
import UserForm from "../Components/Forms/UserForm";
import UserDetails from "../Components/Records/UserDetails";
import Pagination from "../Components/Pagination";
import CRUDOverlay from "../Components/CRUDOverlay";
import BasicFunctions from "../Components/BasicFunctions";

const Users = () => {
    const [users, setUsers] = useState([])
    const [regions, setRegions] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(5)
    const [filteredUsers, setFilteredUsers] = useState([]);

    const lastItemIndex = currentPage * itemsPerPage
    const firstItemIndex = lastItemIndex - itemsPerPage

    const currentUsers = filteredUsers.slice(firstItemIndex, lastItemIndex)

    const [showModal, setShowModal] = useState(false)
    const toggleShowModal = () => setShowModal(!showModal)

    const fetchUsers = useCallback(async () => {
        try {
            const response = await fetch('/api/users/fetch') // except admins
            const json = await response.json()
            if ( response.ok ) setUsers(json)
        } catch (e) {
            console.log(e)
        }
    },[])

    const fetchRegions = useCallback(async () => {
        console.log("[React] Sending fetch regions request...")
        try {
            const response = await fetch(`/api/locations/regions`)
            const json = await response.json()
            if (response.ok) {
                setRegions(json)
                console.log("Regions: ", json)
            } else (
                console.log("[React] Level 1")
            )
        } catch (e) {
            console.log("Throw error")
        }
    }, [])

    useEffect(() => {
        fetchUsers()
        fetchRegions()
    }, [fetchUsers, fetchRegions])

    useEffect(() => {
        const filtered = users.filter(user => {
            const user_name = user.firstName+' '+user.lastName
            return user_name.toLowerCase().includes(searchTerm.toLowerCase())
        });
          setFilteredUsers(filtered);
    }, [searchTerm, users]);

    const refresh = () => fetchUsers()

    return (
        <div className="page">
            <div className="page-contents">
                <div className="highlight"><h3>Manage Users</h3></div>
                <div className="users-table">
                    <BasicFunctions toggleShowModal={toggleShowModal} setSearchTerm={setSearchTerm} searchTerm={searchTerm}/>

                    <table className="table table-light table-sm">
                        <thead className=''>
                            <tr>
                                <th scope="col">First Name</th>
                                <th scope="col">Last Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Verified</th>
                                <th scope="col">Active</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {currentUsers.length > 0 && currentUsers.map( (user, i) => (
                                <UserDetails user={user} key={i} refresh={refresh} _regions={regions}/>
                            ) ) }
                        </tbody>
                    </table>

                    <Pagination totalItems={users.length} itemsPerPage={itemsPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage} lastIndex={lastItemIndex} firstIndex={firstItemIndex} setItemsPerPage={setItemsPerPage}/>

                    {showModal && <CRUDOverlay element={<UserForm refresh={refresh} regions={regions} crud='Create User'/>} visible={toggleShowModal} />}
                </div>
            </div>
        </div>
    );
}
 
export default Users;