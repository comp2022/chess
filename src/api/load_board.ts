import { Board, Piece, PieceType } from ".";

export function convertRawToBoard(raw: number[][]): Board {
    return raw.map(row => row.map(convertNumToPiece));
}

const numToPieceType: PieceType[] = [ 'pawn', 'rook', 'knight', 'bishop', 'queen', 'king' ];

function convertNumToPiece(num: number): (Piece | null) {
    if(num === 0) return null;

    const piece: Piece = {
        // (num & 0x8)=8 (truthy) then its black, if (num & 0x8)=0 (falsy) then its white
        color: (num & 0x8) ? 'black' : 'white', 
        type: numToPieceType[(num & 0x7)-1]
    }

    return piece;
}