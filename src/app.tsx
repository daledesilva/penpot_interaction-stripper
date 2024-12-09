import React, { FC, ReactNode, useState } from 'react';
import StepAccordion from './components/StepAccordion';
import { debug, info } from './utils/log-to-console';
import { removeInteractions } from './logic/remove-interactions';
import ModeButton from './components/ModeButton';
import FilterButton from './components/FilterButton';
import AccordionStretchContainer from './components/AccordionStretchContainer';

///////////
///////////
interface AppState {
    uiStep:   '1-no-selection'
            | '2-filter-mode'
            | '3-flow-filters'
            | '4-shape-filters'
            | '5-trigger-filters'
            | '6-completion'
            | '7-confirmation',
    filterMode: 'none' | 'interactions' | 'missing-interactions' | 'altered-interactions',
    flowFilters: {
        enablingFlows: boolean,
        irrelevantToFlows: boolean
    },
    shapeFilters: {
        components: boolean,
        nonComponents: boolean
    },
    triggerFilters: {
        onClicks: boolean,
        onMouseEnters: boolean,
        onMouseLeaves: boolean,
        afterDelays: boolean
    },
    isActionable: boolean,
}

const initialUiState: AppState = {
    uiStep: '1-no-selection',
    filterMode: 'none',
    flowFilters: {
        enablingFlows: false,
        irrelevantToFlows: false
    },
    shapeFilters: {
        components: false,
        nonComponents: false
    },
    triggerFilters: {
        onClicks: false,
        onMouseEnters: false,
        onMouseLeaves: false,
        afterDelays: false
    },
    isActionable: false,
}
    

interface AppProps {
    children?: ReactNode;
    // Add other props here
}

