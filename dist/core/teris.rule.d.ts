import { Rectangle } from './teris.rect';
import { TerisGroup } from './teris.group';
import { IPoint, MoveDirection, Shape } from '../common/interfaces';
export declare class TerisRule {
    static canIMove(shape: Shape, targetPoint: IPoint, exists: Rectangle[]): boolean;
    static move(teris: TerisGroup, targetPointOrDeirection: IPoint, exists: Rectangle[]): boolean;
    static move(teris: TerisGroup, targetPointOrDeirection: MoveDirection, exists: Rectangle[]): boolean;
    static moveDirectly(teris: TerisGroup, direction: MoveDirection, exists: Rectangle[]): void;
    static rotate(teris: TerisGroup, exists: Rectangle[]): boolean;
    static deleteTeris(exists: Rectangle[]): number;
    private static deleteLine;
}
