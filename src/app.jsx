import React from 'react';

///////////
///////////

function App() {
    return (
        <div>
            <h1>Select an object to begin...</h1>
            {/* <p>This is a simple React application.</p> */}

            <div>
                <button
                    onClick = {() => parent.postMessage("filter-to-interactions", "*")}
                >
                    Filter to interactions
                </button>
            </div>
            <div>
                <button
                    onClick = {() => parent.postMessage("filter-to-components", "*")}
                >
                    Filter to components
                </button>
            </div>
            <div>
                <button
                    onClick = {() => parent.postMessage("filter-to-non-components", "*")}
                >
                    Filter to non-components
                </button>
            </div>
            {/* <div>
                <button
                    onClick = {() => parent.postMessage("filter-to-missing-interactions", "*")}
                >
                    Filter to missing interactions
                </button>
            </div>
            <div>
                <button
                    onClick = {() => parent.postMessage("filter-to-added-interactions", "*")}
                >
                    Filter to added interactions
                </button>
            </div> */}
            ---
            <div>
                <button
                    onClick = {() => parent.postMessage("remove-interactions", "*")}
                >
                    Remove interactions
                </button>
            </div>
            <div>
                <button
                    onClick = {() => parent.postMessage("remove-click-interactions", "*")}
                >
                    Remove click interactions
                </button>
            </div>
            <div>
                <button
                    onClick = {() => parent.postMessage("remove-mouseenter-interactions", "*")}
                >
                    Remove mouse enter interactions
                </button>
            </div>
            <div>
                <button
                    onClick = {() => parent.postMessage("remove-mouseleave-interactions", "*")}
                >
                    Remove mouse leave interactions
                </button>
            </div>
            <div>
                <button
                    onClick = {() => parent.postMessage("remove-afterdelay-interactions", "*")}
                >
                    Remove after delay interactions
                </button>
            </div>

        </div>
    );
}



export default App;