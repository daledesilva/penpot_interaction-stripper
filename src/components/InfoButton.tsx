import { CircleHelpIcon } from 'lucide-react';
import React, { FC } from 'react';
import { helpClick } from '../connections/analytics';

////////////////////////
////////////////////////

interface InfoButtonProps {
    style?: React.CSSProperties;
}

const InfoButton: FC<InfoButtonProps> = ({ style }) => {
    return (
        <a
            href = "https://designdebt.club/projects/penpot-interaction-stripper/"
            target = "_blank"
            title = "Learn more"
            onClick = {helpClick}
            className = 'ddc_is_hover-primary-fg'
            style = {{
                backgroundColor: "none",
                color: "grey",
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
            <CircleHelpIcon size={20} />
        </a>
    );
};

export default InfoButton;
