import { CellType } from "./../../Types/index";
import produce from "immer";

import { Cell } from "../../Types/index";
import { ActionType } from "../Actions/Types";
import { Action } from "../Actions";

interface CellsState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: { [id: string]: Cell };
}

const initialState: CellsState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

const CellsReducer = produce(
  (state: CellsState = initialState, action: Action) => {
    switch (action.type) {
      case ActionType.MOVE_CELL:
        const {  direction } = action.payload;
        const currentIndex = state.order.indexOf(action.payload.id);
        const newIndex =
          direction === "up" ? currentIndex - 1 : currentIndex + 1;

        if (newIndex < 0 || newIndex >= state.order.length) {
          return state;
        }
        state.order[currentIndex] = state.order[newIndex];
        state.order[newIndex] = action.payload.id;
        return state;
      case ActionType.DELETE_CELL:
        delete state.data[action.payload.id];
        state.order = state.order.filter((id) => id !== action.payload.id);
        return state;
      case ActionType.UPDATE_CELL:
        const { id, content } = action.payload;
        console.log("🚀 => file: CellsReducer.ts => line 44 => state", id);
        state.data[action.payload.id].content = content;
        return state;
      case ActionType.INSERT_CELL_BEFORE:
        const { type } = action.payload;
        
        let newId = randomId();
        while (checkIDExists(newId, state)) {
            newId = randomId();
        }
        const newCell: Cell = {
            id: action.payload.id || newId,
            type,
            content: "",
        };
        state.data[action.payload.id || newId] = newCell;
        const index = state.order.indexOf(action.payload.id? action.payload.id : "");
      
        if (index === -1) {
          state.order.push(newId);
        } else {
          state.order.splice(index, 0, newId);
        }
        return state;
      default:
        return state;
    }
  }
);

const randomId = () => Math.random().toString(36).substring(2, 5);
const checkIDExists = (id: string, state: CellsState) => {
  return state.data[id] !== undefined;
};
export default CellsReducer;
