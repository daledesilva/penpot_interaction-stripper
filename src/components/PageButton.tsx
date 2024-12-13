import React, { FC, ReactNode } from 'react';
import ToggleButton from './ToggleButton';

/////////////////////////////////
/////////////////////////////////

interface PageButtonProps {
    isActive: boolean;
    onClick: () => void;
    children?: ReactNode;
}

const PageButton: FC<PageButtonProps> = ({ isActive, onClick, children }) => {
    return (
        <div>
            <button
                style = {{
                    background: 'none',
                    color: isActive ? 'white' : 'grey',
                    fontSize: '12px',
                    cursor: 'pointer',
                    padding: '0 0 10px 0',
                    margin: 0,
                }}
                onClick={onClick}
            >
                {children}
            </button>
        </div>
    );
};

export default PageButton;
