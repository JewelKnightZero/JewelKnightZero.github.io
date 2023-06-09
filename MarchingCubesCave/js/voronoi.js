export class Voronoi {

    constructor(detail, chunkSize) {

        this.chunkSize = chunkSize;
        this.chunks = [new Chunk(detail, 0, 0, 0)];

        this.detail = detail;

        this.scaleFactor = detail / chunkSize;
    }

    samplePos(x, y, z) {
        //let sampleChunk = this.chunks.find(chunk => chunk.x === x && chunk.y === y && chunk.z === z);
        let sampleChunk = this.chunks[0];
        
        let sampleX = x * this.scaleFactor;
        let sampleY = y * this.scaleFactor;
        let sampleZ = z * this.scaleFactor;

        let cellX = Math.floor(sampleX);
        let cellY = Math.floor(sampleY);
        let cellZ = Math.floor(sampleZ);

        let minDist = 2;
        let minDist2 = 2;

        for (let zOffset = -1; zOffset < 2; zOffset++) {
            for (let yOffset = -1; yOffset < 2; yOffset++) {
                for (let xOffset = -1; xOffset < 2; xOffset++) {
                    let cell = sampleChunk.getCell(cellX + xOffset, cellY + yOffset, cellZ + zOffset);
                    if (cell === null) continue;
                    let xDif2 = Math.pow(sampleX - (cellX + xOffset + cell.x), 2);
                    let yDif2 = Math.pow(sampleY - (cellY + yOffset + cell.y), 2);
                    let zDif2 = Math.pow(sampleZ - (cellZ + zOffset + cell.z), 2);
                    let distance = Math.sqrt(xDif2 + yDif2 + zDif2);

                    if (distance < minDist) {
                        minDist2 = minDist;
                        minDist = distance;
                    } else if (distance < minDist2) {
                        minDist2 = distance;
                    }
                }
            }
        }

        return (minDist2 - minDist);
    }
}

class Chunk {
    constructor(detail, x, y, z) {

        this.x = x;
        this.y = y;
        this.z = z;

        this.detail = detail;
        this.detail2 = detail * detail;
        this.detail3 = this.detail2 * detail;

        this.cells = Array.apply(null, Array(detail * detail * detail)).map(function (x, i) { return new Cell(); })
        
    }

    getCell(x, y, z) {
        if (x < 0 || x >= this.detail) return null;
        if (y < 0 || y >= this.detail) return null;
        if (z < 0 || z >= this.detail) return null;
        return this.cells[z * this.detail2 + y * this.detail + x];
    }
}

class Cell {
    constructor() {
        this.x = Math.random();
        this.y = Math.random();
        this.z = Math.random();
    }
}