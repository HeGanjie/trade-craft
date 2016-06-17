import test from 'ava';
import * as _ from 'lodash';

import { gen2dArr,
    dsInitCornerValues,
    dsDiamondStep,
    dsSquareStep,
    dsDiamondAndSquare
} from './src/gameObjects/tile';

test('gen2dArr', t => {
    let arr2d = gen2dArr(3, 2, (x, y) => `${x},${y}`),
        shouldBe = [
            ['0,0', '1,0', '2,0'],
            ['0,1', '1,1', '2,1']
        ];
    t.deepEqual(arr2d, shouldBe);
});

test('dsInitCornerValues', t => {
    let arr2d = gen2dArr(5, 5, _.constant(0)),
        shouldBe = [
            [1, 0, 0, 0, 1],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [1, 0, 0, 0, 1]
        ];
    dsInitCornerValues(arr2d, 1, 1);
    t.deepEqual(arr2d, shouldBe);
});

test('dsDiamondStep', t => {
    let arr2d = gen2dArr(5, 5, _.constant(0)),
        shouldBe = [
            [1, 0, 0, 0, 1],
            [0, 0, 0, 0, 0],
            [0, 0, 2, 0, 0],
            [0, 0, 0, 0, 0],
            [1, 0, 0, 0, 1]
        ];
    dsInitCornerValues(arr2d, 1, 1);
    dsDiamondStep(arr2d, undefined, undefined, 1, 1);
    t.deepEqual(arr2d, shouldBe);
});

test('dsSquareStep', t => {
    let arr2d = gen2dArr(5, 5, _.constant(0)),
        shouldBe = [
            [1, 0, 2, 0, 1],
            [0, 0, 0, 0, 0],
            [2, 0, 1, 0, 2],
            [0, 0, 0, 0, 0],
            [1, 0, 2, 0, 1]
        ];
    dsInitCornerValues(arr2d, 1, 1);
    dsDiamondStep(arr2d, undefined, undefined, 0, 0);
    dsSquareStep(arr2d, undefined, undefined, 1, 1);
    t.deepEqual(arr2d, shouldBe);
});

test('dsDiamondAndSquare', t => {
    let arr2d = gen2dArr(5, 5, _.constant(0)),
        shouldBe = [
            [1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1]
        ];
    dsInitCornerValues(arr2d, 1, 1);
    dsDiamondAndSquare(arr2d, undefined, undefined, 0, 0);
    t.deepEqual(arr2d, shouldBe);
});

test('dsDiamondAndSquare-2', t => {
    let arr2d = gen2dArr(17, 17, _.constant(0));
    dsInitCornerValues(arr2d, 1, 1);
    dsDiamondAndSquare(arr2d, undefined, undefined, 0, 0);
    t.deepEqual(17 * 17, _.flatten(arr2d).reduce((sum, n) => sum + n));
});