
import React, { FC, ReactNode } from 'react';

////////////////////////
////////////////////////

interface ToggleButtonProps {
    active: boolean;
    onClick: () => void;
    children?: ReactNode;
}

const ToggleButton: FC<ToggleButtonProps> = ({ active, onClick, children }) => {
    return (
        <button
            onClick = {onClick}
            style = {{
                backgroundColor: active ? 'white' : 'unset', //"var(--color-primary)" : "var(--color-secondary)",
                color: active ? "black" : "white", //"var(--color-secondary)" : "var(--color-primary)",
                borderRadius: "4px",
                padding: "4px 8px",
            }}
        >
            {children}
        </button>
    );
};

export default ToggleButton;
