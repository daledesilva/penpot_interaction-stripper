import { AppState } from "../app";

//////////////////////////
//////////////////////////

export function applyFilters(appState: AppState) {
    if(appState.filterMode === null) return;

    parent.postMessage({
        action: 'apply-filters',
        data: appState
    }, '*');
}

