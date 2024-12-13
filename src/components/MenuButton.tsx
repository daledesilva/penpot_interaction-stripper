import React, { FC, ReactNode } from 'react';

////////////////////////
////////////////////////

interface MenuButtonProps {
    active: boolean;
    onClick: () => void;
    children?: ReactNode;
}

const MenuButton: FC<MenuButtonProps> = ({ active, onClick: filter, children }) => {

    return (
        <div>
            <button
                onClick = {filter}
                style = {{
                    backgroundColor: active ? 'white' : '#232323',
                    color: active ? "black" : "white",
                    borderRadius: '12px',
                    padding: "8px 14px",
                    cursor: "pointer",
                    fontSize: "1em",
                    fontWeight: 100,
                }}
            >
                {children}
            </button>
        </div>
    );
};

export default MenuButton;