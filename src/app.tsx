import React, { FC, ReactNode, useEffect } from 'react';
import ActionButton from './components/ActionButton';
import { ObjectText, DestText, TriggerText, FocusText } from './components/StyledText';
import { atom, useAtom, useAtomValue } from 'jotai'

///////////
///////////

export type UserSelection = 'none' | 'boards';
export type ObjectType = 'any objects' | 'components' | 'non-components' | 'boards';
export type DestinationType = 'anywhere' | 'within the selection' | 'outside the selection' | 'overlays' | 'to previous screens' | 'to urls';
export type TriggerType = 'any interactions' | 'clicks' | 'mouse enters' | 'mouse leaves' | 'after delays';

export const userSelectionAtom = atom<UserSelection>('none');
export const triggerTypeAtom = atom<TriggerType>('any interactions');
export const destinationTypeAtom = atom<DestinationType>('anywhere');
export const objectTypeAtom = atom<ObjectType>('any objects');

interface AppProps {
    children?: ReactNode;
}

const App: FC<AppProps> = () => {
    const [userSelection, setUserSelection] = useAtom(userSelectionAtom);
    const triggerTypes = useAtomValue(triggerTypeAtom);
    const destinationType = useAtomValue(destinationTypeAtom);
    const objectType = useAtomValue(objectTypeAtom);

    useEffect(() => {

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
                undoInPenpot();
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
                        right: '0',
                        bottom: '0',
                    }}
                >
                    <ActionButton
                        onClick = {removeInteractions}
                    >
                        Strip 'em!
                    </ActionButton>
                </div>
            )}
        </div>
    </>);

    // Helper functions
    ///////////////////

    function removeInteractions() {
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
        parent.postMessage({
            action: 'undo',
        }, '*');
    }
}

export default App;
