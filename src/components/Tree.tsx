import React, { useRef, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import FamilyTree from "../FamilyTreeJS/familytree.js";
import editForm from "./EditForm";
import EditFormContainer from "./EditFormContainer";
import "./EditForm.css";

interface Node {
   id: number;
   name: string;
   gender?: string;
   pids?: number[];
   fid?: number;
   mid?: number;
   children?: number[];
}

type TreeProps = {
   nodes: Node[];
};

const Tree: React.FC<TreeProps> = ({ nodes }) => {
   const treeRef = useRef<HTMLDivElement | null>(null);
   const familyRef = useRef<FamilyTree | null>(null);
   const [partnerMap, setPartnetMap] = useState<Map<number, number>>(new Map());

   const handleAddChild = (parentId: number) => {
      const family = familyRef.current;
      if (family && partnerMap.has(parentId) && parentId != null) {
         const uniqueId = parseInt(
            uuidv4().split("-").join("").substring(0, 12),
            16
         );
         let mid = null;
         if (partnerMap.has(parentId)) {
            mid = partnerMap.get(parentId);
         }
         family.addChildNode({
            id: uniqueId,
            fid: parentId,
            name: "child",
            gender: "female",
            mid: mid
         });
         console.log(family.nodes);
      }
   };

   const handleAddPartner = (partnerId: number) => {
      const family = familyRef.current;
      if (family && partnerId != null && !partnerMap.has(partnerId)) {
         const uniqueId = parseInt(
            uuidv4().split("-").join("").substring(0, 12),
            16
         );
         family.addPartnerNode({
            id: uniqueId,
            pids: [partnerId],
            name: "partner",
            gender: "male"
         });
         if (family.nodes[partnerId].childrenIds) {
            const childrenIds = family.nodes[partnerId].childrenIds;
            if (childrenIds) {
               for (let i = 0; i < childrenIds.length; i++) {
                  family.addChildNode({
                     mid: uniqueId,
                     ...family.nodes[childrenIds[i]]
                  });
               }
            }
            setPartnetMap((prevMap) => {
               if (prevMap) {
                  prevMap.set(partnerId, uniqueId);
                  prevMap.set(uniqueId, partnerId);
               }
               return prevMap;
            });
            console.log(family.nodes);
         }
      }
   };

   useEffect(() => {
      if (treeRef.current && !familyRef.current) {
         const editFormInstance = new editForm();
         editFormInstance.setAddPartnerCallback(handleAddPartner);
         editFormInstance.setAddChildCallback(handleAddChild);

         const familyInstance = new FamilyTree(treeRef.current, {
            mouseScrool: FamilyTree.action.none,
            editUI: editFormInstance,
            nodeBinding: {
               field_0: "name",
               field_1: "id"
            },
            nodes: nodes
         });
         familyRef.current = familyInstance;
      }
   }, [nodes]);

   return (
      <div>
         <EditFormContainer />
         <div ref={treeRef} style={{ width: "100%", height: "100%" }} />
      </div>
   );
};

export default Tree;
