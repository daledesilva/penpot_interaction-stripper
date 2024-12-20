import { HeartIcon } from 'lucide-react';
import React, { FC } from 'react';
import { donateClick } from '../connections/analytics';

////////////////////////
////////////////////////

interface SupportButtonProps {
    style?: React.CSSProperties;
}

const SupportButton: FC<SupportButtonProps> = ({ style }) => {
    return (
        <a
            href = "https://ko-fi.com/daledesilva"
            target = "_blank"
            onClick = {donateClick}
            title = "Show support"
            className = 'ddc_is_hover-primary-fg'
            style = {{
                backgroundColor: "none",
                color: "grey",
                opacity: 0.5,
                padding: "8px 2px",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "all 0.2s ease",
                fontSize: '12px',

                display: 'flex',
                justifyContent: 'center',

                ...style
            }}
        >
            <HeartIcon size={20} />
        </a>
    );
};

export default SupportButton;
