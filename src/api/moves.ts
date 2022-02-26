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

export function getValidMoves(board: Board, [cellRow, cellCol]: Coordinate): Coordinate[] {
    const currentPiece = board[cellRow][cellCol];
    if (currentPiece === null) return [];

    return moveGenerators[currentPiece.type](board, [cellRow, cellCol]);
}

export function coordOOB([cellRow, cellCol]: Coordinate): boolean {
    return cellRow < 0 || cellCol < 0 || cellRow > 7 || cellCol > 7;
}

function getPawnMoves(board: Board, [cellRow, cellCol]: Coordinate): Coordinate[] {
    const currentColor = board[cellRow][cellCol]?.color; 
    let moves: Coordinate[] = [];
    let updateRow: number = 0;
    const colLeft = cellCol - 1;
    const colRight = cellCol + 1;

    // check moves for Black piece
    if (currentColor === 'white') {
        // first pawn move 
        if (cellRow === 1) {
            if (board[cellRow + 1][cellCol] === null && board[cellRow + 2][cellCol] === null) moves.push( [cellRow + 2, cellCol] ) 
        }
        updateRow = cellRow + 1;
    }
    // black
    if (currentColor === 'black') {
        // first pawn move 
        if (cellRow === 6) {
            if (board[cellRow - 1][cellCol] === null && board[cellRow - 2][cellCol] === null) moves.push( [cellRow - 2, cellCol]) 
        }
        updateRow = cellRow - 1;
    }
        // check for row out of bound
    if (updateRow >= 0 && updateRow <= 7) {
        // move 1 step forward if its empty square
        if (board[updateRow][cellCol] === null) moves.push([updateRow, cellCol]);

        // move to take out enemy pawn
        if (colLeft >= 0 && board[updateRow][colLeft] !== null &&  currentColor !== board[updateRow][colLeft]?.color) moves.push( [updateRow, colLeft] )

        // move to take out enemy pawn
        if (colRight <= 7 && board[updateRow][colRight] !== null && currentColor !== board[updateRow][colRight]?.color) moves.push( [updateRow, colRight] )
    }
    return moves;
}

// cant think of other names lol
function oneDirection(board: Board, [cellRow, cellCol]: Coordinate, xDirection:number, yDirection: number): Coordinate[] {
    let moves: Coordinate[] = [];
    for (let i = 1; i < 8; i++) {
        let [currRow, currCol]: Coordinate = [ cellRow + (i * xDirection), cellCol + (i * yDirection) ];

        if (coordOOB([currRow, currCol])) {
            return moves;
        }

        // empty cell
        if (board[currRow][currCol] === null) {
            moves.push([currRow, currCol]);
        }
        // if cell does not have the same color, push the move once and return the moves
        else if (board[currRow][currCol]?.color !== board[cellRow][cellCol]?.color) {
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

    for(const r of [-1, 1]) {
        for(const c of [-1, 1]) {
            moves.push(...oneDirection(board, coord, r, c));
        }
    }

    return moves;
}

function getKnightMoves(board: Board, [cellRow, cellCol]: Coordinate): Coordinate[] {
    let moves: Coordinate[] = [];
     
    for(const [row, col] of [[1, 2], [2, 1]]) {
        for(const rowMult of [1, -1]) {
            for(const colMult of [1, -1]) {
                moves.push( [cellRow + row * rowMult, cellCol + col * colMult] );
            }
        }
    }

    return moves.filter(([currRow, currCol]) => 
        !coordOOB([currRow, currCol]) && // the move is inbounds
        board[currRow][currCol]?.color !== board[cellRow][cellCol]?.color // the cell does not have a piece of the same colour
    );
}

function getRookMoves(board: Board, coord: Coordinate): Coordinate[] {
    let moves: Coordinate[] = [];

    for(const [row, col] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        moves.push(...oneDirection(board, coord, row, col));
    }
    
    return moves;
}

function getQueenMoves(board: Board, coord: Coordinate): Coordinate[] {
    return [...getRookMoves(board, coord), ...getBishopMoves(board, coord)];
}

function getKingMoves(board: Board, [cellRow, cellCol]: Coordinate): Coordinate[] {
    let moves: Coordinate[] = [];
    
    for(let row = -1; row <= 1; row++) {
        for(let col = -1; col <= 1; col++) {
            if(row === 0 && col === 0) continue;

            moves.push([cellRow + row, cellCol + col]);
        }
    }

    return moves.filter(([currRow, currCol]) => 
        !coordOOB([currRow, currCol]) && // the move is inbounds
        board[currRow][currCol]?.color !== board[cellRow][cellCol]?.color // the cell does not have a piece of the same colour
    );
}