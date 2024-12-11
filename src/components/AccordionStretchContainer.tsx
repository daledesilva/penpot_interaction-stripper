import React, { FC, ReactNode } from 'react';

////////////////////////
////////////////////////

interface AccordionStretchContainerProps {
    children?: ReactNode;
    style?: React.CSSProperties;
}

const AccordionStretchContainer: FC<AccordionStretchContainerProps> = ({ children, style }) => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            ...style,
        }}>
            {children}
        </div>
    );
};

export default AccordionStretchContainer;
