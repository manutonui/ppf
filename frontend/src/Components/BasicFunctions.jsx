
const BasicFunctions = ({toggleShowModal, setSearchTerm, searchTerm}) => {
    return (
        <div className="functions">
            <button className="btn btn-primary btn-sm" onClick={toggleShowModal}><i className="fa-solid fa-plus"></i></button>
            <input className="searchField" placeholder='Search' value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        </div>
    );
}
 
export default BasicFunctions;