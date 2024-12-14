import React, { FC, ReactNode } from 'react';

////////////////////////
////////////////////////

interface AddRemoveButtonProps {
    active: boolean;
    onClick: () => void;
    children?: ReactNode; 
    style?: React.CSSProperties;
    size?: string;
}

const AddRemoveButton: FC<AddRemoveButtonProps> = ({ active, onClick, style }) => {
    return (
        <button 
            onClick={onClick}
            style={{
                backgroundColor: active ? 'white' : 'grey',
                color: "black",
                aspectRatio: '1/1',
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
                border: "none",
                borderRadius: "50%",
                cursor: "pointer",
                transition: "all 0.2s ease",
                fontSize: '1em',
                ...style,
            }}
        >
            {active ? (<>
                {/* # */}
                {/* <Check size={'1.2em'}/> */}
            </>) : (<>
                {/* # */}
                {/* <X size={'0.8em'}/> */}
            </>)}
        </button>
    );
};

export default AddRemoveButton;
