import React, { useRef, useState, useEffect } from "react";
import FamilyTree from "@balkangraph/familytree.js";

interface Node {
   id: number;
   name: string;
   gender: string;
}

type NodeMap = Map<number, Node>;

const Tree = () => {
   const [nodeMap, setNodeMap] = useState<NodeMap>(
      new Map([[0, { id: 0, name: "Me", gender: "" }]])
   );

   const treeRef = useRef<HTMLDivElement | null>(null);

   const initializeTree = () => {
      if (treeRef.current) {
         new FamilyTree(treeRef.current, {
            nodes: [...nodeMap.values()],
            nodeBinding: {
               field_0: "name"
            },
            enableSearch: false
         });
      }
   };

   useEffect(() => {
      initializeTree();
   }, [nodeMap]);

   return (
      <div>
         <div ref={treeRef} style={{ width: "100%", height: "100%" }} />
      </div>
   );
};

export default Tree;
