

//////////////////////////
//////////////////////////

interface RemoveInteractionsProps {
    triggerTypes: string,
    objectType: string,
    destinationType: string
}

export function removeInteractions(filterProps: RemoveInteractionsProps) {
    parent.postMessage({
        action: 'apply-filters',
        data: filterProps
    }, '*');
}

