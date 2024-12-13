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
	width: 210,
	height: 300,
});

setTimeout(() => {
	expectedSelectionIds = sendAppSelectionIds();
}, 500);

interface Message {
	action: string;
	data: any;
}
penpot.ui.onMessage<Message>((message) => {

	if (message.action === 'apply-filters') {
		const appState: AppState = message.data;

		// Mode messages
		if (appState.mode === 'existing-interactions') {
			selectionAfterModeFilters = filterToHasInteractions(selectionFromUser);
			penpot.selection = selectionAfterModeFilters;
			ignoreRecentSelectionChange();
		} else if (appState.mode === 'missing-interactions') {
			selectionAfterModeFilters = filterToMissingInteractions(selectionFromUser);
			penpot.selection = selectionAfterModeFilters;
			ignoreRecentSelectionChange();
		} else if (appState.mode === 'altered-interactions') {
			selectionAfterModeFilters = filterToAddedInteractions(selectionFromUser);
			penpot.selection = selectionAfterModeFilters;
			ignoreRecentSelectionChange();
		} else {
			selectionAfterModeFilters = selectionFromUser;
		}

		// Destination filter messages
		selectionAfterFlowFilters = [];
		if (appState.destinations === 'insideFlow' || appState.destinations === 'all') {
			selectionAfterFlowFilters.push(...filterToFlowShapes({
				_shapesToFilter: selectionAfterModeFilters,
				_originalUserSelection: selectionFromUser
			}));
		}
		if (appState.destinations === 'outsideFlow' || appState.destinations === 'all') {
			selectionAfterFlowFilters.push(...filterToNonFlowShapes({
			_shapesToFilter: selectionAfterModeFilters,
				_originalUserSelection: selectionFromUser
			}));
		}

		// Object filter messages
		selectionAfterComponentFilters = [];
		if (appState.objects === 'components' || appState.objects === 'all') {
			selectionAfterComponentFilters.push(...filterToComponents(selectionAfterFlowFilters));
		}
		if (appState.objects === 'noncomponents' || appState.objects === 'all') {
			selectionAfterComponentFilters.push(...filterToNonComponents(selectionAfterFlowFilters));
		}
		
		// Trigger filter messages
		selectionAfterTriggerFilters = [];
		if (appState.triggers.onClicks) {
			selectionAfterTriggerFilters.push(...filterToOnClicks(selectionAfterComponentFilters));
		}
		if (appState.triggers.onMouseEnters) {
			selectionAfterTriggerFilters.push(...filterToOnMouseEnters(selectionAfterComponentFilters));
		}
		if (appState.triggers.onMouseLeaves) {
			selectionAfterTriggerFilters.push(...filterToOnMouseLeaves(selectionAfterComponentFilters));
		}
		if (appState.triggers.afterDelays) {
			selectionAfterTriggerFilters.push(...filterToAfterDelays(selectionAfterComponentFilters));
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
		debug(['expectedSelectionIds', expectedSelectionIds]);
		debug(['newSelectionIds', newSelectionIds]);

		if (selectionsEquivalent(expectedSelectionIds, newSelectionIds)) return;
		// TODO: Shouldn't save empty selections, but need to translate that to appStateHistory too
		selectionHistory.push(selectionFromUser);
		selectionFromUser = penpot.selection;
		expectedSelectionIds = newSelectionIds;

		if (selectionHistory.length > HISTORY_LENGTH) selectionHistory.shift();
		debug(['curSelection', selectionFromUser]);
		debug(['selectionHistory', selectionHistory]);

		sendAppSelectionIds(expectedSelectionIds);

	}, 1000);

});
function ignoreRecentSelectionChange() {
	expectedSelectionIds = penpot.selection.map((shape) => shape.id);
}
function sendAppSelectionIds(_selectionIds?: string[]): string[] {
	let selectionIds = _selectionIds || penpot.selection.map((shape) => shape.id);
	penpot.ui.sendMessage({
		source: "penpot",
		type: "selection-change",
		selectionIds,
	});
	return selectionIds;
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