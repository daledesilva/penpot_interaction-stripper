import React, { FC, ReactNode } from 'react';

////////////////////////
////////////////////////

interface BodyContainerProps {
    children?: ReactNode;
    style?: React.CSSProperties;
}

const BodyContainer: FC<BodyContainerProps> = ({ children, style }) => {
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

export default BodyContainer;
