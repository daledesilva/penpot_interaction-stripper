import React, { FC, ReactNode } from 'react';

////////////////////////
////////////////////////

interface PageCarouselProps {
    children?: ReactNode;
    style?: React.CSSProperties;
}

const PageCarousel: FC<PageCarouselProps> = ({ children, style }) => {
    return (
        <div style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            ...style,
        }}>
            {children}
        </div>
    );
};

interface PageProps {
    active: boolean;
    children?: ReactNode;
}

const Page: FC<PageProps> = ({ active, children }) => {
    
    return (
        <div style={{
            position: 'absolute',
            width: '100%',
            height: '100%',            
            opacity: active ? 1 : 0,
            pointerEvents: active ? 'auto' : 'none',
            transition: 'opacity 0.3s ease-in-out',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            justifyContent: 'center',
        }}>
            {children}
        </div>
    );
};

interface PageCarouselMenuProps {
    children?: ReactNode;
}

const PageCarouselMenu: FC<PageCarouselMenuProps> = ({ children }) => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        }}>
            {children}
        </div>
    );
};



export { PageCarousel, Page, PageCarouselMenu };