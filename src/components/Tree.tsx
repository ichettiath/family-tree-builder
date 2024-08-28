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

type NodeMap = Map<number, Node>;

type TreeProps = {
   nodes: Node[];
};

const Tree: React.FC<TreeProps> = ({ nodes }) => {
   const [nodeMap, setNodeMap] = useState<NodeMap>(
      new Map([[0, { id: 0, name: "Click Me", gender: "" }]])
   );
   const treeRef = useRef<HTMLDivElement | null>(null);
   const familyRef = useRef<FamilyTree | null>(null);

   // const handleAddPartner = (nodeId: number) => {
   //    console.log(nodeMap);
   //    const newId = nodeMap.size;
   //    const node = nodeMap.get(nodeId);

   //    if (node) {
   //       const updatedNodeMap = new Map(nodeMap);

   //       if (node.pids && node.pids.length > 0) return;

   //       updatedNodeMap.set(nodeId, {
   //          ...node,
   //          pids: [newId]
   //       });

   //       updatedNodeMap.set(newId, {
   //          id: newId,
   //          name: "Click Me",
   //          gender: "",
   //          pids: [nodeId]
   //       });

   //       setNodeMap(updatedNodeMap);
   //    }
   // };

   // const handleAddChild = (nodeId: number) => {
   //    const newId = nodeMap.size;
   //    const node = nodeMap.get(nodeId);

   //    if (node) {
   //       const updatedNodeMap = new Map(nodeMap);

   //       updatedNodeMap.set(nodeId, {
   //          ...node,
   //          children: [newId]
   //       });

   //       if (node.pids && node.pids.length > 0) {
   //          const partnerId = node.pids[0];
   //          const partner = nodeMap.get(partnerId);
   //          if (partner) {
   //             updatedNodeMap.set(partnerId, {
   //                ...partner,
   //                children: [newId]
   //             });
   //          }
   //          updatedNodeMap.set(newId, {
   //             id: newId,
   //             name: "Click Me",
   //             gender: "",
   //             fid: nodeId,
   //             mid: partnerId
   //          });
   //       } else {
   //          updatedNodeMap.set(newId, {
   //             id: newId,
   //             name: "Click Me",
   //             gender: "",
   //             fid: nodeId
   //          });
   //       }

   //       setNodeMap(updatedNodeMap);
   //    }
   // };

   const handleAddChild = (parentId: number) => {
      const family = familyRef.current;
      if (family && parentId != null) {
         const uniqueId = parseInt(
            uuidv4().split("-").join("").substring(0, 12),
            16
         );
         family.addChildNode({
            id: uniqueId,
            fid: parentId,
            name: "child",
            gender: "female"
         });
      }
   };

   useEffect(() => {
      if (treeRef.current && !familyRef.current) {
         const editFormInstance = new editForm();
         //editFormInstance.setAddPartnerCallback(handleAddPartner);
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
         // if (familyInstance) {
         //    familyInstance.editUI.init(familyInstance);
         // }
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
