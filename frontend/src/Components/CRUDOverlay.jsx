const CRUDOverlay = ({element, visible}) => {
    return (
        <span className="crud-modal">
            <span className="modal-content">
                <span className="btn-close" onClick={visible}></span>
                {element}
            </span>
        </span>
    );
}
 
export default CRUDOverlay;