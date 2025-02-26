import React from "react";
import { createRoot } from 'react-dom/client';
import BrightnessPanel from "./components/BrightnessPanel";

if (window.settings == undefined) window.settings = {}

createRoot(document.getElementById("root")).render(<BrightnessPanel monitors={window.allMonitors} lastUpdate={window.lastUpdate} />)

window.updateMica = () => {
    const pos = [window.winPosition[0], window.winPosition[1]]
    if(window.settings.isWin11) {
        pos[0] += 12
        pos[1] += 12
    }
    const micaDisplays = document.querySelector("#mica .displays")
    if(micaDisplays) micaDisplays.style.transform = `translate(${pos[0] * -1}px, ${pos[1] * -1}px)`;

}

// Demo mode
window.addEventListener("enableDemoMode", () => {
    window.allMonitors = [{
        "brightness": 63,
        "device": "\\\\?\\DISPLAY#ACR0408#5&2e7612e0&0&UID4357#{e6f07b5f-ee97-4a90-b076-33f57bf4eaa7}",
        "id": "\\\\.\\DISPLAY1",
        "localID": 0,
        "max": 100,
        "min": 0,
        "name": "XB270HU",
        "num": 0,
        "type": "ddcci"
    }, {
        "brightness": 46,
        "device": "\\\\?\\DISPLAY#DELA0BC#5&2e7612e0&0&UID4356#{e6f07b5f-ee97-4a90-b076-33f57bf4eaa7}",
        "id": "\\\\.\\DISPLAY2",
        "localID": 1,
        "max": 100,
        "min": 0,
        "name": "DELL U2415",
        "num": 1,
        "type": "ddcci"
    }]
    window.dispatchEvent(new Event("monitorsUpdated"))
    window.document.getElementById("root").dataset["visible"] = true
    window.document.body.style.setProperty("--system-accent-color", window.accent || "#744DA9")
})

window.document.getElementById("root").addEventListener('transitionend', function () {
    window.panelAnimationDone()
});

window.document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") {
        window.ipc.send('blur-panel')
    }
})

allMonitors = {}
window.ipc.send('get-mica-wallpaper')
window.ipc.send('get-refreshing')
window.ipc.send('request-localization')
setTimeout(() => {
    window.ipc.send('request-localization')
}, 200)