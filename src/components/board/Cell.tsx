import React from "react";
import { Piece } from "../../api/Chess";
import styles from './Board.module.scss';
import { chesspieces } from "../../assets/chesspieces";
const classNames = require('classnames'); // https://github.com/JedWatson/classnames

export interface CellProps {
    isBlack: boolean;
    piece: Piece | null;
}

export const Cell: React.FC<CellProps> = ({isBlack, piece }) => {
    let cn = classNames(
        [ styles.cell ], 
        { [ styles.cellOdd ]: isBlack } // determines shade of cell
    );

    const type: Piece | null = piece;
    
    return (
        <div className={cn}>
            {
                type && <img src={chesspieces[type.type][+type.isBlack]} className={styles.img} alt={type.type} />
            }
        </div>
    )
        
   
}