export default class Game {
    private interval: number = 1;

    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    private options = {
        cellsX: 100,
        cellsY: 100,
        cellSize: 10,
        gridColor: "#3730a3",
        cellColor: "#ccc"
    };

    private matrix: Array<Array<boolean>>;

    constructor(canvasId: string) {
        this.canvas = <HTMLCanvasElement>document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");

        const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
        const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
        this.options.cellsX = Math.floor(vw / this.options.cellSize);
        this.options.cellsY = Math.floor(vh / this.options.cellSize);
        this.update();
    }

    private update() {
        this.canvas.width = this.options.cellsX * this.options.cellSize;
        this.canvas.height = this.options.cellsY * this.options.cellSize;

        this.matrix = new Array(this.options.cellsX);
        for (let x = 0; x < this.matrix.length; x++) {
            this.matrix[x] = new Array(this.options.cellsY);
            for (let y = 0; y < this.matrix[x].length; y++) {
                this.matrix[x][y] = false;
            }
        }

        this.randomize();

        setInterval(() => {
            this.step();

            this.draw();
        }, this.interval);

    }
    private step() {
        let buffer = new Array(this.matrix.length);
        for (let x = 0; x < buffer.length; x++) {
            buffer[x] = new Array(this.matrix[x].length);
        }

        // calculate one step
        for (let x = 0; x < this.matrix.length; x++) {
            for (let y = 0; y < this.matrix[x].length; y++) {
                // count neighbours
                var neighbours = this.countNeighbours(x, y);

                // use rules
                if (this.matrix[x][y]) {
                    if (neighbours == 2 || neighbours == 3)
                        buffer[x][y] = true;
                    if (neighbours < 2 || neighbours > 3)
                        buffer[x][y] = false;
                } else {
                    if (neighbours == 3)
                        buffer[x][y] = true;
                }
            }
        }

        // flip buffers
        this.matrix = buffer;
    }

    private draw() {
        // clear canvas and set colors
        this.canvas.width = this.canvas.width;
        this.ctx.strokeStyle = this.options.gridColor;
        this.ctx.fillStyle = this.options.cellColor;

        // draw grid
        for (let x = 0.5; x < this.options.cellsX * this.options.cellSize; x += this.options.cellSize) {
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.options.cellsY * this.options.cellSize);
        }

        for (let y = 0.5; y < this.options.cellsY * this.options.cellSize; y += this.options.cellSize) {
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.options.cellsX * this.options.cellSize, y);
        }

        this.ctx.stroke();

        // draw matrix
        for (let x = 0; x < this.matrix.length; x++) {
            for (let y = 0; y < this.matrix[x].length; y++) {
                if (this.matrix[x][y]) {
                    this.ctx.fillRect(x * this.options.cellSize + 1,
                        y * this.options.cellSize + 1,
                        this.options.cellSize - 1,
                        this.options.cellSize - 1);
                }
            }
        }
    }

    private countNeighbours(cx: number, cy: number) {
        let count = 0;

        for (let x = cx - 1; x <= cx + 1; x++) {
            for (let y = cy - 1; y <= cy + 1; y++) {
                if (x == cx && y == cy)
                    continue;
                if (x < 0 || x >= this.matrix.length || y < 0 || y >= this.matrix[x].length)
                    continue;
                if (this.matrix[x][y])
                    count++;
            }
        }
        return count;
    }

    private randomize() {
        for (let x = 0; x < this.matrix.length; x++) {
            for (let y = 0; y < this.matrix[x].length; y++) {
                this.matrix[x][y] = Math.random() < 0.3;
            }
        }
    }
}
