const bodyElement = document.querySelector('body');
const divElement = document.querySelector('.color-themes');
const darkModeButton = document.querySelector('.dark-mode-button');

let currentColor = 'blue';
let darkMode = false;
let showThemePicker = false;

function setColorTheme(color, dark) {
	bodyElement.className = ''; // Reset body class
	if (dark) {
		bodyElement.classList.add(`dark-${color}-theme`);
		darkModeButton.innerHTML = 'Light Mode';
	} else {
		bodyElement.classList.add(`${color}-theme`);
		darkModeButton.innerHTML = 'Dark Mode';
	}
	currentColor = color;
	darkMode = dark; // Update darkMode state
}

function displayThemePicker(show) {
	if (show) {
		divElement.innerHTML = `
			<button data-color-theme="hide">Hide</button>
			<span>|</span>
			<button data-color-theme="red">Red</button>
			<button data-color-theme="green">Green</button>
			<button data-color-theme="blue">Blue</button>
			<button data-color-theme="purple">Purple</button>
			<span>|</span>
			<button class="dark-mode-button" data-color-theme="dark">Dark Mode</button>
		`;
	} else {
		divElement.innerHTML = '<button data-color-theme="show">Customize</button>';
	}
}

// Initialize the theme
setColorTheme(currentColor, darkMode);
displayThemePicker(showThemePicker);

// Use event delegation to handle dynamically created buttons
divElement.addEventListener('click', (event) => {
	const button = event.target.closest('button');
	if (!button) return; // Ignore clicks that are not on buttons

	const newColor = button.dataset.colorTheme;
	if (newColor === 'dark') {
		setColorTheme(currentColor, !darkMode); // Toggle dark mode with current color
	} else if (newColor === 'hide' || newColor === 'show') {
		displayThemePicker(newColor === 'show');
	} else {
		setColorTheme(newColor, darkMode); // Change color, maintain dark mode state
	}
});
