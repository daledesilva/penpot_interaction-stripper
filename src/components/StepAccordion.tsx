import React, { FC, ReactNode } from 'react';
import NavigationButton from './NavigationButton';

////////////////////////
////////////////////////

interface StepAccordionProps {
    isDisabled?: boolean;
    title?: string;
    isOpen: boolean;
    onToggle: () => void;
    onBackward?: () => void;
    onForward?: () => void;
    children?: ReactNode;
}

const StepAccordion: FC<StepAccordionProps> = ({ children, title, isOpen, onToggle, isDisabled, onForward, onBackward }) => {
    return (
        <div style={{
            flexGrow: isOpen ? 1 : 0,
            display: 'flex',
            flexDirection: 'column',
            // height: 'auto',
            // transition: "all 1s",
            // transition: "all 0.5s cubic-bezier(0.7, 0, 0.3, 1)",
        }}>
            {title && ( 
                <div
                    onClick = {onToggle}
                    style = {{
                        opacity: isDisabled ? 0.5 : 1,
                        pointerEvents: isDisabled ? 'none' : 'auto',
                        cursor: isDisabled ? 'default' : 'pointer',
                    }}
                >
                    {title}
                </div>
            )}
            <div
                style = {{
                    flexGrow: isOpen ? 1 : 0,
                    // height: 'auto',
                    height: isOpen ? '200px' : 0,   // TODO: This is hardcoded but that's not ideal
                    // maxHeight: isOpen ? '500px' : 0,
                    overflow: 'hidden',
                    alignContent: 'center',
                    // transition: "all 1s",
                    transition: "all 0.5s cubic-bezier(0.5, 0, 0.5, 1)",
                    
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                    justifyContent: 'center',
                }}
            >
                {onBackward && (
                    <NavigationButton
                        direction='backward'
                        onClick={onBackward}
                    />
                )}
                {children}
                {onForward && (
                    <NavigationButton
                        direction = 'forward'
                        onClick = {onForward}
                    />
                )}
            </div>
        </div>
    );
};

export default StepAccordion;
