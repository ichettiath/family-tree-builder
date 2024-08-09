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
}

const FamilyNode = ({ node, style, info }: FamilyNodeProps) => {
   const [isOpen, setIsOpen] = useState<boolean>(false);

   const handleSubmit = (name: string) => {
      console.log("Submitted name:", name);
   };

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
            onSubmit={handleSubmit}
         />
      </div>
   );
};

export default FamilyNode;
