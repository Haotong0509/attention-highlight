// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { highlightTarget } from './highlight';
import { boldTarget } from './bold';
import { parseWeight } from './parse_weight';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "attention-highlight" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let highlight = vscode.commands.registerCommand('attention-highlight.staticHighlight', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		//vscode.window.showInformationMessage('Hello World!');
		openFile('/Users/haotong/attention-highlight/sample.py');
		let weightData = parseWeight('/Users/haotong/attention-highlight/attention_weight.json');
		//console.log(weightData);
		highlightTarget(weightData);
	});
	let bold = vscode.commands.registerCommand('attention-highlight.staticBold', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		//vscode.window.showInformationMessage('Hello World!');
		openFile('/Users/haotong/attention-highlight/sample.py');
		let weightData = parseWeight('/Users/haotong/attention-highlight/attention_weight.json');
		//console.log(weightData);
		boldTarget(weightData);
	});

	context.subscriptions.push(highlight, bold);
}

// export async function openFile(path: string) {
// 	let fullPath = vscode.Uri.parse(path);
// 	await vscode.workspace.openTextDocument(fullPath)
// 	.then(async doc => {
// 		vscode.window.showTextDocument(doc, undefined, false);
// 	});
// }

export function openFile(path: string) {
	let fullPath = vscode.Uri.parse(path);
	vscode.workspace.openTextDocument(fullPath).then(doc => vscode.window.showTextDocument(doc));
}

// export async function highlightTest() {
// 	// ????????????
// 	let fullPath = vscode.Uri.parse('/Users/haotong/attention-highlight/sample.py');
// 	let lineNumber = 2;
// 	// ????????????
// 	await vscode.workspace.openTextDocument(fullPath)
// 	.then(async doc => {
// 	  // ??????????????????????????????editor 
// 	  //vscode.window.showTextDocument(doc);
// 	  let editor = vscode.window.activeTextEditor;
// 	  if (!editor) {
// 		return;
// 	  }
// 	  //???editor ??????document???
// 	  let document = editor.document;
// 	  // ??????document???lineAt?????????????????????range???
// 	  let start = document.lineAt(lineNumber).range.start.character;
// 	  let end = document.lineAt(lineNumber).range.end.character;
// 	  // ??????range???
// 	  let range: vscode.Range = new vscode.Range(lineNumber, start, lineNumber, end);
// 	  //???????????????
// 	  await vscode.window.showTextDocument(doc , {preserveFocus: false, selection: range, viewColumn: vscode.ViewColumn.One});
// 	});
// }

// This method is called when your extension is deactivated
export function deactivate() {}
