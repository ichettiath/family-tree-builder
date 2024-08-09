import React, { useState } from "react";
import {
   Dialog,
   DialogTitle,
   DialogContent,
   DialogActions,
   Button,
   TextField
} from "@mui/material";

interface EditPopupProps {
   isOpen: boolean;
   onClose: () => void;
   onSubmit: (name: string) => void;
}

const EditPopup = ({ isOpen, onClose, onSubmit }: EditPopupProps) => {
   const [showForm, setShowForm] = useState<string | null>(null);
   const [name, setName] = useState<string>("");

   const handleOptionClick = (option: string) => {
      setShowForm(option);
   };

   const handleFormSubmit = (event: React.FormEvent) => {
      event.preventDefault();
      onSubmit(name);
      setName("");
      setShowForm(null);
      onClose();
   };

   return (
      <Dialog open={isOpen} onClose={onClose}>
         <DialogTitle>Options</DialogTitle>
         <DialogContent>
            {showForm === null ? (
               <>
                  <Button onClick={() => handleOptionClick("edit")}>
                     Edit Member
                  </Button>
                  <Button onClick={() => handleOptionClick("add")}>
                     Add Partner
                  </Button>
               </>
            ) : (
               <form onSubmit={handleFormSubmit}>
                  <TextField
                     label="Name"
                     value={name}
                     onChange={(e) => setName(e.target.value)}
                     fullWidth
                     margin="normal"
                     required
                  />
                  <DialogActions>
                     <Button type="submit">Submit</Button>
                     <Button onClick={() => setShowForm(null)}>Cancel</Button>
                  </DialogActions>
               </form>
            )}
         </DialogContent>
      </Dialog>
   );
};

export default EditPopup;
