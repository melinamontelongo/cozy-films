const Modal = ({ id, body }) => {
    return (<>
        <input type="checkbox" id={id} className="modal-toggle" />
        <div className="modal p-4">
            <div className="modal-box bg-base-100">
                <label htmlFor={id} className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                {body}
            </div>
        </div></>
    );
};

export default Modal;