import React, { FC, ReactNode } from 'react';
import ToggleButton from './ToggleButton';
import AddRemoveButton from './AddRemoveButton';

////////////////////////
////////////////////////

interface FilterToggleProps {
    active: boolean;
    onToggle: () => void;
    children?: ReactNode;
    name: string;
}

const FilterToggle: FC<FilterToggleProps> = ({ active, onToggle, children, name }) => {

    return (<>
        <div
            style = {{
                alignSelf: 'flex-start',
                borderRadius: '12px',
                padding: "4px",
                backgroundColor: active ? 'white' : 'unset', //"var(--color-primary)" : "var(--color-secondary)",
                color: active ? "black" : "white", //"var(--color-secondary)" : "var(--color-primary)",
                cursor: "pointer",

                display: "flex",
                flexDirection: "row",
                alignItems: "center",   // vertically center the checkbox and label
                justifyContent: "flex-start",   // horizontally align the checkbox and label
                gap: 0,
            }}
            onClick={onToggle}
        >
            <input 
                type = "checkbox"
                name = {name}
                checked = {active}
                onChange = {onToggle}
                style = {{
                    position: "absolute",
                    opacity: 0,
                    height: 0,
                    width: 0,
                }}
            />
            <AddRemoveButton
                active = {active}
                onClick = {onToggle}
            />
            <label
                style = {{
                    // width: '100%',
                    fontSize: "1em",
                    paddingLeft: active ? "0" : "8px",
                    paddingRight: "12px",
                    cursor: "pointer",
                }}
                htmlFor = {name}
            >
                {children}
            </label>
        </div>
    </>);
};

export default FilterToggle;