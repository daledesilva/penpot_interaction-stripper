import React, { FC, ReactNode } from 'react';
import ToggleButton from './ToggleButton';

////////////////////////
////////////////////////

interface ModeButtonProps {
    active: boolean;
    onClick: () => void;
    children?: ReactNode;
}

const ModeButton: FC<ModeButtonProps> = ({ active, onClick: filter, children }) => {

    return (
        <div>
            <ToggleButton
                active = {active}
                onClick={filter}
            >
                {children}
            </ToggleButton>
        </div>
    );
};

export default ModeButton;