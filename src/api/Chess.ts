export type PieceType = 'pawn' | 'bishop' | 'knight' | 'rook' | 'queen' | 'king'; 

export interface Piece {
  isBlack: boolean; // false = white, true = black
  type: PieceType;
};

export type Board = (Piece | null)[][];

export interface Coordinate {
  row: number;
  col: number;
};

export function getValidMoves(board: Board, coord: Coordinate): Coordinate[] {
    const currentPiece = board[coord.row][coord.col];
    if (currentPiece === null) return [];

    if(currentPiece.type === 'pawn') return getPawnMoves(board, coord);
    else if(currentPiece.type === 'bishop') return getBishopMoves(board, coord);
    else if(currentPiece.type === 'knight') return getKnightMoves(board, coord);
    else if(currentPiece.type === 'rook') return getRookMoves(board, coord);
    else if(currentPiece.type === 'queen') return getQueenMoves(board, coord);
    else if(currentPiece.type === 'king') return getKingMoves(board, coord);

    else throw new Error("Unknown piece type");
}

function getPawnMoves(board: Board, coord: Coordinate): Coordinate[] {
    let moves: Coordinate[] = [];
    return moves;
}

function getBishopMoves(board: Board, coord: Coordinate): Coordinate[] {
    let moves: Coordinate[] = [];
    return moves;
}

function getKnightMoves(board: Board, coord: Coordinate): Coordinate[] {
    let moves: Coordinate[] = [];
    return moves;
}
function getRookMoves(board: Board, coord: Coordinate): Coordinate[] {
    let moves: Coordinate[] = [];
    return moves;
}

function getQueenMoves(board: Board, coord: Coordinate): Coordinate[] {
    let moves: Coordinate[] = [];
    return moves;
}

function getKingMoves(board: Board, coord: Coordinate): Coordinate[] {
    let moves: Coordinate[] = [];
    return moves;
}