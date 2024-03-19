const Pagination = ({totalItems, itemsPerPage, setCurrentPage, currentPage, lastIndex, firstIndex, setItemsPerPage}) => {
    let pages = []
    for (let i = 1; i <= Math.ceil(totalItems/itemsPerPage); i++) {
        pages.push(i)
    }

    return (
        <div className="pagination">
            <div>
                {pages.map((page, index) => <button key={index} onClick={() => setCurrentPage(page)} className={page === currentPage ? 'active':''}>{page}</button>)}
                <span className="pagination-info">{firstIndex+1} - {lastIndex} of {totalItems}</span>
            </div>
            
            <span className='perpage'>
                Per Page 
                <select defaultValue={itemsPerPage} onChange={e => setItemsPerPage(e.target.value)} className='ms-2'>
                    <option value="1">1</option>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                </select>
            </span>
        </div>
    );
}
 
export default Pagination;