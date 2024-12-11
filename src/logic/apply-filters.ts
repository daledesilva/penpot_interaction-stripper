import { AppState } from "../app";

//////////////////////////
//////////////////////////

export function applyFilters(appState: AppState) {
    parent.postMessage({
        action: 'apply-filters',
        data: appState
    }, '*');
}

