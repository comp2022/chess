import pawn_w from './images/pawn_w.png'
import pawn_b from './images/pawn_b.png'

import bishop_w from './images/bishop_w.png'
import bishop_b from './images/bishop_b.png'

import kinght_w from './images/knight_w.png'
import knight_b from './images/knight_b.png'

import rook_w from './images/rook_w.png'
import rook_b from './images/rook_b.png'

import queen_w from './images/queen_w.png'
import queen_b from './images/queen_b.png'

import king_w from './images/king_w.png'
import king_b from './images/king_b.png'

import { PieceType } from '../api'

export const chesspieces: Record<PieceType, any[]> = {
    'pawn': [pawn_w, pawn_b],
    'bishop': [bishop_w, bishop_b],
    'knight': [kinght_w, knight_b],
    'rook': [rook_w, rook_b],
    'queen': [queen_w, queen_b],
    'king': [king_w, king_b]
}
