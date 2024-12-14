/// <reference types="node" />

import { Shape } from "@penpot/plugin-types";
import { filterToComponents } from "./logic/filter-to-components";
import { filterToNonComponents } from "./logic/filter-to-non-components";
import { filterToFlowShapes } from "./logic/filter-to-flow-shapes";
import { filterToNonFlowShapes } from "./logic/filter-to-non-flow-shapes";
import { DestinationType, ObjectType, TriggerTypes } from "./app";
import { filterToOnClicks } from "./logic/filter-to-on-clicks";
import { filterToOnMouseEnters } from "./logic/filter-to-on-mouse-enters";
import { filterToOnMouseLeaves } from "./logic/filter-to-on-mouse-leaves";
import { filterToAfterDelays } from "./logic/filter-after-delays";
import { filterToOverlays } from "./logic/filter-to-overlay-destinations";
import { filterToPreviousScreens } from "./logic/filter-to-previous-screens";
import { filterToUrls } from "./logic/filter-to-urls";
import { filterToAnyInteractions } from "./logic/filter-to-any-interactions";
import { filterToBoards } from "./logic/filter-to-boards";
import { removeInteractions } from "./logic/remove-interactions";

///////////////////////////////////////
///////////////////////////////////////

type Selection = Shape[];
let expectedSelectionIds: string[] = [];
let selectionFromUser: Selection = penpot.selection;

///////////
///////////

penpot.ui.open("Interaction Stripper", `?theme=${penpot.theme}`, {
	width: 525,
	height: 50,
});

setTimeout(() => {
	expectedSelectionIds = sendAppSelectionIds();
}, 500);

interface RemoveInteractionsProps {
	triggerTypes: TriggerTypes,
	objectType: ObjectType,
	destinationType: DestinationType
}
interface Message {
	action: string;
	data: RemoveInteractionsProps;
}
penpot.ui.onMessage<Message>((message) => {

	if (message.action === 'undo') {
		// When Penpot API supports calling an undo, I'll do that here.
		// This will enabling undo without having to click out of the plugin window.
	}

	if (message.action === 'remove-interactions') {
		const {
			triggerTypes,
			objectType,
			destinationType
		} = message.data;

		let filteredShapes = selectionFromUser.map(shape => shape);

		console.log('filteredShapes 1', filteredShapes.map(shape => shape.name));

		// Trigger filter messages
		if (triggerTypes === 'any interactions') {
			filteredShapes = filterToAnyInteractions(filteredShapes);

		} else if (triggerTypes === 'clicks') {
			filteredShapes = filterToOnClicks(filteredShapes);

		} else if (triggerTypes === 'mouse enters') {
			filteredShapes = filterToOnMouseEnters(filteredShapes);

		} else if (triggerTypes === 'mouse leaves') {
			filteredShapes = filterToOnMouseLeaves(filteredShapes);

		} else if (triggerTypes === 'after delays') {
			filteredShapes = filterToAfterDelays(filteredShapes);
		}

		console.log('filteredShapes 2', filteredShapes.map(shape => shape.name));

		// Destination filter messages
		if (destinationType === 'anywhere') {
			filteredShapes = filterToAnyInteractions(filteredShapes);

		} else if (destinationType === 'outside the selection') {
			filteredShapes = filterToNonFlowShapes({
				_shapesToFilter: filteredShapes,
				_originalUserSelection: selectionFromUser
			});

		} else if (destinationType === 'within the selection') {
			filteredShapes = filterToFlowShapes({
				_shapesToFilter: filteredShapes,
				_originalUserSelection: selectionFromUser
			});

		} else if (destinationType === 'overlays') {
			filteredShapes = filterToOverlays({
				_shapesToFilter: filteredShapes,
			});

		} else if (destinationType === 'to previous screens') {
			filteredShapes = filterToPreviousScreens({
				_shapesToFilter: filteredShapes,
			});

		} else if (destinationType === 'to urls') {
			filteredShapes = filterToUrls({
				_shapesToFilter: filteredShapes,
			});
		}

		console.log('filteredShapes 3', filteredShapes.map(shape => shape.name));

		// Object filter messages
		if (objectType === 'any objects') {
			filteredShapes = filterToAnyInteractions(filteredShapes);

		} else if (objectType === 'components') {
			filteredShapes = filterToComponents(filteredShapes);

		} else if (objectType === 'non-components') {
			filteredShapes = filterToNonComponents(filteredShapes);

		} else if (objectType === 'boards') {
			filteredShapes = filterToBoards(filteredShapes);
		}

		// Testing only
		// penpot.selection = filteredShapes;
		// ignoreRecentSelectionChange();

		console.log('filteredShapes 4', filteredShapes.map(shape => shape.name));
		const undoBlock = penpot.history.undoBlockBegin();
		removeInteractions({
			shapes: filteredShapes,
			triggerTypes
		});
		penpot.history.undoBlockFinish(undoBlock);
	}


});


let selectionDebounceTimer: NodeJS.Timeout | null = null;
//
penpot.on('selectionchange', (newSelectionIds: string[]) => {
	if (selectionDebounceTimer) clearTimeout(selectionDebounceTimer);
	selectionDebounceTimer = setTimeout(() => {
		selectionFromUser = penpot.selection;
		sendAppSelectionIds(newSelectionIds);
	}, 500);

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
