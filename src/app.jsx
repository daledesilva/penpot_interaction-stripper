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

        </div>
    );
}



export default App;