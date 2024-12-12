import React, { FC, ReactNode } from 'react';

////////////////////////
////////////////////////

interface ActionButtonProps {
    onClick: () => void;
    children?: ReactNode;
    style?: React.CSSProperties;
    disabled?: boolean;
}

const ActionButton: FC<ActionButtonProps> = ({ onClick, children, style, disabled }) => {
    return (
        <button
            onClick = {onClick}
            style = {{
                backgroundColor: disabled ? "grey" : "yellow",
                color: "black", 
                width: '100%',
                padding: "8px 16px",
                border: "none",
                borderRadius: "8px",
                cursor: disabled ? "default" : "pointer",
                transition: "all 0.2s ease",
                fontSize: '1em',
                ...style
            }}
            disabled = {disabled}
        >
            {children}
        </button>
    );
};

export default ActionButton;
