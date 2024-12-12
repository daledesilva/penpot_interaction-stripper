import React, { FC, ReactNode, useEffect, useRef, useState } from 'react';
import StepAccordion from './components/StepAccordion';
import ModeButton from './components/ModeButton';
import FilterToggle from './components/FilterToggle';
import AccordionStretchContainer from './components/AccordionStretchContainer';
import { applyFilters } from './logic/apply-filters';
import ActionButton from './components/ActionButton';

///////////

const HISTORY_LENGTH = 5;

///////////
///////////
export interface AppState {
    uiStep:   '1-no-selection'
            | '2-filter-mode'
            | '3-flow-filters'
            | '4-component-filters'
            | '5-trigger-filters'
            | '6-confirmation',
    filterMode: null | 'interactions' | 'missing-interactions' | 'altered-interactions',
    flowFilters: {
        enablingFlows: boolean,
        irrelevantToFlows: boolean
    },
    componentFilters: {
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
    filterMode: null,
    flowFilters: {
        enablingFlows: true,
        irrelevantToFlows: true
    },
    componentFilters: {
        components: true,
        nonComponents: true
    },
    triggerFilters: {
        onClicks: true,
        onMouseEnters: true,
        onMouseLeaves: true,
        afterDelays: true
    },
    isActionable: false,
}
    

interface AppProps {
    children?: ReactNode;
    // Add other props here
}

const App: FC<AppProps> = ({ children }) => {
    const [appState, setAppState] = useState<AppState>(initialUiState);
    const appStateHistory = useRef<AppState[]>([]);

    useEffect(() => {

        window.addEventListener("message", (event) => {
            if(event.data.source !== "penpot") return;
        
            if(event.data.type === "selection-change") {
                appStateHistory.current.push(initialUiState);
                if(appStateHistory.current.length > HISTORY_LENGTH) appStateHistory.current.shift();

                const newUiState = JSON.parse(JSON.stringify(initialUiState));
                if(event.data.selectionIds.length) {
                    newUiState.uiStep = '2-filter-mode';
                }
                setAppState(newUiState);
                console.log('appStateHistory', appStateHistory.current);
            }
        })

    }, []);

    return (<>
        <div style={{
            height: '100%',
            margin: 0,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            gap: '15px'
        }}>
            <AccordionStretchContainer
                style = {{
                    flexGrow: 1,
                }}
            >

                <StepAccordion
                    isOpen = {appState.uiStep === '1-no-selection'}
                    onToggle = {() => setAppState({...appState, uiStep: '1-no-selection'})}
                >
                    <p>Select an object to begin...</p>
                </StepAccordion>

                <StepAccordion
                    title = 'Filter mode'
                    isDisabled = {appState.uiStep === '1-no-selection'}
                    isOpen = {appState.uiStep === '2-filter-mode'}
                    onToggle = {() => setAppState({...appState, uiStep: '2-filter-mode'})}
                    onForward = {appState.isActionable ? () => setAppState({...appState, uiStep: '3-flow-filters'}) : undefined}
                >
                    <ModeButton
                        active = {appState.filterMode === 'interactions'}
                        filter = {filterToInteractions}
                    >
                        Interactions & transitions
                    </ModeButton>
                    <ModeButton
                        active = {appState.filterMode === 'missing-interactions'}
                        filter = {filterToMissingInteractions}
                    >
                        Missing interactions
                    </ModeButton>
                    <ModeButton
                        active = {appState.filterMode === 'altered-interactions'}
                        filter = {filterToAlteredInteractions}
                    >
                        Altered interactions
                    </ModeButton>
                </StepAccordion>
            
                <StepAccordion
                    title = 'Flow filters'
                    isDisabled = {!appState.filterMode}
                    isOpen = {appState.uiStep === '3-flow-filters'} 
                    onToggle = {() => setAppState({...appState, uiStep: '3-flow-filters'})}
                    onForward = {() => setAppState({...appState, uiStep: '4-component-filters'})}
                    onBackward = {() => setAppState({...appState, uiStep: '2-filter-mode'})}
                >
                    <FilterToggle
                        name = 'enablingFlows'
                        active = {appState.flowFilters.enablingFlows}
                        onToggle = {toggleEnablingFlows}
                    >
                        Enabling flows
                    </FilterToggle>
                    <FilterToggle
                        name = 'irrelevantToFlows'
                        active = {appState.flowFilters.irrelevantToFlows}
                        onToggle = {toggleIrrelevantToFlows}
                    >
                        Irrelevant to flows
                    </FilterToggle>
                </StepAccordion>

                <StepAccordion
                    title = 'Component filters'
                    isDisabled = {!appState.filterMode}
                    isOpen = {appState.uiStep === '4-component-filters'}
                    onToggle = {() => setAppState({...appState, uiStep: '4-component-filters'})}
                    onForward = {() => setAppState({...appState, uiStep: '5-trigger-filters'})}
                    onBackward = {() => setAppState({...appState, uiStep: '3-flow-filters'})}
                >
                    <FilterToggle
                        name = 'components'
                        active = {appState.componentFilters.components}
                        onToggle = {toggleComponents}
                    >
                        Components
                    </FilterToggle>
                    <FilterToggle
                        name = 'nonComponents'
                        active = {appState.componentFilters.nonComponents}
                        onToggle = {toggleNonComponents}
                    >
                        Non-Components
                    </FilterToggle>
                </StepAccordion>

                <StepAccordion
                    title = 'Trigger filters' 
                    isDisabled = {!appState.filterMode}
                    isOpen = {appState.uiStep === '5-trigger-filters'}
                    onToggle = {() => setAppState({...appState, uiStep: '5-trigger-filters'})}
                    onBackward = {() => setAppState({...appState, uiStep: '4-component-filters'})}
                >
                    <FilterToggle
                        name = 'onClicks'
                        active = {appState.triggerFilters.onClicks}
                        onToggle = {toggleOnClicks}
                    >
                        On Clicks
                    </FilterToggle>
                    <FilterToggle
                        name = 'onMouseEnters'
                        active = {appState.triggerFilters.onMouseEnters}
                        onToggle = {toggleOnMouseEnters}
                    >
                        On Mouse Enters
                    </FilterToggle>
                    <FilterToggle
                        name = 'onMouseLeaves'
                        active = {appState.triggerFilters.onMouseLeaves}
                        onToggle = {toggleOnMouseLeaves}
                    >
                        On Mouse Leaves
                    </FilterToggle>
                    <FilterToggle
                        name = 'afterDelays'
                        active = {appState.triggerFilters.afterDelays}
                        onToggle = {toggleAfterDelays}
                    >
                        After Delays
                    </FilterToggle>
                </StepAccordion>

                {appState.uiStep === '6-confirmation' && (<div>
                    <h1>Changes applied</h1>
                </div>)}

            </AccordionStretchContainer>

            {/* {appState.filterMode && ( */}
            <div>
                <ActionButton
                    onClick = {removeInteractions}
                    disabled = {!appState.isActionable}
                >
                    Strip Interactions
                </ActionButton>
            </div>
            {/* )} */}
        </div>
    </>);

    // Helper functions
    ///////////////////

    // Filter modes

    function setUiStep_withDelay(newState: AppState) {
        setTimeout(() => {
            setAppState(newState);
        }, 200);
    }

    // Filter modes

    function filterToInteractions() {
        const newState = JSON.parse(JSON.stringify(appState));
        newState.filterMode = 'interactions';
        setAppState(newState);
        setUiStep_withDelay({
            ...newState,
            uiStep: '3-flow-filters',
            isActionable: true
        });
        applyFilters(newState);
    }
    function filterToMissingInteractions() { 
        const newState = JSON.parse(JSON.stringify(appState));
        newState.filterMode = 'missing-interactions';
        setAppState(newState);
        setUiStep_withDelay({
            ...newState,
            uiStep: '3-flow-filters',
            isActionable: true
        });
        applyFilters(newState);
    }
    function filterToAlteredInteractions() {
        const newState = JSON.parse(JSON.stringify(appState));
        newState.filterMode = 'altered-interactions';
        setAppState(newState);
        setUiStep_withDelay({
            ...newState,
            uiStep: '3-flow-filters',
            isActionable: true
        });
        applyFilters(newState);
    }

    // Flow filters

    function filterToEnablingFlows() {
        const newState = JSON.parse(JSON.stringify(appState));
        newState.flowFilters.enablingFlows = true;
        newState.flowFilters.irrelevantToFlows = false;
        setAppState(newState);
        setUiStep_withDelay({...newState, uiStep: '4-component-filters'});
        applyFilters(newState);
    }
    function toggleEnablingFlows() {
        const newState = JSON.parse(JSON.stringify(appState));
        newState.flowFilters.enablingFlows = !newState.flowFilters.enablingFlows;
        setAppState(newState);
        applyFilters(newState);
    }

    function filterToIrrelevantFlows() {
        const newState = JSON.parse(JSON.stringify(appState));
        newState.flowFilters.enablingFlows = false;
        newState.flowFilters.irrelevantToFlows = true;
        setAppState(newState);
        setUiStep_withDelay({...newState, uiStep: '4-component-filters'});
        applyFilters(newState);
    }
    function toggleIrrelevantToFlows() {
        const newState = JSON.parse(JSON.stringify(appState));
        newState.flowFilters.irrelevantToFlows = !newState.flowFilters.irrelevantToFlows;
        setAppState(newState);
        applyFilters(newState);
    }

    // Shape filters

    function filterToComponents() {
        const newState = JSON.parse(JSON.stringify(appState));
        newState.componentFilters.components = true;
        newState.componentFilters.nonComponents = false;
        setAppState(newState);
        setUiStep_withDelay({...newState, uiStep: '5-trigger-filters'});
        applyFilters(newState);
    }

    function toggleComponents() {
        const newState = JSON.parse(JSON.stringify(appState));
        newState.componentFilters.components = !newState.componentFilters.components;
        setAppState(newState);
        applyFilters(newState);
    }

    function filterToNonComponents() {
        const newState = JSON.parse(JSON.stringify(appState));
        newState.componentFilters.components = false;
        newState.componentFilters.nonComponents = true;
        setAppState(newState);
        setUiStep_withDelay({...newState, uiStep: '5-trigger-filters'});
        applyFilters(newState);
    }

    function toggleNonComponents() {
        const newState = JSON.parse(JSON.stringify(appState));
        newState.componentFilters.nonComponents = !newState.componentFilters.nonComponents;
        setAppState(newState);
        applyFilters(newState);
    }

    // Interaction filters

    function filterToOnClicks() {
        const newState = JSON.parse(JSON.stringify(appState));
        newState.triggerFilters.onClicks = true;
        newState.triggerFilters.onMouseEnters = false;
        newState.triggerFilters.onMouseLeaves = false;
        newState.triggerFilters.afterDelays = false;
        setAppState(newState);
        setUiStep_withDelay({...newState, uiStep: '6-completion'});
        applyFilters(newState);
    }

    function toggleOnClicks() {
        const newState = JSON.parse(JSON.stringify(appState));
        newState.triggerFilters.onClicks = !newState.triggerFilters.onClicks;
        setAppState(newState);
        applyFilters(newState);
    }

    function filterToOnMouseEnters() {
        const newState = JSON.parse(JSON.stringify(appState));
        newState.triggerFilters.onClicks = false;
        newState.triggerFilters.onMouseEnters = true;
        newState.triggerFilters.onMouseLeaves = false;
        newState.triggerFilters.afterDelays = false;
        setAppState(newState);
        setUiStep_withDelay({...newState, uiStep: '6-completion'});
        applyFilters(newState);
    }   

    function toggleOnMouseEnters() {
        const newState = JSON.parse(JSON.stringify(appState));
        newState.triggerFilters.onMouseEnters = !newState.triggerFilters.onMouseEnters;
        setAppState(newState);
        applyFilters(newState);
    }

    function filterToOnMouseLeaves() {
        const newState = JSON.parse(JSON.stringify(appState));
        newState.triggerFilters.onClicks = false;
        newState.triggerFilters.onMouseEnters = false;
        newState.triggerFilters.onMouseLeaves = true;
        newState.triggerFilters.afterDelays = false;
        setAppState(newState);
        setUiStep_withDelay({...newState, uiStep: '6-completion'});
        applyFilters(newState);
    }

    function toggleOnMouseLeaves() {
        const newState = JSON.parse(JSON.stringify(appState));
        newState.triggerFilters.onMouseLeaves = !newState.triggerFilters.onMouseLeaves;
        setAppState(newState);
        applyFilters(newState);
    }

    function filterToAfterDelays() {
        const newState = JSON.parse(JSON.stringify(appState));
        newState.triggerFilters.onClicks = false;
        newState.triggerFilters.onMouseEnters = false;
        newState.triggerFilters.onMouseLeaves = false;
        newState.triggerFilters.afterDelays = true;
        setAppState(newState);
        setUiStep_withDelay({...newState, uiStep: '6-completion'});
        applyFilters(newState);
    }

    function toggleAfterDelays() {
        const newState = JSON.parse(JSON.stringify(appState));
        newState.triggerFilters.afterDelays = !newState.triggerFilters.afterDelays;
        setAppState(newState);
        applyFilters(newState);
    }

    function removeInteractions() {
        // parent.postMessage('remove-click-interactions', '*');
        // parent.postMessage('remove-mouseenter-interactions', '*');
        // parent.postMessage('remove-mouseleave-interactions', '*');
        // parent.postMessage('remove-after-delay-interactions', '*');
    }
}

export default App;
