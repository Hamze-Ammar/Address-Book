import React from "react";

const ConfirmDelete = ({ setShowDelete, setConfirmDelete }) => {
  return (
    <div>
      <div className="modal-delete">
        <span
          className="close"
          title="Close Modal"
          onClick={() => {
            setShowDelete(false);
          }}
        >
          ×
        </span>
        <form className="modal-content-delete">
          <div className="container-delete">
            <h1>Delete Contact</h1>
            <p>Are you sure you want to delete this contact?</p>

            <div className="clearfix-delete">
              <button
                type="button"
                className="cancelbtn"
                onClick={() => {
                  setShowDelete(false);
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                className="deletebtn"
                onClick={() => {
                  setConfirmDelete(true);
                  setShowDelete(false);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConfirmDelete;
