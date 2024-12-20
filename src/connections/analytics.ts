import { DestinationTypes, ObjectTypes, TriggerTypes } from "../app";
import { verbose } from "../utils/log-to-console";

////////////////////////////////////////

const MIXPANEL_API = 'https://api-js.mixpanel.com/track/';

////////////////////////////////////////
////////////////////////////////////////

// The distinct id is a random number created each time the plugin is opened.
// It means I can know which other events were performed in the same session without know anything about you or your data.
let distinctId: string = crypto.randomUUID().split('-').pop() || '';

////////////////////////////////////////

// These events are tracked in the analytics tool MixPanel.
// Only the fact that the event has occured is tracked, no user or board data is sent.
// Some events record properties that are relevant to the event so that the devloper can learn which features are commonly used.
// This helps focus future development time on the features most valuable to users.

// This allows me to know how often people are using the plugin.
export function trackLaunchEvent () {
    trackEvent('Launch');
}

// This allows me what options in the plugin people tend to use.
export function trackRemoveInteractionsEvent (properties: { objectTypes: ObjectTypes, destinationTypes: DestinationTypes, triggerTypes: TriggerTypes }) {
    const formattedProperties = {
        'Object Types': properties.objectTypes,
        'Destination Types': properties.destinationTypes,
        'Trigger Types': properties.triggerTypes,
    }
    trackEvent('Remove Interactions', formattedProperties);
}

// This allows me to know if the options you chose in the plugin did what you expected or required you to undo them.
// This only gets called if you have the plugin panel still in focus, it doesn't track any undos you perform outside of that.
export function trackUndoEvent () {
    trackEvent('Undo');
}

// This allows me to know if you undid the change because you actually didn't like it or just because you wanted to check the difference.
// This only gets called if you have the plugin panel still in focus, it doesn't track any redos you perform outside of that.
export function trackRedoEvent () {
    trackEvent('Redo');
}

// This allows me to know how often people feel they need further instructions
export function helpClick () {
    trackEvent('Click to Website');
}

// These allow me to know if anyone has clicked the buttons to support the plugin.
export function donateClick () {
    trackEvent('Click to Donations');
}
export function socialsClick () {
    trackEvent('Click to Socials');
}

////////////////////////////////////////

async function trackEvent(name: string, properties: any = {}) {
    
    try {
        const data = {
            event: name,
            properties: {
                token: import.meta.env.VITE_MIXPANEL_TOKEN,
                distinct_id: distinctId,
                ...properties,
            }
        };

        const encodedData = base64Encode(JSON.stringify(data));
        const url = `${MIXPANEL_API}?data=${encodedData}&ip=1`;

        const response = await fetch(url, {
            method: 'GET', // Note: Using GET instead of POST
            credentials: 'omit',
            mode: 'no-cors' // This is important
        });

        // Note: With no-cors we can't check response.ok
        verbose(['Event tracked:', name, properties]);
    } catch (error) {
        verbose(['Error tracking event:', error]);
    }
}

function base64Encode(str: string): string {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
        function toSolidBytes(match, p1) {
            return String.fromCharCode(parseInt('0x' + p1));
        }));
}