import React, { FC, ReactNode, useEffect, useRef, useState } from 'react';
import StepAccordion from './components/StepAccordion';
import MenuButton from './components/MenuButton';
import FilterToggle from './components/FilterToggle';
import BodyContainer from './components/AccordionStretchContainer';
import { applyFilters } from './logic/apply-filters';
import ActionButton from './components/ActionButton';
import PageButton from './components/PageButton';
import { Page, PageCarousel, PageCarouselMenu } from './components/PageCarousel';

///////////

const HISTORY_LENGTH = 5;

///////////
///////////
export interface AppState {
    uiStep:   '1-no-selection'
            | '2-filter-mode'
            | '3-destination-filters'
            | '4-component-filters'
            | '5-trigger-filters'
            | '6-confirmation',
    mode: null | 'existing-interactions' | 'missing-interactions' | 'altered-interactions',
    destinations: 'all' | 'insideFlow' | 'outsideFlow' | 'overlays',
    objects: 'all' | 'components' | 'noncomponents',
    triggers: {
        onClicks: boolean,
        onMouseEnters: boolean,
        onMouseLeaves: boolean,
        afterDelays: boolean
    },
    isActionable: boolean,
}

const initialUiState: AppState = {
    uiStep: '1-no-selection',
    mode: null,
    destinations: 'all',
    objects: 'all',
    triggers: {
        onClicks: true,
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

                <PageCarouselMenu>
                    <PageButton
                        isActive = {appState.uiStep === '2-filter-mode'}
                        onClick = {() => setAppState({...appState, uiStep: '2-filter-mode'})}
                    >
                        Mode
                    </PageButton>
                    <PageButton
                        isActive = {appState.uiStep === '3-destination-filters'}
                        onClick = {() => setAppState({...appState, uiStep: '3-destination-filters'})}
                    >
                        Destinations
                    </PageButton>
                    <PageButton
                        isActive = {appState.uiStep === '4-component-filters'}
                        onClick = {() => setAppState({...appState, uiStep: '4-component-filters'})}
                    >
                        Objects
                    </PageButton>
                    <PageButton
                        isActive = {appState.uiStep === '5-trigger-filters'}
                        onClick = {() => setAppState({...appState, uiStep: '5-trigger-filters'})}
                    >
                        Triggers
                    </PageButton>
                </PageCarouselMenu>

            <BodyContainer
                style = {{
                    flexGrow: 1,
                }}
            >
                
                <PageCarousel
                    style = {{
                        flexGrow: 1,
                    }}
                >

                    <Page
                        active = {appState.uiStep === '1-no-selection'}
                    >
                        <p>Select an object to begin...</p>
                    </Page>


                    <Page
                        active = {appState.uiStep === '2-filter-mode'}
                    >
                        <MenuButton
                            active = {appState.mode === 'existing-interactions'}
                            onClick = {() => selectMode('existing-interactions')}
                        >
                            Existing interactions
                        </MenuButton>
                        <MenuButton
                            active = {appState.mode === 'missing-interactions'}
                            onClick = {() => selectMode('missing-interactions')}
                        >
                            Missing interactions
                        </MenuButton>
                        <MenuButton
                            active = {appState.mode === 'altered-interactions'}
                            onClick = {() => selectMode('altered-interactions')}
                        >
                            Altered interactions
                        </MenuButton>
                    </Page>
            
                    <Page
                        active = {appState.uiStep === '3-destination-filters'}
                    >
                        <MenuButton 
                            active = {appState.destinations === 'all'}
                            onClick = {() => selectDestinations('all')}
                        >
                            All
                        </MenuButton>
                        <MenuButton
                            active = {appState.destinations === 'insideFlow'}
                            onClick = {() => selectDestinations('insideFlow')}
                        >
                            Inside Selection
                        </MenuButton>
                        <MenuButton
                            active = {appState.destinations === 'outsideFlow'}
                            onClick = {() => selectDestinations('outsideFlow')}
                        >
                            Outside Selection
                        </MenuButton>
                        <MenuButton
                            active = {appState.destinations === 'overlays'}
                            onClick = {() => selectDestinations('overlays')}
                        >
                            Overlays
                        </MenuButton>
                    </Page>

                    <Page
                        active = {appState.uiStep === '4-component-filters'}
                    >
                        <MenuButton
                            active = {appState.objects === 'all'}
                            onClick = {() => selectObjects('all')}
                        >
                            All
                        </MenuButton>
                        <MenuButton
                            active = {appState.objects === 'components'}
                            onClick = {() => selectObjects('components')}
                        >
                            Components
                        </MenuButton>
                        <MenuButton
                            active = {appState.objects === 'noncomponents'}
                            onClick = {() => selectObjects('noncomponents')}
                        >
                            Non-Components
                        </MenuButton>
                    </Page>

                    <Page
                        active = {appState.uiStep === '5-trigger-filters'}
                    >
                        <FilterToggle
                            name = 'onClicks'
                            active = {appState.triggers.onClicks}
                            onToggle = {toggleOnClicks}
                        >
                            On Clicks
                        </FilterToggle>
                        <FilterToggle
                            name = 'onMouseEnters'
                            active = {appState.triggers.onMouseEnters}
                            onToggle = {toggleOnMouseEnters}
                        >
                            On Mouse Enters
                        </FilterToggle>
                        <FilterToggle
                            name = 'onMouseLeaves'
                            active = {appState.triggers.onMouseLeaves}
                            onToggle = {toggleOnMouseLeaves}
                        >
                            On Mouse Leaves
                        </FilterToggle>
                        <FilterToggle
                            name = 'afterDelays'
                            active = {appState.triggers.afterDelays}
                            onToggle = {toggleAfterDelays}
                        >
                            After Delays
                        </FilterToggle>
                    </Page>
                </PageCarousel>

                {appState.uiStep === '6-confirmation' && (<div>
                    <h1>Changes applied</h1>
                </div>)}

            </BodyContainer>

            {/* {appState.mode && ( */}
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

    function selectMode(mode: 'existing-interactions' | 'missing-interactions' | 'altered-interactions') {
        const newState: AppState = JSON.parse(JSON.stringify(appState));
        newState.mode = mode;
        setAppState(newState);
        setUiStep_withDelay({
            ...newState,
            uiStep: '3-destination-filters',
            isActionable: true
        });
        applyFilters(newState);
    }


    function selectDestinations(destination: 'all' | 'insideFlow' | 'outsideFlow' | 'overlays') {
        const newState: AppState = JSON.parse(JSON.stringify(appState));
        newState.destinations = destination;
        setAppState(newState);
        setUiStep_withDelay({...newState, uiStep: '4-component-filters'});
        applyFilters(newState);
    }

    function selectObjects(objects: 'all' | 'components' | 'noncomponents') {
        const newState: AppState = JSON.parse(JSON.stringify(appState));
        newState.objects = objects;
        setAppState(newState);
        setUiStep_withDelay({...newState, uiStep: '5-trigger-filters'});
        applyFilters(newState);
    }


    function toggleOnClicks() {
        const newState: AppState = JSON.parse(JSON.stringify(appState));
        newState.triggers.onClicks = !newState.triggers.onClicks;
        setAppState(newState);
        applyFilters(newState);
    }
    function toggleOnMouseEnters() {
        const newState: AppState = JSON.parse(JSON.stringify(appState));
        newState.triggers.onMouseEnters = !newState.triggers.onMouseEnters;
        setAppState(newState);
        applyFilters(newState);
    }
    function toggleOnMouseLeaves() {
        const newState: AppState = JSON.parse(JSON.stringify(appState));
        newState.triggers.onMouseLeaves = !newState.triggers.onMouseLeaves;
        setAppState(newState);
        applyFilters(newState);
    }
    function toggleAfterDelays() {
        const newState: AppState = JSON.parse(JSON.stringify(appState));
        newState.triggers.afterDelays = !newState.triggers.afterDelays;
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
