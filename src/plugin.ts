import { Shape } from "@penpot/plugin-types";
import { filterToHasInteractions } from "./logic/filter-to-has-interactions";
import { filterToComponents } from "./logic/filter-to-components";
import { filterToNonComponents } from "./logic/filter-to-non-components";
import { filterToMissingInteractions } from "./logic/filter-to-missing-interactions";
import { filterToAddedInteractions } from "./logic/filter-to-added-interactions";
import { removeInteractions } from "./logic/remove-interactions";
import { filterToFlowShapes } from "./logic/filter-to-flow-shapes";
import { filterToNonFlowShapes } from "./logic/filter-to-non-flow-shapes";
import { debug } from "./utils/log-to-console";
import { selectionsEquivalent } from "./logic/selections-equivalent";
import { AppState } from "./app";
import { filterToOnClicks } from "./logic/filter-to-on-clicks";
import { filterToOnMouseEnters } from "./logic/filter-to-on-mouse-enters";
import { filterToOnMouseLeaves } from "./logic/filter-to-on-mouse-leaves";
import { filterToAfterDelays } from "./logic/filter-after-delays";
// import { TextDecoder } from 'text-encoding';

///////////

type Selection = Shape[];

// NOTE: This is a hack because plugin.ts won't import constants.ts
const HISTORY_LENGTH = 5;

const selectionHistory: Selection[] = [];
let selectionFromUser: Selection = penpot.selection;
let selectionAfterModeFilters: Selection;
let selectionAfterFlowFilters: Selection;
let selectionAfterComponentFilters: Selection;
let selectionAfterTriggerFilters: Selection;
let expectedSelectionIds: string[] = [];

///////////
///////////

penpot.ui.open("Interaction Stripper", `?theme=${penpot.theme}`, {
	width: 200,
	height: 300,
});

interface Message {
	action: string;
	data: any;
}
penpot.ui.onMessage<Message>((message) => {

	if (message.action === 'apply-filters') {
		const appState: AppState = message.data;

		// Filter mode messages
		if (appState.filterMode === 'interactions') {
			selectionAfterModeFilters = filterToHasInteractions(selectionFromUser);
			penpot.selection = selectionAfterModeFilters;
			ignoreRecentSelectionChange();
		} else if (appState.filterMode === 'missing-interactions') {
			selectionAfterModeFilters = filterToMissingInteractions(selectionFromUser);
			penpot.selection = selectionAfterModeFilters;
			ignoreRecentSelectionChange();
		} else if (appState.filterMode === 'altered-interactions') {
			selectionAfterModeFilters = filterToAddedInteractions(selectionFromUser);
			penpot.selection = selectionAfterModeFilters;
			ignoreRecentSelectionChange();
		} else {
			selectionAfterModeFilters = selectionFromUser;
		}


		// Flow filter messages
		if(appState.flowFilters.enablingFlows || appState.flowFilters.irrelevantToFlows) {
			selectionAfterFlowFilters = [];
			if (appState.flowFilters.enablingFlows) {
				selectionAfterFlowFilters.push(...filterToFlowShapes({
					_shapesToFilter: selectionAfterModeFilters,
					_originalUserSelection: selectionFromUser
				}));
			}
			if (appState.flowFilters.irrelevantToFlows) {
				selectionAfterFlowFilters.push(...filterToNonFlowShapes({
					_shapesToFilter: selectionAfterModeFilters,
					_originalUserSelection: selectionFromUser
				}));
			}
		} else {
			selectionAfterFlowFilters = selectionAfterModeFilters;
		}

		// Shape filter messages
		if(appState.componentFilters.components || appState.componentFilters.nonComponents) {
			selectionAfterComponentFilters = [];
			if (appState.componentFilters.components) {
				selectionAfterComponentFilters.push(...filterToComponents(selectionAfterFlowFilters));
			}
			if (appState.componentFilters.nonComponents) {
				selectionAfterComponentFilters.push(...filterToNonComponents(selectionAfterFlowFilters));
			}
		} else {
			selectionAfterComponentFilters = selectionAfterFlowFilters;
		}
		
		// Trigger filter messages
		if(appState.triggerFilters.onClicks || appState.triggerFilters.onMouseEnters || appState.triggerFilters.onMouseLeaves || appState.triggerFilters.afterDelays) {
			selectionAfterTriggerFilters = [];
			if (appState.triggerFilters.onClicks) {
				selectionAfterTriggerFilters.push(...filterToOnClicks(selectionAfterComponentFilters));
			}
			if (appState.triggerFilters.onMouseEnters) {
				selectionAfterTriggerFilters.push(...filterToOnMouseEnters(selectionAfterComponentFilters));
			}
			if (appState.triggerFilters.onMouseLeaves) {
				selectionAfterTriggerFilters.push(...filterToOnMouseLeaves(selectionAfterComponentFilters));
			}
			if (appState.triggerFilters.afterDelays) {
				selectionAfterTriggerFilters.push(...filterToAfterDelays(selectionAfterComponentFilters));
			}
		} else {
			selectionAfterTriggerFilters = selectionAfterComponentFilters;
		}

		penpot.selection = selectionAfterTriggerFilters;
		ignoreRecentSelectionChange();

	}




	///////

	// if (message === "remove-interactions") {
	// 	const undoBlockId = penpot.history.undoBlockBegin();
	// 	removeInteractions(penpot.selection);
	// 	penpot.history.undoBlockFinish(undoBlockId);
	// }
	// if (message === "remove-click-interactions") {
	// 	const undoBlockId = penpot.history.undoBlockBegin();
	// 	removeInteractions(penpot.selection, { click: true });
	// 	penpot.history.undoBlockFinish(undoBlockId);
	// }
	// if (message === "remove-mouseenter-interactions") {
	// 	const undoBlockId = penpot.history.undoBlockBegin();
	// 	removeInteractions(penpot.selection, { mouseEnter: true });
	// 	penpot.history.undoBlockFinish(undoBlockId);
	// }
	// if (message === "remove-mouseleave-interactions") {
	// 	const undoBlockId = penpot.history.undoBlockBegin();
	// 	removeInteractions(penpot.selection, { mouseLeave: true });
	// 	penpot.history.undoBlockFinish(undoBlockId);
	// }
	// if (message === "remove-afterdelay-interactions") {
	// 	const undoBlockId = penpot.history.undoBlockBegin();
	// 	removeInteractions(penpot.selection, { afterDelay: true });
	// 	penpot.history.undoBlockFinish(undoBlockId);
	// }

});


