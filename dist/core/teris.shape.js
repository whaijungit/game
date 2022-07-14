import { colors, getRandom, shapes } from '../common/utils';
export const createTeris = (centerPoint) => {
    let index = getRandom(0, shapes.length);
    const Shape = shapes[index];
    index = getRandom(0, colors.length);
    const color = colors[index];
    return new Shape(centerPoint, color);
};
//# sourceMappingURL=teris.shape.js.map