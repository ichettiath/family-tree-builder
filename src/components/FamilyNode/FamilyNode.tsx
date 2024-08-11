import React, { useState } from "react";
import classNames from "classnames";
import { ExtNode } from "relatives-tree/lib/types";
import EditPopup from "../EditPopup/EditPopup";
import css from "./FamilyNode.module.css";
import { Info } from "../FamilyTree/FamilyTree";

interface FamilyNodeProps {
   node: ExtNode;
   style?: React.CSSProperties;
   info: Info | undefined;
   handleAdd: (info: Info, type: string, id: number) => void;
   handleEdit: (info: Info, id: number) => void;
}

const FamilyNode = ({
   node,
   style,
   info,
   handleAdd,
   handleEdit
}: FamilyNodeProps) => {
   const [isOpen, setIsOpen] = useState<boolean>(false);

   return (
      <div className={css.root} style={style} title={node.id}>
         <div
            className={classNames(css.inner, css[node.gender])}
            onClick={() => setIsOpen(true)}
         >
            {info && info.name}
         </div>
         <EditPopup
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            onAdd={(info, type) => handleAdd(info, type, Number(node.id))}
            onEdit={(info) => handleEdit(info, Number(node.id))}
         />
      </div>
   );
};

export default FamilyNode;
