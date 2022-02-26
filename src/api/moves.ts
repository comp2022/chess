import { Board, Coordinate, PieceType } from './';

type MoveGenerator = (board: Board, coord: Coordinate) => Coordinate[];

const moveGenerators: Record<PieceType, MoveGenerator> = {
    'pawn': getPawnMoves,
    'bishop': getBishopMoves,
    'knight': getKnightMoves,
    'rook': getRookMoves,
    'queen': getQueenMoves,
    'king': getKingMoves
} 

export function getValidMoves(board: Board, coord: Coordinate): Coordinate[] {
    const [ row, col ] = coord;
    const currentPiece = board[row][col];

    if (currentPiece === null) return [];

    return moveGenerators[currentPiece.type](board, coord);
}

export function coordOOB([row, col]: Coordinate): boolean {
    return row < 0 || col < 0 || row > 7 || col > 7;
}

function getPawnMoves(board: Board, [row, col]: Coordinate): Coordinate[] {
    const currentColor = board[row][col]?.color; 
    let moves: Coordinate[] = [];
    let updateRow: number = 0;
    const colLeft = col - 1;
    const colRight = col + 1;

    // check moves for Black piece
    if (currentColor === 'white') {
        // first pawn move 
        if (row === 1) {
            if (board[row + 1][col] === null && board[row + 2][col] === null) moves.push( [row + 2, col] ) 
        }
        updateRow = row + 1;
    }
    // black
    if (currentColor === 'black') {
        // first pawn move 
        if (row === 6) {
            if (board[row - 1][col] === null && board[row - 2][col] === null) moves.push( [row - 2, col]) 
        }
        updateRow = row - 1;
    }
        // check for row out of bound
    if (updateRow >= 0 && updateRow <= 7) {
        // move 1 step forward if its empty square
        if (board[updateRow][col] === null) moves.push([updateRow, col]);

        // move to take out enemy pawn
        if (colLeft >= 0 && board[updateRow][colLeft] !== null &&  currentColor !== board[updateRow][colLeft]?.color) moves.push( [updateRow, colLeft] )

        // move to take out enemy pawn
        if (colRight <= 7 && board[updateRow][colRight] !== null && currentColor !== board[updateRow][colRight]?.color) moves.push( [updateRow, colRight] )
    }
    return moves;
}

// cant think of other names lol
function oneDirection(board: Board, [row, col]: Coordinate, rowDir:number, colDir: number): Coordinate[] {
    let moves: Coordinate[] = [];
    for (let i = 1; i < 8; i++) {
        let [currRow, currCol]: Coordinate = [ row + (i * rowDir), col + (i * colDir) ];

        if (coordOOB([currRow, currCol])) {
            return moves;
        }

        // empty cell
        if (board[currRow][currCol] === null) {
            moves.push([currRow, currCol]);
        }
        // if cell does not have the same color, push the move once and return the moves
        else if (board[currRow][currCol]?.color !== board[row][col]?.color) {
            moves.push([currRow, currCol]);
            return moves;
        }

        // blocked by same color piece
        else {
            return moves;
        }
       
    }
    return moves;
}

function getBishopMoves(board: Board, coord: Coordinate): Coordinate[] {
    let moves: Coordinate[] = [];

    for(const rowDir of [-1, 1]) {
        for(const colDir of [-1, 1]) {
            moves.push(...oneDirection(board, coord, rowDir, colDir));
        }
    }

    return moves;
}

function getKnightMoves(board: Board, [row, col]: Coordinate): Coordinate[] {
    let moves: Coordinate[] = [];
     
    for(const [rowDiff, colDiff] of [[1, 2], [2, 1]]) {
        for(const rowMult of [1, -1]) {
            for(const colMult of [1, -1]) {
                moves.push( [row + rowDiff * rowMult, col + colDiff * colMult] );
            }
        }
    }

    return moves.filter(([currRow, currCol]) => 
        !coordOOB([currRow, currCol]) && // the move is inbounds
        board[currRow][currCol]?.color !== board[row][col]?.color // the cell does not have a piece of the same colour
    );
}

function getRookMoves(board: Board, coord: Coordinate): Coordinate[] {
    let moves: Coordinate[] = [];

    for(const [rowDir, colDir] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        moves.push(...oneDirection(board, coord, rowDir, colDir));
    }
    
    return moves;
}

function getQueenMoves(board: Board, coord: Coordinate): Coordinate[] {
    return [...getRookMoves(board, coord), ...getBishopMoves(board, coord)];
}

function getKingMoves(board: Board, [row, col]: Coordinate): Coordinate[] {
    let moves: Coordinate[] = [];
    
    for(let rowDiff = -1; rowDiff <= 1; rowDiff++) {
        for(let colDiff = -1; colDiff <= 1; colDiff++) {
            if(rowDiff === 0 && colDiff === 0) continue;

            moves.push([row + rowDiff, col + colDiff]);
        }
    }

    return moves.filter(([currRow, currCol]) => 
        !coordOOB([currRow, currCol]) && // the move is inbounds
        board[currRow][currCol]?.color !== board[row][col]?.color // the cell does not have a piece of the same colour
    );
}