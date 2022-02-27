export type PieceType = 'pawn' | 'bishop' | 'knight' | 'rook' | 'queen' | 'king'; 

export type PieceColor = 'white' | 'black';

export interface Piece {
  color: PieceColor;
  type: PieceType;
};

export type Board = (Piece | null)[][];

export type Coordinate = [ row: number, col: number ];

export type FEN = string;
