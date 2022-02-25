import { Board, Piece, PieceType } from ".";

export function convertRawToBoard(raw: number[][]): Board {
    return raw.map(row => row.map(convertNumToPiece));
}

const numToPieceType: PieceType[] = [ 'pawn', 'rook', 'knight', 'bishop', 'queen', 'king' ];

function convertNumToPiece(num: number): (Piece | null) {
    if(num === 0) return null;

    const piece: Piece = {
        isBlack: (num & 0x8) === 8,
        type: numToPieceType[(num & 0x7)-1]
    }

    return piece;
}