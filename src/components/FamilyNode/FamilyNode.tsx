import React from "react";
import classNames from "classnames";
import { ExtNode } from "relatives-tree/lib/types";
import css from "./FamilyNode.module.css";

interface FamilyNodeProps {
   node: ExtNode;
   style?: React.CSSProperties;
}

const FamilyNode = ({ node, style }: FamilyNodeProps) => {
   return (
      <div className={css.root} style={style} title={node.id}>
         <div className={classNames(css.inner, css[node.gender])} />
      </div>
   );
};

export default FamilyNode;
