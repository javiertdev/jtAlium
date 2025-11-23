document.addEventListener('DOMContentLoaded', function() {
    const themeSquares = document.querySelectorAll('.theme-square');

    // Apply colors to theme squares on load
    themeSquares.forEach(square => {
        const themeData = square.getAttribute('data-theme');
        if (themeData) {
            const theme = JSON.parse(themeData);
            square.style.backgroundColor = theme.bg;
            square.style.color = theme.text;
        }
    });

    themeSquares.forEach(square => {
        square.addEventListener('click', function() {
            const action = this.getAttribute('data-action');
            if (action === 'remove') {
                window.WebviewUtils.postMessageToExtension('removeTheme');
            } else {
                const themeData = this.getAttribute('data-theme');
                if (themeData) {
                    const theme = JSON.parse(themeData);
                    // Update custom color inputs with the selected theme colors
                    document.getElementById('bg-color').value = theme.bg;
                    document.getElementById('text-color').value = theme.text;
                    window.WebviewUtils.postMessageToExtension('applyTheme', {theme});
                }
            }
        });
    });

    // Handle custom theme button
    const applyCustomThemeButton = document.getElementById('apply-custom-theme');
    if (applyCustomThemeButton) {
        applyCustomThemeButton.addEventListener('click', function() {
            const bgColor = document.getElementById('bg-color').value;
            const textColor = document.getElementById('text-color').value;
            window.WebviewUtils.postMessageToExtension('applyCustomTheme', { bg: bgColor, text: textColor });
        });
    }
});