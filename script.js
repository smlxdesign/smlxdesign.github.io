const bodyElement = document.querySelector('body');
const divElement = document.querySelector('.color-themes');
const darkModeButton = document.querySelector('.dark-mode-button');

let currentTheme = JSON.parse(localStorage.getItem('theme'));

if (!currentTheme) {
	currentTheme = {
		color: 'blue',
		darkMode: false,
	};
}
let showThemePicker = false;

function setColorTheme(color, darkMode) {
	bodyElement.className = ''; // Reset body class
	if (darkMode) {
		bodyElement.classList.add(`dark-${color}-theme`);
		darkModeButton.innerHTML = 'Light Mode';
	} else {
		bodyElement.classList.add(`${color}-theme`);
		darkModeButton.innerHTML = 'Dark Mode';
	}

	currentTheme = { color, darkMode };
	localStorage.setItem('theme', JSON.stringify(currentTheme));
}

function displayThemePicker(show) {
	if (show) {
		divElement.innerHTML = `
			<button data-color-theme="hide">Hide</button>
			<span>·</span>
			<button data-color-theme="red">Red</button>
			<button data-color-theme="green">Green</button>
			<button data-color-theme="blue">Blue</button>
			<button data-color-theme="purple">Purple</button>
			<span>·</span>
			<button class="dark-mode-button" data-color-theme="dark">Dark Mode</button>
		`;
	} else {
		divElement.innerHTML = '<button data-color-theme="show">Customize</button>';
	}
}

// Initialize the theme
setColorTheme(currentTheme.color, currentTheme.darkMode);
displayThemePicker(showThemePicker);

document.addEventListener('DOMContentLoaded', () => {
	setColorTheme(currentTheme.color, currentTheme.darkMode);
	displayThemePicker(showThemePicker);
});

// Use event delegation to handle dynamically created buttons
divElement.addEventListener('click', (event) => {
	const button = event.target.closest('button');
	if (!button) return; // Ignore clicks that are not on buttons

	const newColor = button.dataset.colorTheme;
	if (newColor === 'dark') {
		setColorTheme(currentTheme.color, !currentTheme.darkMode); // Toggle dark mode with current color
	} else if (newColor === 'hide' || newColor === 'show') {
		displayThemePicker(newColor === 'show');
	} else {
		setColorTheme(newColor, currentTheme.darkMode); // Change color, maintain dark mode state
	}
});
