import React, { FC, ReactNode, useEffect } from 'react';
import ActionButton from './components/ActionButton';
import { ObjectText, DestText, TriggerText, FocusText } from './components/StyledText';
import { atom, useAtom, useAtomValue } from 'jotai';
import { trackLaunchEvent, trackRedoEvent, trackRemoveInteractionsEvent, trackUndoEvent } from './connections/analytics';
import InfoButton from './components/InfoButton';
import SupportButton from './components/SupportButton';
import SocialsButton from './components/SocialsButton';

///////////
///////////

export type UserSelection = 'none' | 'boards';
export type ObjectTypes = 'any objects' | 'components' | 'non-components' | 'boards';
export type DestinationTypes = 'anywhere' | 'within the selection' | 'outside the selection' | 'overlays' | 'to previous screens' | 'to urls';
export type TriggerTypes = 'any interactions' | 'clicks' | 'mouse enters' | 'mouse leaves' | 'after delays';

export const userSelectionAtom = atom<UserSelection>('none');
export const triggerTypeAtom = atom<TriggerTypes>('any interactions');
export const destinationTypeAtom = atom<DestinationTypes>('anywhere');
export const objectTypeAtom = atom<ObjectTypes>('any objects');

interface AppProps {
    children?: ReactNode;
}

const App: FC<AppProps> = () => {
    const [userSelection, setUserSelection] = useAtom(userSelectionAtom);
    const triggerTypes = useAtomValue(triggerTypeAtom);
    const destinationType = useAtomValue(destinationTypeAtom);
    const objectType = useAtomValue(objectTypeAtom);

    useEffect(() => {
        trackLaunchEvent();

        window.addEventListener("message", (event) => {
            if(event.data.source !== "penpot") return;
        
            if(event.data.type === "selection-change") {
                if(event.data.selectionIds.length) {
                    setUserSelection('boards');
                } else {
                    setUserSelection('none');
                }
            }
        })

        window.addEventListener("keydown", (event) => {
            if ((event.ctrlKey || event.metaKey) && event.key === 'z') {
                event.preventDefault();
                if(event.shiftKey) {
                    redoInPenpot();
                } else {
                    undoInPenpot();
                }
            }
        });

    }, []);

    return (<>
        <div style={{
            height: '100%',
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            alignContent: 'center',
            justifyContent: 'center',
        }}>

                
                    <p
                        style={{
                            textAlign: 'center',
                            fontSize: '25px',
                            lineHeight: '1.3em',
                            fontWeight: 100,
                            color: '#888',
                            background: 'none',
                        }}
                >
                    {userSelection === 'none' && (<>
                        Select <FocusText>boards</FocusText> to begin...
                    </>)}
                    {userSelection === 'boards' && (<>
                        <TriggerText/> that transition <DestText/> from <ObjectText/>...
                    </>)}
                </p>

                {userSelection === 'boards' && (
                    <p
                        style={{
                            textAlign: 'center',
                            fontSize: '25px',
                            lineHeight: '1.3em',
                            fontWeight: 100,
                            color: '#888',
                            background: 'none',
                        }}
                    >
                        
                    </p>
                )}

            

            {userSelection !== 'none' && (
                <div
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        display: 'flex',
                        // width: '100%',
                        flexDirection: 'row',
                        gap: '10px',
                        // justifyContent: 'space-between',
                    }}
                >
                    {/* <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '10px',
                        }}
                    > */}
                        <InfoButton/>
                        <ActionButton
                            onClick = {removeInteractions}
                        >
                            Strip 'em!
                        </ActionButton>
                    {/* </div> */}
                </div>
            )}

            {userSelection === 'none' && (
                <div
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        gap: '10px',
                    }}
                >
                        <SupportButton/>
                        <SocialsButton/>
                </div>
            )}
        </div>
    </>);

    // Helper functions
    ///////////////////

    function removeInteractions() {

        trackRemoveInteractionsEvent({
            objectTypes: objectType,
            destinationTypes: destinationType,
            triggerTypes
        });	

        parent.postMessage({
            action: 'remove-interactions',
            data: {
                triggerTypes,
                objectType,
                destinationType
            }
        }, '*');
    }

    function undoInPenpot() {
        trackUndoEvent();
        parent.postMessage({
            action: 'undo',
        }, '*');
    }
    
    function redoInPenpot() {
        trackRedoEvent();
        parent.postMessage({
            action: 'redo',
        }, '*');
    }
}

export default App;
