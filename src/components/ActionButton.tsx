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
            className = 'ddc_is_hover-primary-bg'
            style = {{
                backgroundColor: disabled ? "grey" : "var(--ddc_is_color-primary)",
                color: "black",
                padding: "8px 16px",
                border: "none",
                borderRadius: "8px",
                cursor: disabled ? "default" : "pointer",
                transition: "all 0.2s ease",
                fontSize: '12px',
                ...style
            }}
            disabled = {disabled}
        >
            {children}
        </button>
    );
};

export default ActionButton;
