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