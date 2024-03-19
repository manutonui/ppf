import { useCallback, useEffect, useState } from 'react';

import RegionDetails from '../Components/Records/RegionDetails';
import RegionForm from '../Components/Forms/RegionForm';
import Pagination from '../Components/Pagination';
import CRUDOverlay from '../Components/CRUDOverlay';
import BasicFunctions from '../Components/BasicFunctions';

const Regions = () => {
    
    const [regions, setRegions] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(5)
    const [filteredRegions, setFilteredRegions] = useState([]);

    const lastItemIndex = currentPage * itemsPerPage
    const firstItemIndex = lastItemIndex - itemsPerPage

    const currentRegions = filteredRegions.slice(firstItemIndex, lastItemIndex)

    const toggleShowModal = () => setShowModal(!showModal)

    const fetchRegions = useCallback(async () => {
        console.log(`[FETCH REGIONS]`)
        try {
            const response = await fetch(`/api/locations/regions`)
            const json = await response.json()
            if ( response.ok ) setRegions(json)
        } catch (e) { console.log(e) }
    }, [])

    useEffect(() => { fetchRegions() }, [fetchRegions])

    useEffect(() => { // Filter regions whenever the searchTerm or regions change
        const filtered = regions.filter(region =>
          region.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredRegions(filtered);
    }, [searchTerm, regions]);

    const refresh = () => fetchRegions()

    return (
        <div className="page">
            <div className="page-contents">
                <div className="highlight"><h3>Regions</h3></div>
                <div className="highlight-sm"><h5>Manage Regions</h5></div>
                <div className="regions-table">
                    <BasicFunctions toggleShowModal={toggleShowModal} setSearchTerm={setSearchTerm} searchTerm={searchTerm}/>
                    <table className="table table-sm">
                        <thead>
                            <tr>
                                <th scope="col">Region</th>
                                <th scope="col">Capital</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {currentRegions.length > 0 && currentRegions.map( (region, index) => (
                                <RegionDetails region={region} key={index} refresh={refresh}/>
                            ) ) }
                        </tbody>
                    </table>
                    <Pagination totalItems={regions.length} itemsPerPage={itemsPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage} lastIndex={lastItemIndex} firstIndex={firstItemIndex} setItemsPerPage={setItemsPerPage} />

                    {showModal && <CRUDOverlay element={<RegionForm refresh={refresh} crud='Create Region'/>} visible={toggleShowModal} />}
                </div>
            </div>     
        </div>
    );
}
 
export default Regions;