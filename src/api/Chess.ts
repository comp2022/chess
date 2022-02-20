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
    const currentPiece = board[coord.row][coord.col];
    if (currentPiece === null) return [];

    return moveGenerators[currentPiece.type](board, coord);
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