import React from "react";
import styles from './Board.module.scss';
const classNames = require('classnames'); // https://github.com/JedWatson/classnames

export interface CellProps {
    isBlack: boolean;
}

export const Cell: React.FC<CellProps> = ({isBlack }) => {
    let cn = classNames(
        [ styles.cell ], 
        { [ styles.cellOdd ]: isBlack } // determines shade of cell
    );
    
    return <div className={cn}>
        
    </div>
}