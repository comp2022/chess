import pawn_w from './images/pawn_w.svg'
import pawn_b from './images/pawn_b.svg'

import bishop_w from './images/bishop_w.svg'
import bishop_b from './images/bishop_b.svg'

import kinght_w from './images/knight_w.svg'
import knight_b from './images/knight_b.svg'

import rook_w from './images/rook_w.svg'
import rook_b from './images/rook_b.svg'

import queen_w from './images/queen_w.svg'
import queen_b from './images/queen_b.svg'

import king_w from './images/king_w.svg'
import king_b from './images/king_b.svg'

import { PieceType } from '../api'

export const chesspieces: Record<PieceType, string[]> = {
    'pawn': [pawn_w, pawn_b],
    'bishop': [bishop_w, bishop_b],
    'knight': [kinght_w, knight_b],
    'rook': [rook_w, rook_b],
    'queen': [queen_w, queen_b],
    'king': [king_w, king_b]
}
