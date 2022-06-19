import React from "react";

import { useTypedSelector } from "../Hooks/UsedTypedSelector";
import CellListItem from "./CellListItem";

const CellList: React.FC = () => {
  const cells = useTypedSelector((state) => {
    if (state.cells) {
      const { data, order } = state.cells;
      return order.map((id) => data[id]);
    }
    return [];
  });

  const renderCellList = cells.map((cell) => (
    <CellListItem key={cell.id} cell={cell} />
  ));
  return <>{renderCellList}</>;
};

export default CellList;
