import React, { FC } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

////////////////////////
////////////////////////

interface NavigationButtonProps {
    onClick: () => void;
    direction: 'forward' | 'backward';
}

const NavigationButton: FC<NavigationButtonProps> = ({ onClick, direction }) => {
    return (
        <button
            onClick={onClick}
            style={{
                border: 'none',
                background: 'none',
                padding: '8px',
                cursor: 'pointer',
                color: '#666',
                transition: 'color 0.2s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'white'}
            onMouseLeave={e => e.currentTarget.style.color = '#666'}
        >
            {direction === 'forward' ? <ChevronDown size={24} /> : <ChevronUp size={24} />}
        </button>
    );
};

export default NavigationButton;