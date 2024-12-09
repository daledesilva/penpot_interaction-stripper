import React, { FC, ReactNode } from 'react';

////////////////////////
////////////////////////

interface AddRemoveButtonProps {
    added: boolean;
    onClick: () => void;
    children?: ReactNode; 
}

const AddRemoveButton: FC<AddRemoveButtonProps> = ({ added, onClick, children }) => {
    return (
        <button 
            onClick={onClick}
            style={{
                backgroundColor: added ? 'white' : 'unset',//"var(--color-primary)" : "var(--color-secondary)",
                color: added ? "black" : "white",//"var(--color-secondary)" : "var(--color-primary)",
                width: "24px",
                height: "24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "all 0.2s ease",
            }}
        >
            {children}
        </button>
    );
};

export default AddRemoveButton;
