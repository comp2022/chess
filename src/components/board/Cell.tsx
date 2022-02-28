import React, { useEffect, useState } from "react";
import { Coordinate, Piece } from "../../api";
import styles from './Board.module.scss';
import { chesspieces } from "../../assets/chesspieces";
import { useDrag, useDrop, DragPreviewImage } from 'react-dnd'; //https://react-dnd.github.io/react-dnd/docs/overview
const classNames = require('classnames'); // https://github.com/JedWatson/classnames

export interface CellProps {
    isBackgroundBlack: boolean;
    moveHint: boolean;
    isHighlighted: boolean;
    rankHint: string;
    fileHint: string;
    piece: Piece | null;
    coord: Coordinate;
    childSetDropCoord: any; // dunno how to fix the Coordinate type error atm
    possibleMoves: Coordinate[];
    onClick: () => void;
    onMouseDown: () => void;
}

export const Cell: React.FC<CellProps> = ({ isBackgroundBlack, piece, onClick, moveHint, isHighlighted, rankHint, fileHint, coord, onMouseDown, childSetDropCoord, possibleMoves }) => {

    const [dropCoord, setDropCoord] = useState<Coordinate>();
  
    // set drag
    const [{ isOver, canDrop }, drop] = useDrop({
        accept: 'piece',
        canDrop: () => (possibleMoves.some(( [pRow, pCol] ) => pRow === coord[0] && pCol === coord[1])),
        drop: () => setDropCoord(coord),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop()
        })
    });

    // set drop
    const [{ isDragging }, drag, preview] = useDrag(() => ({
		// "type" is required. It is used by the "accept" specification of drop targets.
        type: 'piece',
		// The collect function utilizes a "monitor" instance (see the Overview for what this is)
		// to pull important pieces of state from the DnD system.
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        })
    }));

    let pieceImg;
    if (piece) {
        const index = (piece.color === 'white') ? 0 : 1;
        pieceImg = chesspieces[piece.type][index];
    }
    let cn = classNames(
        [ styles.cell ], 
        { [ styles.cellOdd ]: isBackgroundBlack }, // determines shade of cell
        { [ styles.cellValid]: canDrop && isOver }, // borderValid
        { [ styles.cellInvalid]: !canDrop && isOver }, // borderInvalid
    );
    
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

    // invoke this method when isDrop changes
    useEffect(() => {
        childSetDropCoord(dropCoord);
    }, [dropCoord, setDropCoord]);
    
    return (
        // use onMouseDown to setActiveCell when dragging
        <div className={cn} onClick={() => onClick()} onMouseDown={() => onMouseDown()}  ref={drop}>
        {/* highlighted, goes under the piece image */}
        { isHighlighted && <div className={styles.highlighted} />}

        {/* Highlight cell when we drag chess piece on it */}
        {/* {isOver && !canDrop && <div className={styles.highlightedInvalidCell } />}
        {isOver && canDrop && <div className={styles.highlightedValidCell } />} */}

        {/* rank / file hints */}
        {rankHint && <span className={rankHintClass}>{rankHint}</span>}
        {fileHint && <span className={fileHintClass}>{fileHint}</span>}

        {/* piece image */}
        {/* i wonder if there is the way to increase the size of this preview */}
        { piece && pieceImg && <DragPreviewImage connect={preview} src={pieceImg}  /> }
        { piece && <img src={pieceImg} ref={drag} alt={ piece.type } className={styles.img} style={{ opacity: isDragging ? 0 : 1 }} />}

        {/* hint circle, goes over the piece image */}
        { moveHint && <div className={styles.moveHint} />}
        </div>
    )
        
   
}