const App: FC<AppProps> = ({ children }) => {
    const [uiState, setUiState] = useState<AppState>(initialUiState);

    return (<>
        <AccordionStretchContainer>

            <StepAccordion
                isOpen = {uiState.uiStep === '1-no-selection'}
                onToggle = {() => setUiState({...uiState, uiStep: '1-no-selection'})}
            >
                <p>Select an object to begin...</p>
            </StepAccordion>

            <StepAccordion
                title = 'Filter mode'
                isOpen = {uiState.uiStep === '2-filter-mode'}
                onToggle = {() => setUiState({...uiState, uiStep: '2-filter-mode'})}
            >
                <ModeButton
                    active = {uiState.filterMode === 'interactions'}
                    filter = {filterToInteractions}
                >
                    Interactions & transitions
                </ModeButton>
                <ModeButton
                    active = {uiState.filterMode === 'missing-interactions'}
                    filter = {filterToMissingInteractions}
                >
                    Missing interactions
                </ModeButton>
                <ModeButton
                    active = {uiState.filterMode === 'altered-interactions'}
                    filter = {filterToAlteredInteractions}
                >
                    Altered interactions
                </ModeButton>
            </StepAccordion>
        
            <StepAccordion
                title = 'Flow filters'
                isOpen = {uiState.uiStep === '3-flow-filters'} 
                onToggle = {() => setUiState({...uiState, uiStep: '3-flow-filters'})}
            >
                <FilterButton
                    active = {uiState.flowFilters.enablingFlows}
                    filter = {filterToEnablingFlows}
                    toggleFilter = {toggleEnablingFlows}
                >
                    Enabling flows
                </FilterButton>
                <FilterButton
                    active = {uiState.flowFilters.irrelevantToFlows}
                    filter = {filterToIrrelevantFlows}
                    toggleFilter = {toggleIrrelevantToFlows}
                >
                    Irrelevant to flows
                </FilterButton>
            </StepAccordion>

            <StepAccordion
                title = 'Shape filters'
                isOpen = {uiState.uiStep === '4-shape-filters'}
                onToggle = {() => setUiState({...uiState, uiStep: '4-shape-filters'})}
            >
                <FilterButton
                    active = {uiState.shapeFilters.components}
                    filter = {filterToComponents}
                    toggleFilter = {toggleComponents}
                >
                    Components
                </FilterButton>
                <FilterButton
                    active = {uiState.shapeFilters.nonComponents}
                    filter = {filterToNonComponents}
                    toggleFilter = {toggleNonComponents}
                >
                    Non-Components
                </FilterButton>
            </StepAccordion>

            <StepAccordion
                title = 'Trigger filters' 
                isOpen = {uiState.uiStep === '5-trigger-filters'}
                onToggle = {() => setUiState({...uiState, uiStep: '5-trigger-filters'})}
            >
                <FilterButton
                    active = {uiState.triggerFilters.onClicks}
                    filter = {filterToOnClicks}
                    toggleFilter = {toggleOnClicks}
                >
                    On Clicks
                </FilterButton>
                <FilterButton
                    active = {uiState.triggerFilters.onMouseEnters}
                    filter = {filterToOnMouseEnters}
                    toggleFilter = {toggleOnMouseEnters}
                >
                    On Mouse Enters
                </FilterButton>
                <FilterButton
                    active = {uiState.triggerFilters.onMouseLeaves}
                    filter = {filterToOnMouseLeaves}
                    toggleFilter = {toggleOnMouseLeaves}
                >
                    On Mouse Leaves
                </FilterButton>
                <FilterButton
                    active = {uiState.triggerFilters.afterDelays}
                    filter = {filterToAfterDelays}
                    toggleFilter = {toggleAfterDelays}
                >
                    After Delays
                </FilterButton>
            </StepAccordion>

            {uiState.uiStep === '6-completion' && (<div>
                <button onClick={removeInteractions}>
                    Remove Interactions
                </button>
            </div>)}

            {uiState.uiStep === '7-confirmation' && (<div>
                <h1>Changes applied</h1>
            </div>)}

        </AccordionStretchContainer>
        
    </>);

    // Helper functions
    ///////////////////

    // Filter modes

    function setUiStep_withDelay(newState: AppState) {
        setTimeout(() => {
            setUiState(newState);
        }, 200);
    }

    // Filter modes

    function filterToInteractions() {
        const newState = JSON.parse(JSON.stringify(uiState));
        newState.filterMode = 'interactions';
        setUiState(newState);
        setUiStep_withDelay({...newState, uiStep: '3-flow-filters'});
        // parent.postMessage('filter-to-interactions', '*');
    }
    function filterToMissingInteractions() { 
        const newState = JSON.parse(JSON.stringify(uiState));
        newState.filterMode = 'missing-interactions';
        setUiState(newState);
        setUiStep_withDelay({...newState, uiStep: '3-flow-filters'});
        // parent.postMessage('filter-to-missing-interactions', '*');
    }
    function filterToAlteredInteractions() {
        const newState = JSON.parse(JSON.stringify(uiState));
        newState.filterMode = 'altered-interactions';
        setUiState(newState);
        setUiStep_withDelay({...newState, uiStep: '3-flow-filters'});
        // parent.postMessage('filter-to-altered-interactions', '*');
    }

    // Flow filters

    function filterToEnablingFlows() {
        const newState = JSON.parse(JSON.stringify(uiState));
        newState.flowFilters.enablingFlows = true;
        newState.flowFilters.irrelevantToFlows = false;
        setUiState(newState);
        setUiStep_withDelay({...newState, uiStep: '4-shape-filters'});
        // parent.postMessage('filter-to-flow-shapes', '*');
    }
    function toggleEnablingFlows() {
        const newState = JSON.parse(JSON.stringify(uiState));
        newState.flowFilters.enablingFlows = !newState.flowFilters.enablingFlows;
        setUiState(newState);
    }

    function filterToIrrelevantFlows() {
        const newState = JSON.parse(JSON.stringify(uiState));
        newState.flowFilters.enablingFlows = false;
        newState.flowFilters.irrelevantToFlows = true;
        setUiState(newState);
        setUiStep_withDelay({...newState, uiStep: '4-shape-filters'});
        // parent.postMessage('filter-to-non-flow-shapes', '*');
    }
    function toggleIrrelevantToFlows() {
        const newState = JSON.parse(JSON.stringify(uiState));
        newState.flowFilters.irrelevantToFlows = !newState.flowFilters.irrelevantToFlows;
        setUiState(newState);
    }

    // Shape filters

    function filterToComponents() {
        const newState = JSON.parse(JSON.stringify(uiState));
        newState.shapeFilters.components = true;
        newState.shapeFilters.nonComponents = false;
        setUiState(newState);
        setUiStep_withDelay({...newState, uiStep: '5-trigger-filters'});
        // parent.postMessage('filter-to-components', '*');
    }

    function toggleComponents() {
        const newState = JSON.parse(JSON.stringify(uiState));
        newState.shapeFilters.components = !newState.shapeFilters.components;
        setUiState(newState);
    }

    function filterToNonComponents() {
        const newState = JSON.parse(JSON.stringify(uiState));
        newState.shapeFilters.components = false;
        newState.shapeFilters.nonComponents = true;
        setUiState(newState);
        setUiStep_withDelay({...newState, uiStep: '5-trigger-filters'});
        // parent.postMessage('filter-to-non-components', '*');
    }

    function toggleNonComponents() {
        const newState = JSON.parse(JSON.stringify(uiState));
        newState.shapeFilters.nonComponents = !newState.shapeFilters.nonComponents;
        setUiState(newState);
    }

    // Interaction filters

    function filterToOnClicks() {
        const newState = JSON.parse(JSON.stringify(uiState));
        newState.triggerFilters.onClicks = true;
        newState.triggerFilters.onMouseEnters = false;
        newState.triggerFilters.onMouseLeaves = false;
        newState.triggerFilters.afterDelays = false;
        setUiState(newState);
        setUiStep_withDelay({...newState, uiStep: '6-completion'});
        // parent.postMessage('filter-to-on-clicks', '*');
    }

    function toggleOnClicks() {
        const newState = JSON.parse(JSON.stringify(uiState));
        newState.triggerFilters.onClicks = !newState.triggerFilters.onClicks;
        setUiState(newState);
    }

    function filterToOnMouseEnters() {
        const newState = JSON.parse(JSON.stringify(uiState));
        newState.triggerFilters.onClicks = false;
        newState.triggerFilters.onMouseEnters = true;
        newState.triggerFilters.onMouseLeaves = false;
        newState.triggerFilters.afterDelays = false;
        setUiState(newState);
        setUiStep_withDelay({...newState, uiStep: '6-completion'});
        // parent.postMessage('filter-to-on-mouse-enters', '*');
    }   

    function toggleOnMouseEnters() {
        const newState = JSON.parse(JSON.stringify(uiState));
        newState.triggerFilters.onMouseEnters = !newState.triggerFilters.onMouseEnters;
        setUiState(newState);
    }

    function filterToOnMouseLeaves() {
        const newState = JSON.parse(JSON.stringify(uiState));
        newState.triggerFilters.onClicks = false;
        newState.triggerFilters.onMouseEnters = false;
        newState.triggerFilters.onMouseLeaves = true;
        newState.triggerFilters.afterDelays = false;
        setUiState(newState);
        setUiStep_withDelay({...newState, uiStep: '6-completion'});
        // parent.postMessage('filter-to-on-mouse-leaves', '*');
    }

    function toggleOnMouseLeaves() {
        const newState = JSON.parse(JSON.stringify(uiState));
        newState.triggerFilters.onMouseLeaves = !newState.triggerFilters.onMouseLeaves;
        setUiState(newState);
    }

    function filterToAfterDelays() {
        const newState = JSON.parse(JSON.stringify(uiState));
        newState.triggerFilters.onClicks = false;
        newState.triggerFilters.onMouseEnters = false;
        newState.triggerFilters.onMouseLeaves = false;
        newState.triggerFilters.afterDelays = true;
        setUiState(newState);
        setUiStep_withDelay({...newState, uiStep: '6-completion'});
        // parent.postMessage('filter-to-after-delays', '*');
    }

    function toggleAfterDelays() {
        const newState = JSON.parse(JSON.stringify(uiState));
        newState.triggerFilters.afterDelays = !newState.triggerFilters.afterDelays;
        setUiState(newState);
    }

    function removeInteractions() {
        parent.postMessage('remove-click-interactions', '*');
        parent.postMessage('remove-mouseenter-interactions', '*');
        parent.postMessage('remove-mouseleave-interactions', '*');
        parent.postMessage('remove-after-delay-interactions', '*');
    }
}

export default App;
