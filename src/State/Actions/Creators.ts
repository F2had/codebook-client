import { CellType, CellDirection } from './../../Types/index';
import { ActionType } from "./Types";
import { MoveCellAction, UpdateCellAction, DeleteCellAction, InsertCellAfterAction } from ".";


export const updateCell = (id: string, content: string): UpdateCellAction  => {
    return {
        type: ActionType.UPDATE_CELL,
        payload: {
            id,
            content
        }
    }
}
export const deleteCell = (id: string): DeleteCellAction => {
    return {
        type: ActionType.DELETE_CELL,
        payload: {
            id
        }
    }
}
export const moveCell = (id: string, direction: CellDirection): MoveCellAction => {
    return {
        type: ActionType.MOVE_CELL,
        payload: {
            id,
            direction
        }
    }
}
export const insertCellAfter = (id: string | null, type: CellType): InsertCellAfterAction => {
    return {
        type: ActionType.INSERT_CELL_AFTER,
        payload: {
            id,
            type
        }
    }
}
