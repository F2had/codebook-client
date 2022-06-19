import { CellType, CellDirection } from './../../Types/index';
import { ActionType } from "./Types";
import { Action, MoveCellAction, UpdateCellAction, DeleteCellAction, InsertCellBeforeAction } from ".";


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
export const insertCellBefore = (id: string, type: CellType): InsertCellBeforeAction => {
    return {
        type: ActionType.INSERT_CELL_BEFORE,
        payload: {
            id,
            type
        }
    }
}
