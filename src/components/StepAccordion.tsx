import React, { FC, ReactNode } from 'react';
import ContinueButton from './ContinueButton';

////////////////////////
////////////////////////

interface StepAccordionProps {
    isDisabled?: boolean;
    title?: string;
    isOpen: boolean;
    onToggle: () => void;
    onContinue?: () => void;
    children?: ReactNode;
}

const StepAccordion: FC<StepAccordionProps> = ({ children, title, isOpen, onToggle, isDisabled, onContinue }) => {
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
                    height: isOpen ? '220px' : 0,   // TODO: This is hardcoded but that's not ideal
                    // maxHeight: isOpen ? '500px' : 0,
                    overflow: 'hidden',
                    alignContent: 'center',
                    // transition: "all 1s",
                    transition: "all 0.5s cubic-bezier(0.5, 0, 0.5, 1)",
                    
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                    justifyContent: 'center',
                }}>
                {children}
                {onContinue && (
                    <ContinueButton onClick={onContinue} />
                )}
            </div>
        </div>
    );
};

export default StepAccordion;
