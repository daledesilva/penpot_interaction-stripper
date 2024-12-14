import { useAtom } from 'jotai';
import React, { FC, ReactNode } from 'react';
import { destinationTypeAtom, objectTypeAtom, triggerTypesAtom } from '../app';

////////////////////////////
////////////////////////////

interface StyledTextProps {}

export const ObjectText: FC<StyledTextProps> = () => {
    const [objectType, setObjectType] = useAtom(objectTypeAtom);

    return (
        <a
            href="#"
            onClick={(e) => {
                e.preventDefault();
                switch (objectType) {
                    case 'any objects':
                        setObjectType('components');
                        break;
                    case 'components':
                        setObjectType('non-components');
                        break;
                    case 'non-components':
                        setObjectType('boards');
                        break;
                    case 'boards':
                        setObjectType('any objects');
                        break;
                }
            }}
            style={{
                textDecoration: 'none',
            }}
        >
            <span style={{
                color: 'yellow',
                fontWeight: 'bold',
            }}>
                {objectType}
            </span>
        </a>
    );
}

export const DestText: FC<StyledTextProps> = () => {
    const [destinationType, setDestinationType] = useAtom(destinationTypeAtom);

    return (
        <a
            href="#"
            onClick={(e) => {
                e.preventDefault();
                switch (destinationType) {
                    case 'anywhere':
                        setDestinationType('outside the selection');
                        break;
                    case 'outside the selection':
                        setDestinationType('within the selection');
                        break;
                    case 'within the selection':
                        setDestinationType('overlays');
                        break;
                    case 'overlays':
                        setDestinationType('to previous screens');
                        break;
                    case 'to previous screens':
                        setDestinationType('to urls');
                        break;
                    case 'to urls':
                        setDestinationType('anywhere');
                        break;
                }
            }}
            style={{
                textDecoration: 'none',
            }}
        >
            <span style={{
                color: 'yellow',
                fontWeight: 'bold',
            }}>
                {destinationType}
            </span>
        </a>
    );
}

export const TriggerText: FC<StyledTextProps> = () => {
    const [triggerTypes, setTriggerTypes] = useAtom(triggerTypesAtom);

    return (
        <a
            href="#"
            onClick={(e) => {
                e.preventDefault();
                switch (triggerTypes) {
                    case 'any interactions':
                        setTriggerTypes('clicks');
                        break;
                    case 'clicks':
                        setTriggerTypes('mouse enters');
                        break;
                    case 'mouse enters':
                        setTriggerTypes('mouse leaves');
                        break;
                    case 'mouse leaves':
                        setTriggerTypes('after delays');
                        break;
                    case 'after delays':
                        setTriggerTypes('any interactions');
                        break;
                }
            }}
            style={{
                textDecoration: 'none',
            }}
        >
            <span style={{
                color: 'yellow',
                fontWeight: 'bold',
            }}>
                {triggerTypes}
            </span>
        </a>
    );
}


interface FocusTextProps {
    children: ReactNode;
}
export const FocusText: FC<FocusTextProps> = ({ children }) => {
    return (
        <span style={{
            color: 'white',
        }}>
            {children}
        </span>
    );
}