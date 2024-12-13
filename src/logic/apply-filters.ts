import { AppState } from "../app";

//////////////////////////
//////////////////////////

export function applyFilters(appState: AppState) {
    if(appState.mode === null) return;

    parent.postMessage({
        action: 'apply-filters',
        data: appState
    }, '*');
}

