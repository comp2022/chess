import { Board, FEN, Piece, PieceType } from ".";

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

const sanToPieceType: Record<string, PieceType> = {
    'p': 'pawn',
    'n': 'knight',
    'b': 'bishop',
    'r': 'rook',
    'q': 'queen',
    'k': 'king'
};

// https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation#Definition
export function convertFENToBoard(fen: FEN): Board {
    const [boardState, turn, castleState, epSquare, halfmoveClock, fullMoveNumber] = fen.split(" ");

    const board = boardState.split("/").map((rankState, rankIndex) => {
        const rank: (Piece | null)[] = [...Array(8)].map(_ => null); // null by default

        let col = 0;
        // standard algebraic notation, not actually SAN but best-fitting
        for(let san of rankState.split("")) {
            if(col >= 8) throw new Error(`Invalid FEN: Too many cells described for rank ${rankIndex}.`);

            // check if its describing an amount of empty places
            const val = Number.parseInt(san);
            if(!isNaN(val)) {
                col += val; // advance by the specified number of cells
                continue;
            }

            // otherwise it describes a piece

            // uppercase means white, lowercase means black
            const color = san === san.toUpperCase() ? 'white' : 'black';
            
            // force lowercase to check piece type
            san = san.toLowerCase();
            const type = sanToPieceType[san];

            rank[col] = { color, type };
            col++;
        }

        return rank;
    });

    // the first rank described in FEN is actually the black side, so we need to reverse it to make sure white is first
    board.reverse();

    return board;
}

const pieceTypeToSan: Record<PieceType, string> = {
    'pawn': 'p',
    'knight': 'n',
    'bishop': 'b',
    'rook': 'r',
    'queen': 'q',
    'king': 'k'
};

function pieceToSan(piece: (Piece | null)): (string | null) {
    if(piece === null) return null;

    let san = pieceTypeToSan[piece.type];
    if(piece.color === 'white') san = san.toUpperCase();

    return san;
}

export function convertBoardToFEN(board: Board): FEN {
    const rankToFEN = (rank: (Piece | null)[]) => {
        let fen: (string | null)[] = [];

        let emptyCount = 0; // counts number of empty spaces in a row
        for(let col = 0; col < 8; col++) {
            const piece = rank[col];
            const sanPiece = pieceToSan(piece);

            if(sanPiece === null) {
                emptyCount++;
                continue;
            }
            
            if(emptyCount !== 0) {
                fen.push(`${emptyCount}`);
                emptyCount = 0;
            }
            
            fen.push(sanPiece);
        }

        if(emptyCount !== 0) {
            fen.push(`${emptyCount}`);
            emptyCount = 0;
        }

        return fen.join('');
    }

    const fen: FEN = board.map((rank, rankIndex) => rankToFEN(rank)).reverse().join('/');

    return `${fen} w KQkq - 0 1`;
}