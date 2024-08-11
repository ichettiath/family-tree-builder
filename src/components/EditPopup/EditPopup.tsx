import React, { useState } from "react";
import {
   Dialog,
   DialogTitle,
   DialogContent,
   DialogActions,
   Button,
   TextField
} from "@mui/material";
import { Info } from "../FamilyTree/FamilyTree";

interface EditPopupProps {
   isOpen: boolean;
   onClose: () => void;
   onAdd: (info: Info, type: string) => void;
   onEdit: (info: Info) => void;
}

const EditPopup = ({ isOpen, onClose, onEdit, onAdd }: EditPopupProps) => {
   const [formType, setFormType] = useState<string>("");
   const [name, setName] = useState<string>("");

   const handleFormSubmit = (event: React.FormEvent) => {
      event.preventDefault();
      if (name === "") return;
      if (formType === "edit") onEdit({ name: name } as Info);
      else onAdd({ name: name } as Info, formType);
      setName("");
      setFormType("");
      onClose();
   };

   return (
      <Dialog
         open={isOpen}
         onClose={() => {
            if (formType) setFormType("");
            else onClose();
         }}
      >
         <DialogTitle>Options</DialogTitle>
         <DialogContent>
            {formType === "" ? (
               <>
                  <Button onClick={() => setFormType("edit")}>
                     Edit Member
                  </Button>
                  <Button onClick={() => setFormType("partner")}>
                     Add Partner
                  </Button>
                  <Button onClick={() => setFormType("child")}>
                     Add Child
                  </Button>
                  <Button onClick={() => setFormType("parent")}>
                     Add Parent
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
                     <Button onClick={() => setFormType("")}>Cancel</Button>
                  </DialogActions>
               </form>
            )}
         </DialogContent>
      </Dialog>
   );
};

export default EditPopup;
