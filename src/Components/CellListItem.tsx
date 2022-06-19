import React from "react";
import { useDispatch } from "react-redux";

import { Cell } from "../Types";
import CodeCell from "./CodeCell";
import TextEditor from "./TextEditor";

interface CellListItemProps {
  cell: Cell;
}

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
    const dispatch = useDispatch()
  let child: JSX.Element;
  switch (cell.type) {
    case "code":
      child = <CodeCell />;
      break;
    case "markdown":
      child = <TextEditor />;
      break;
    default:
      child = <div>Unknown cell type</div>;
      break;
  }
  return <div onClick={(e) => {
    dispatch({
        type: 'MOVE_CELL',
        payload: {
            id: cell.id,
            direction: 'up'
        }
    })
  }}>{child} {cell.id}</div>;
};

export default CellListItem;
