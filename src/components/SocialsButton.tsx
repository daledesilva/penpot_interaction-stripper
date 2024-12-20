import { MessageSquareIcon } from 'lucide-react';
import React, { FC } from 'react';
import { socialsClick } from '../connections/analytics';

////////////////////////
////////////////////////

interface SocialsButtonProps {
    style?: React.CSSProperties;
}

const SocialsButton: FC<SocialsButtonProps> = ({ style }) => {
    return (
        <a
            href = "https://designdebt.club/socials/"
            target = "_blank"
            onClick = {socialsClick}
            title = "Follow or message me"
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
            <MessageSquareIcon size={20} />
        </a>
    );
};

export default SocialsButton;