let selectionDebounceTimer: NodeJS.Timeout | null = null;
//
penpot.on('selectionchange', (newSelectionIds: string[]) => {
	if (selectionDebounceTimer) clearTimeout(selectionDebounceTimer);
	selectionDebounceTimer = setTimeout(() => {

		if (selectionsEquivalent(expectedSelectionIds, newSelectionIds)) return;
		// TODO: Shouldn't save empty selections, but need to translate that to appStateHistory too
		selectionHistory.push(selectionFromUser);
		selectionFromUser = penpot.selection;
		expectedSelectionIds = newSelectionIds;

		if (selectionHistory.length > HISTORY_LENGTH) selectionHistory.shift();
		debug(['curSelection', selectionFromUser]);
		debug(['selectionHistory', selectionHistory]);

		penpot.ui.sendMessage({
			source: "penpot",
			type: "selection-change",
			selectionIds: expectedSelectionIds,
		});

	}, 1000);

});
function ignoreRecentSelectionChange() {
	expectedSelectionIds = penpot.selection.map((shape) => shape.id);
}


// Update the theme in the iframe
penpot.on("themechange", (theme) => {
	penpot.ui.sendMessage({
		source: "penpot",
		type: "themechange",
		theme,
	});
});


async function exportSvg(shape: Shape) {
	const svgUint8 = await shape.export({ type: 'svg', scale: 1 });
	console.log('svgExport', svgUint8);

	const utf8Decoder = new TextDecoder('utf-8');
	console.log('utf8Decoder', utf8Decoder);
	const svgStr = utf8Decoder.decode(svgUint8);
	console.log('svgStr', svgStr);

	penpot.ui.open('Name', 'url', { width: 150, height: 150 });
}


async function resizeOrClose() {
	console.log('close');
	// window.setTimeout( () => {
	//   console.log('open');
	//   penpot.ui.open('Name', 'url', {width: 150, height: 150});
	// }, 500);
	penpot.closePlugin();
}