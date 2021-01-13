"use strict";

(() => {
    //set style
    const style = document.querySelector('#style');
    const toggle = document.querySelector('#daynight');
    toggle.checked = localStorage.getItem('toggleState') === 'true';

    const updateStyle = () => {
        if (toggle.checked) {
            //load both styles at page load
            style.setAttribute('href', 'day.css');
            style.setAttribute('href', 'night.css');
        }
        else {
            style.setAttribute('href', 'night.css');
            style.setAttribute('href', 'day.css');
        }
        localStorage.setItem('toggleState', toggle.checked);
    }
    updateStyle();
    toggle.addEventListener('change', updateStyle);

    //vehicle dropdown list component
    const makeVehicle = (vehicle) => {
        const newEl = document.createElement('option');
        const newText = document.createTextNode(vehicle);
        newEl.setAttribute('value', vehicle);
        newEl.appendChild(newText);
        document.getElementById('vehicle').appendChild(newEl);
    }

    //load vehicle dropdown list
    const loadVehicles = (cb) => {
        const xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log("loaded: ", this.status, this.readyState);
                cb(xmlhttp);
                document.getElementById('vehicle').addEventListener('change', tasks.bind(xmlhttp));
            }
            else {
                console.log("loading: ", this.status, this.readyState);
            }
        };
        xmlhttp.open("GET", "vehicles.xml", true);
        xmlhttp.send();
    }

    const dropDownList = (xml) => {
        const names = xml.responseXML.getElementsByTagName("name");
        for (let i = 0; i < names.length; i++) {
            makeVehicle(names[i].childNodes[0].nodeValue);
        }
    }

    loadVehicles(dropDownList);

    //reset button
    document.getElementById('reset').addEventListener('click', () => {
        while (document.getElementsByClassName('taskDone')[0]) {
            document.getElementsByClassName('taskDone')[0].setAttribute('class', 'task');
        }
    });

    function tasks() {
        clearTasks();
        const pic = document.getElementById('vehicle').selectedIndex -1;
        const names = this.responseXML.getElementsByTagName("vehicle");
        const tasks = names[pic].getElementsByTagName("task");
        for (let i = 0; i < tasks.length; i++) {
            taskButton(tasks[i].childNodes[0].nodeValue);
        }
    }

    //from selection make table of animated buttons
    const taskButton = (task) => {
        const newText = document.createTextNode(task);
        const newEl = document.createElement('button');
        newEl.setAttribute('class', 'task');
        newEl.appendChild(newText);
        newEl.addEventListener('click', () => taskDone(newEl));
        document.getElementsByClassName('tasks')[0].appendChild(newEl);
    }

    const taskDone = (task) => {
        if (task.getAttribute('class') === 'task') {
            task.setAttribute('class', 'taskDone');
        }
        else {
            task.setAttribute('class', 'task');
        }
    }

    const clearTasks = () => {
        while (document.getElementsByClassName('task')[0]) {
            document.getElementsByClassName('task')[0].remove();
        }
        while (document.getElementsByClassName('taskDone')[0]) {
            document.getElementsByClassName('taskDone')[0].remove();
        }
    }
})();