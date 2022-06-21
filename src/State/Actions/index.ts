import { CellType, CellDirection } from './../../Types/index';
import { ActionType } from './Types';


export interface MoveCellAction {
    type: ActionType.MOVE_CELL;
    payload: {
        id: string;
        direction: CellDirection;
    }
}

export interface DeleteCellAction {
    type: ActionType.DELETE_CELL;
    payload: {
        id: string;
    }
}

export interface UpdateCellAction {
    type: ActionType.UPDATE_CELL;
    payload: {
        id: string;
        content: string;
    }
}

export interface InsertCellAfterAction {
    type: ActionType.INSERT_CELL_AFTER;
    payload: {
        id: string | null;
        type: CellType;
    }
}

export type Action = MoveCellAction | DeleteCellAction | UpdateCellAction | InsertCellAfterAction;