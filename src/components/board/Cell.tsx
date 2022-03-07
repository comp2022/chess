import React, { useEffect } from "react";
import { Coordinate, Piece } from "../../api";
import styles from './Board.module.scss';
import { chesspieces } from "../../assets/chesspieces";
import { useDrag, useDrop } from 'react-dnd'; //https://react-dnd.github.io/react-dnd/docs/overview
const classNames = require('classnames'); // https://github.com/JedWatson/classnames
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export interface CellProps {
    isBackgroundBlack: boolean;
    moveHint: boolean;
    isHighlighted: boolean;
    rankHint: string;
    fileHint: string;
    piece: Piece | null;
    coord: Coordinate;
    childSetDropCoord: (value: Coordinate | undefined) => void;
    possibleMoves: Coordinate[];
    onClick: () => void;
    onMouseDown: () => void;
}

export const Cell: React.FC<CellProps> = ({ isBackgroundBlack, piece, onClick, moveHint, isHighlighted, rankHint, fileHint, coord, onMouseDown, childSetDropCoord, possibleMoves }) => {

    // // set drag
    const [{ isOver }, drop] = useDrop({
        accept: 'piece',
        // check for valid / invalid moves
        drop: () => childSetDropCoord(coord), // invoked when the piece is dropped
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop()
        })
    });

    // set drop
    const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
		// "type" is required. It is used by the "accept" specification of drop targets.
        type: 'piece',

        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        })
    }));

    const canDrop = () => {
        return possibleMoves.some(( [pRow, pCol] ) => pRow === coord[0] && pCol === coord[1]);
    }

    let pieceImg: any;
    if (piece) {
        const index = (piece.color === 'white') ? 0 : 1;
        pieceImg = chesspieces[piece.type][index];
    }

    let cn = classNames(
        [ styles.cell ], 
        { [ styles.cellOdd ]: isBackgroundBlack }, // determines shade of cell
        { [ styles.cellValid]: canDrop() && isOver }, // borderValid
        { [ styles.cellInvalid]: !canDrop() && isOver }, // borderInvalid
        { [ styles.dragging ]: isDragging },
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

    useEffect(() => {
        const img = new Image();
        const newImg = new Image();
        // calculate the preview image size according to view width
        const size = (Math.min(window.innerWidth, window.innerHeight) / 8) * 0.8;
        
        if (pieceImg) {
            img.src = pieceImg;
            const ctx = document.createElement('canvas').getContext('2d');
            if (ctx) {
                ctx.canvas.width = size;
                ctx.canvas.height = size;
                // create a preview image to be the same as the original piece image
                img.onload = function() {
                    ctx.drawImage(img, 0, 0, ctx.canvas.width, ctx.canvas.height);
                    newImg.src = ctx.canvas.toDataURL();
                };
            }
            // center the cursor on the image
            const previewOptions = {
                offsetX: (size / 2) + (size * 0.1),
                offsetY: (size / 2)
            };

            dragPreview(newImg, previewOptions);
        }
            
    },[isDragging, window.innerWidth, window.innerHeight])

    return (
        // use onMouseDown to setActiveCell when dragging
        <div className={cn} onClick={() => onClick()} onMouseDown={() => onMouseDown()}  ref={drop}>
        {/* highlighted, goes under the piece image */}
        { isHighlighted && <div className={styles.highlighted} />}

        {/* rank / file hints */}
        {rankHint && <span className={rankHintClass}>{rankHint}</span>}
        {fileHint && <span className={fileHintClass}>{fileHint}</span>}

        {/* piece image */}
        { piece && <img src={pieceImg} ref={drag}  alt={ piece.type } className={styles.img} style={{ opacity : isDragging ? 0 : 1}} />}

        {/* hint circle, goes over the piece image */}
        { moveHint && <div className={styles.moveHint} />}
        </div>
    )

}