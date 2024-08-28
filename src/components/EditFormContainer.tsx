const EditFormContainer = () => {
   return (
      <div id="editForm" className="edit-form">
         <div id="editForm_title" className="edit-form-title">
            Edit Form
         </div>
         <div className="edit-form-content">
            <div className="form-group">
               <label htmlFor="name" className="form-label">
                  Name
               </label>
               <input id="name" className="form-input" />
            </div>
            <div className="form-group">
               <label htmlFor="title" className="form-label">
                  Title
               </label>
               <input id="title" className="form-input" />
            </div>
            <button id="add-partner">Add Partner</button>
            <button id="add-child">Add Child</button>
            <button id="add-parent">Add Parent</button>
            <div className="form-buttons">
               <button id="cancel" className="form-button">
                  Cancel
               </button>
               <button id="save" className="form-button">
                  Save
               </button>
            </div>
         </div>
      </div>
   );
};

export default EditFormContainer;
