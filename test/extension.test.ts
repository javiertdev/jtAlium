import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import { CommandService } from '../src/core/services/commandService';
import { themes, Theme } from '../src/core/themes';
// import * as myExtension from '../src/extension';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');


	test('CommandService registerOpenWorkspaceColorCommand returns a disposable', () => {
		// Note: This test may fail if the command is already registered by the extension activation
		// In a real test environment, we might need to mock or isolate the command registration
		try {
			const disposable = CommandService.registerOpenWorkspaceColorCommand();
			assert.ok(disposable);
			assert.strictEqual(typeof disposable.dispose, 'function');
		} catch (error) {
			// If command already exists, that's expected in some test scenarios
			assert.ok((error as Error).message.includes('already exists'));
		}
	});

	test('Themes array has expected structure', () => {
		assert.ok(Array.isArray(themes));
		assert.ok(themes.length > 0);
		themes.forEach((theme: Theme) => {
			assert.ok(theme.bg);
			assert.ok(theme.text);
			assert.ok(theme.label);
		});
	});

	test('Themes include specific colors', () => {
		const redTheme = themes.find(t => t.label === 'Red');
		assert.ok(redTheme);
		assert.strictEqual(redTheme!.bg, '#f44336');
		assert.strictEqual(redTheme!.text, '#ffffff');

		const blackTheme = themes.find(t => t.label === 'Black');
		assert.ok(blackTheme);
		assert.strictEqual(blackTheme!.bg, '#000000');
		assert.strictEqual(blackTheme!.text, '#ffffff');
	});
});
