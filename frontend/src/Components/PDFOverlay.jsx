const PDFOverlay = ({element, visible}) => {
    return (
        <span className="pdf-modal">
            <span className="modal-content">
                <span className="btn-close" onClick={visible}></span>
                {element}
            </span>
        </span>
    );
}
 
export default PDFOverlay;