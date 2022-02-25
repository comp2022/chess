import React from "react";
import { Piece } from "../../api/Chess";
import styles from './Board.module.scss';
import { chesspieces } from "../../assets/chesspieces";
const classNames = require('classnames'); // https://github.com/JedWatson/classnames

export interface CellProps {
    isBackgroundBlack: boolean;
    highlighted: boolean;
    piece: Piece | null;
    onClick: () => void;
}

export const Cell: React.FC<CellProps> = ({ isBackgroundBlack, piece, onClick, highlighted }) => {
    let cn = classNames(
        [ styles.cell ], 
        { [ styles.cellOdd ]: isBackgroundBlack }, // determines shade of cell
        { [styles.highlighted]: highlighted },
    );

    const type: Piece | null = piece;
    
    return (
        <div className={cn} onClick={() => onClick()}>
            {
                type && <img src={chesspieces[type.type][+type.isBlack]} className={styles.img} alt={type.type} />
            }
        </div>
    )
        
   
}