import * as _ from 'lodash';
import * as Immutable from 'immutable';

export enum TileTypeEnum {
    Sea,

    SubtropicalDesert,
	Grassland,
    TropicalSeasonalForest,
    TropicalRainForest,

    TemperateDesert,
    TemperateDeciduousForest,
    TemperateRainForest,

    Shrubland,
    Taiga,

    Scorched,
    Bare,
    Tundra,
    Snow,

    Beach,
    River,
    Lake
}

export const TileColorDict = Immutable.Map<string, string>({
    [TileTypeEnum.Sea] : '#363661',
    [TileTypeEnum.SubtropicalDesert] : '#E9DDC7',
    [TileTypeEnum.Grassland] : '#C4D4AA',
    [TileTypeEnum.TropicalSeasonalForest] : '#A9CCA4',
    [TileTypeEnum.TropicalRainForest] : '#9CBBA9',
    [TileTypeEnum.TemperateDesert] : '#E4E8CA',
    [TileTypeEnum.TemperateDeciduousForest] : '#B4C9A9',
    [TileTypeEnum.TemperateRainForest] : '#A4C4A8',
    [TileTypeEnum.TropicalRainForest] : '#9CBBA9',
    [TileTypeEnum.Shrubland] : '#C4CCBB',
    [TileTypeEnum.Taiga] : '#CCD4BB',
    [TileTypeEnum.Scorched] : '#999999',
    [TileTypeEnum.Bare] : '#BBBBBB',
    [TileTypeEnum.Tundra] : '#DDDDBB',
    [TileTypeEnum.Snow] : '#F8F8F8',
    [TileTypeEnum.River] : '#2B5B87',
    [TileTypeEnum.Lake] : '#557DA6'
})

const WhittakerDiagram : TileTypeEnum[][] = [
    _.times(6, i => TileTypeEnum.Sea),
    _.flatten([TileTypeEnum.SubtropicalDesert, TileTypeEnum.Grassland,
        _.times(2, i => TileTypeEnum.TropicalSeasonalForest), _.times(2, i => TileTypeEnum.TropicalRainForest) ]),
        
    _.flatten([TileTypeEnum.TemperateDesert, _.times(2, i => TileTypeEnum.Grassland),
        _.times(2, i => TileTypeEnum.TemperateDeciduousForest), TileTypeEnum.TemperateRainForest ]),
        
    _.flatten([_.times(2, i => TileTypeEnum.TemperateDesert),
        _.times(2, i => TileTypeEnum.Shrubland), _.times(2, i => TileTypeEnum.Taiga) ]),
        
    _.flatten([TileTypeEnum.Scorched, TileTypeEnum.Bare, TileTypeEnum.Tundra, _.times(4, i => TileTypeEnum.Snow) ]),
]

export enum PlantEnum {
	Tree,
    Cactus,
    Algae
}

export const gen2dArr = <T>(w: number, h: number,
        iteratee: (x?:number, y?:number) => T) => {
    let rW = _.range(w),
    	rH = _.range(h);
	return rH.map(y => rW.map(x => iteratee(x, y)));
}

export const dsInitCornerValues = (arr: number[][], lowerRandom = 0, upperRandom = 256) => {
    let lastPos = arr.length - 1;
    arr[0][0] = _.random(lowerRandom, upperRandom, true);
    arr[0][lastPos] = _.random(lowerRandom, upperRandom, true);
    arr[lastPos][0] = _.random(lowerRandom, upperRandom, true);
    arr[lastPos][lastPos] = _.random(lowerRandom, upperRandom, true);
}

export const dsDiamondStep = (arr: number[][],
        startPoint = [0, 0], endPoint = [arr.length - 1, arr.length - 1],
        lowerRandom = 0, upperRandom = 256) => {
    let [startX, startY] = startPoint,
        [endX, endY] = endPoint,
        cornerNums = [arr[startX][startY],
                      arr[endX][startY],
                      arr[startX][endY],
                      arr[endX][endY]],
        centerX = (startX + endX) / 2,
        centerY = (startY + endY) / 2;
    
    arr[centerX][centerY] = _.mean(cornerNums) + _.random(lowerRandom, upperRandom, true);
}

export const dsSquareStep = (arr: number[][],
        startPoint = [0, 0], endPoint = [arr.length - 1, arr.length - 1],
        lowerRandom = 0, upperRandom = 256) => {
    let [startX, startY] = startPoint,
        [endX, endY] = endPoint,
        centerX = (startX + endX) / 2,
        centerY = (startY + endY) / 2;

    let centerVal = arr[centerX][centerY],
        topLeftVal = arr[startX][startY],
        topRightVal = arr[endX][startY],
        bottomLeftVal = arr[startX][endY],
        bottomRightVal = arr[endX][endY],
        randFun = _.partial(_.random, lowerRandom, upperRandom, true),
        distance = (endX - startX) / 2;

    if (arr[centerX][startY] === 0) {
        arr[centerX][startY] = startY === 0
            ? _.mean([centerVal, topLeftVal, topRightVal]) + randFun()
            : _.mean([centerVal, topLeftVal, topRightVal,
                arr[centerX][startY - distance]]) + randFun();
    }
    if (arr[endX][centerY] === 0) {
        arr[endX][centerY] = endX === arr.length - 1
            ? _.mean([centerVal, topRightVal, bottomRightVal]) + randFun()
            : _.mean([centerVal, topRightVal, bottomRightVal,
                arr[endX + distance][centerY]]) + randFun();
    }
    if (arr[centerX][endY] === 0) {
        arr[centerX][endY] = endY === arr.length - 1
            ? _.mean([centerVal, bottomLeftVal, bottomRightVal]) + randFun()
            : _.mean([centerVal, bottomLeftVal, bottomRightVal,
                arr[centerX][endY + distance]]) + randFun();
    }
    if (arr[startX][centerY] === 0) {
        arr[startX][centerY] = startX === 0
            ? _.mean([centerVal, topLeftVal, bottomLeftVal]) + randFun()
            : _.mean([centerVal, topLeftVal, bottomLeftVal,
                arr[startX - distance][centerY]]) + randFun();
    }
}

