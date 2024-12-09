import React, { FC, ReactNode } from 'react';

////////////////////////
////////////////////////

interface AccordionStretchContainerProps {
    children?: ReactNode;
}

const AccordionStretchContainer: FC<AccordionStretchContainerProps> = ({ children }) => {
    return (
        <div style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
        }}>
            {children}
        </div>
    );
};

export default AccordionStretchContainer;
