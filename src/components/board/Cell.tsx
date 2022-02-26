import React from "react";
import { Piece } from "../../api";
import styles from './Board.module.scss';
import { chesspieces } from "../../assets/chesspieces";
const classNames = require('classnames'); // https://github.com/JedWatson/classnames

export interface CellProps {
    isBackgroundBlack: boolean;
    moveHint: boolean;
    isHighlighted: boolean;
    rankHint: string;
    fileHint: string;
    piece: Piece | null;
    onClick: () => void;
}

export const Cell: React.FC<CellProps> = ({ isBackgroundBlack, piece, onClick, moveHint, isHighlighted, rankHint, fileHint }) => {
    let cn = classNames(
        [ styles.cell ], 
        { [ styles.cellOdd ]: isBackgroundBlack }, // determines shade of cell
    );

    let pieceImg;
    if (piece) {
        const index = (piece.color === 'white') ? 0 : 1;
        pieceImg = chesspieces[piece.type][index];
    }

    const rankHintClass = classNames( 
        [styles.coordHint], 
        [styles.rankHint],
        { [ styles.coordHintOdd ]: isBackgroundBlack },
    );
    
    const fileHintClass = classNames( 
        [styles.coordHint], 
        [styles.fileHint],
        { [ styles.coordHintOdd ]: isBackgroundBlack },
    );
    
    return (
        <div className={cn} onClick={() => onClick()}>
        {/* highlighted, goes under the piece image */}
        { isHighlighted && <div className={styles.highlighted} />}

        {/* rank / file hints */}
        {rankHint && <span className={rankHintClass}>{rankHint}</span>}
        {fileHint && <span className={fileHintClass}>{fileHint}</span>}

        {/* piece image */}
        { piece && <img 
            src={ pieceImg } 
            alt={ piece.type }
            
            className={styles.img} 
            draggable={false}
        />}

        {/* hint circle, goes over the piece image */}
        { moveHint && <div className={styles.moveHint} />}
        </div>
    )
        
   
}