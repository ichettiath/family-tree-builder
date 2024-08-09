import React, { useState } from "react";
import { Node, ExtNode } from "relatives-tree/lib/types";
import ReactFamilyTree from "react-family-tree";
import PinchZoomPan from "../PinchZoomPan/PinchZoomPan";
import FamilyNode from "../FamilyNode/FamilyNode";
import css from "./FamilyTree.module.css";

const WIDTH = 70;
const HEIGHT = 80;

export interface Info {
   name: String;
   dateOfBirth: Date;
   isLiving: boolean;
}

const FamilyTree = () => {
   const [rootId, setRootId] = useState<string>("");
   const [curID, setCurID] = useState<number>(1);
   const [nodeMap, setNodeMap] = useState<Map<number, Node>>(new Map());
   const [infoMap, setInfoMap] = useState<Map<number, Info>>(new Map());

   const initializeTree = (): void => {
      const node = {
         id: `${curID}`,
         gender: "male",
         spouses: [],
         siblings: [],
         parents: [],
         children: []
      } as Node;
      setNodeMap((prevState) => {
         const newMap = new Map(prevState);
         newMap.set(curID, node);
         return newMap;
      });
      setRootId(node.id);
      setCurID(curID + 1);

      const info = {
         name: "isaac",
         age: 22,
         dateOfBirth: new Date("2001-09-26"),
         isLiving: true
      } as Info;
      setInfoMap((prevState) => {
         const newMap = new Map(prevState);
         newMap.set(curID, info);
         return newMap;
      });
   };

   return (
      <div className={css.root}>
         {nodeMap.size > 0 ? (
            <PinchZoomPan
               min={1}
               max={2.5}
               captureWheel
               className={css.wrapper}
            >
               <ReactFamilyTree
                  nodes={[...nodeMap.values()] as Node[]}
                  rootId={rootId}
                  width={WIDTH}
                  height={HEIGHT}
                  renderNode={(node: ExtNode) => (
                     <FamilyNode
                        key={node.id}
                        node={node}
                        info={infoMap.get(Number(node.id))}
                        style={{
                           width: WIDTH,
                           height: HEIGHT,
                           transform: `translate(${
                              node.left * (WIDTH / 2)
                           }px, ${node.top * (HEIGHT / 2)}px)`
                        }}
                     />
                  )}
               />
            </PinchZoomPan>
         ) : (
            <button onClick={initializeTree}>Add Family Member</button>
         )}
      </div>
   );
};

export default FamilyTree;
