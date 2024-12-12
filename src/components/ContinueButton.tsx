import React, { FC } from 'react';
import { ChevronDown } from 'lucide-react';

////////////////////////
////////////////////////

interface ContinueButtonProps {
    onClick: () => void;
}

const ContinueButton: FC<ContinueButtonProps> = ({ onClick }) => {
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
            <ChevronDown size={24} />
        </button>
    );
};

export default ContinueButton;