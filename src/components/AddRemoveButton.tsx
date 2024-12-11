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

const AddRemoveButton: FC<AddRemoveButtonProps> = ({ active, onClick, children, style, size }) => {
    return (
        <button 
            onClick={onClick}
            style={{
                backgroundColor: 'white',
                color: "black",
                width: size || '24px',
                height: size || '24px',
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "none",
                borderRadius: "50%",
                cursor: "pointer",
                transition: "all 0.2s ease",
                ...style,
            }}
        >
            +
        </button>
    );
};

export default AddRemoveButton;