const _dsDiamondAndSquare = (arr: number[][],
        startPoint = [0, 0], endPoint = [arr.length - 1, arr.length - 1],
        lowerRandom = 0, upperRandom = 256,
        insertAction: () => any = null) => {
    let [startX, startY] = startPoint,
        [endX, endY] = endPoint,
        centerX = (startX + endX) / 2,
        centerY = (startY + endY) / 2,
        centerPoint = [centerX, centerY];
    if (endX - startX <= 1) {
        return;
    }

    let conti: () => any;

    dsDiamondStep(arr, startPoint, endPoint, lowerRandom, upperRandom);
    if (insertAction != null) {
        conti = insertAction();
    }
    dsSquareStep(arr, startPoint, endPoint, lowerRandom, upperRandom);
    // console.log("UpperRandom: " + upperRandom);

    // connect the next level, also include the next next level
    let nextCont = () => {
        return _dsDiamondAndSquare(arr, startPoint, centerPoint, lowerRandom, upperRandom / 2, () => {
            return _dsDiamondAndSquare(arr, [centerX, startY], [endX, centerY], lowerRandom, upperRandom / 2, () => {
                return _dsDiamondAndSquare(arr, [startX, centerY], [centerX, endY], lowerRandom, upperRandom / 2, () => {
                    return _dsDiamondAndSquare(arr, centerPoint, endPoint, lowerRandom, upperRandom / 2, conti);
                });
            });
        });
    }
    return nextCont;
}

import { trampoline } from '../utils.ts';

export const dsDiamondAndSquare = (arr: number[][],
        startPoint = [0, 0], endPoint = [arr.length - 1, arr.length - 1],
        lowerRandom = 0, upperRandom = 256,
        insertAction: () => any = null) => {
    let r = _dsDiamondAndSquare(arr, startPoint, endPoint, lowerRandom, upperRandom, insertAction);
    trampoline(r);
}

export const diamondSquare = (n: number) => {
    if (n % 2 === 0) {
        throw "n should be odd number";
    }
    let m = Math.log2(n - 1);
    if (m % 1 !== 0) {
        throw "n should be 2^x+1";
    }
    let arr2d = gen2dArr(n, n, _.constant(0));
    dsInitCornerValues(arr2d, 0, n - 1);
    dsDiamondAndSquare(arr2d, undefined, undefined, 0, n - 1);
    return arr2d;
}

export default class Tile {
	altitudePos: number;
	altitude: number;
    humidity: number;

    plantAmount: Immutable.Map<PlantEnum, number>;
    
    static createWorld = (n = 33, landSizeRatio = 0.65, snowSizeRatio = 0.02) => {
        let altitudeArr2d = diamondSquare(n);
        // console.log("Diamond Square: " + altitudeArr2d);
        // (window as any).altitudeArr2d = _.flatten(altitudeArr2d);
        let max = _.max(altitudeArr2d.map(arr => _.max(arr))),
            min = _.min(altitudeArr2d.map(arr => _.min(arr)));
        let altitudeSpan = max - min,
            flatSort = _.flatten(altitudeArr2d).sort((a, b) => a - b),
            coastlineAltitude = flatSort[Math.floor(flatSort.length * (1 - landSizeRatio))],
            snowLineAltitude = flatSort[Math.floor(flatSort.length * (1 - snowSizeRatio))],
            normalClimaticZoneSpan = (snowLineAltitude - coastlineAltitude) / (WhittakerDiagram.length - 2),
            climaticZoneSplitPoint = [coastlineAltitude,
                ... _.range(1, WhittakerDiagram.length - 2 + 1).map(i => coastlineAltitude + normalClimaticZoneSpan * i),
                max];

        console.log(`Max: ${max}, min: ${min}`);
        console.log(`coastlineAltitude: ${coastlineAltitude}, snowLineAltitude: ${snowLineAltitude}`);
        console.log(`normalClimaticZoneSpan: ${normalClimaticZoneSpan}, climaticZoneSplitPoint: ${climaticZoneSplitPoint}`);

        return altitudeArr2d.map(altitudeArr => altitudeArr.map(a => {
            let altitudeLevel = _.findIndex(climaticZoneSplitPoint, point => a <= point);
            return new Tile(altitudeLevel, (a - min) / altitudeSpan);
        }));
    } 

	constructor(altitude: number, altitudePos: number) {
        this.altitudePos = altitudePos;
        this.altitude = altitude;
        this.humidity = 5;
	}

    getTileType() {
        return WhittakerDiagram[this.altitude][this.humidity];
    }

    getTileColor() {
        return TileColorDict.get(this.getTileType().toString());
    }

    getGrayLevelColor() {
        let gl = (~~(this.altitudePos*255)).toString(16);
        return `#${gl}${gl}${gl}`;
    }
}
