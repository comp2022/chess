import React from "react";
import styles from './Board.module.scss';
const classNames = require('classnames'); // https://github.com/JedWatson/classnames

export interface CellProps {
    row: number;
    col: number;
    onClick: (row: number, col: number) => void;
    // piece: Piece; // something like this in the future
}

export const Cell: React.FC<CellProps> = ({row, col, onClick}) => {
    let cn = classNames(
        [ styles.cell ], 
        { [ styles.cellOdd ]: (row + col) % 2 === 1 } // determines shade of cell
    );
    
    return <div className={cn} onClick={() => onClick(row, col)}>
        
    </div>
}