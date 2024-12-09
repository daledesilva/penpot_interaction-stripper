import React, { FC, ReactNode } from 'react';
import ToggleButton from './ToggleButton';
import AddRemoveButton from './AddRemoveButton';

////////////////////////
////////////////////////

interface FilterButtonProps {
    active: boolean;
    filter: () => void;
    toggleFilter: () => void;
    children?: ReactNode;
}

const FilterButton: FC<FilterButtonProps> = ({ active, filter, toggleFilter, children }) => {

    return (
        <div
            style = {{
                backgroundColor: active ? "var(--color-primary)" : "var(--color-secondary)",
                color: active ? "var(--color-secondary)" : "var(--color-primary)",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                gap: "10px",
            }}
        >
            <ToggleButton
                active={active}
                onClick={filter}
            >
                {children}
            </ToggleButton>
            <AddRemoveButton
                added = {active}
                onClick = {toggleFilter}
            >
                +
            </AddRemoveButton>
        </div>
    );
};

export default FilterButton;