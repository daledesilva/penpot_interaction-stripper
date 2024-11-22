import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app.jsx';
import "./style.css";

//////////
//////////

// get the current theme from the URL
const searchParams = new URLSearchParams(window.location.search);
document.body.dataset.theme = searchParams.get("theme") ?? "light";

// Listen plugin.ts messages
window.addEventListener("message", (event) => {
    if (event.data.source === "penpot") {
        document.body.dataset.theme = event.data.theme;
    }
});


////////
////////

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);