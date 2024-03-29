// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { dynamicHighlightTarget, highlightTarget } from './highlight';
import { boldTarget } from './bold';
import { highlightBoldTarget } from './highlight_bold';
import { borderTarget } from './border';
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
	// Static Highlight
	let staticHighlight = vscode.commands.registerCommand('attention-highlight.staticHighlight', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		//vscode.window.showInformationMessage('Hello World!');
		openFile('/Users/haotong/attention-highlight/sample.py');
		let weightData = parseWeight('/Users/haotong/attention-highlight/attention_weight.json');
		//console.log(weightData);
		highlightTarget(weightData);
	});
	// Dynamic Highlight
	let dynamicHighlight = vscode.commands.registerCommand('attention-highlight.dynamicHighlight', () => {
		openFile('/Users/haotong/attention-highlight/sample.py');
		let weightData = parseWeight('/Users/haotong/attention-highlight/dynamic_attention_weight.json');
		// get editor
		let editor = vscode.window.activeTextEditor;
		if (editor) {
			dynamicHighlightTarget(weightData, editor);
		}
		// set cursor monitor
		vscode.window.onDidChangeTextEditorSelection(
			(event) => {
			  const editor = event.textEditor;
			  if (editor && editor === vscode.window.activeTextEditor) {
				dynamicHighlightTarget(weightData, editor);
			  }
			},
			null,
			context.subscriptions
		  );
	});
	// Bold
	let bold = vscode.commands.registerCommand('attention-highlight.staticBold', () => {
		openFile('/Users/haotong/attention-highlight/sample.py');
		let weightData = parseWeight('/Users/haotong/attention-highlight/attention_weight.json');
		boldTarget(weightData);
	});
	// Highlight Bold
	let highlightbold = vscode.commands.registerCommand('attention-highlight.staticHighlightBold', () => {
		openFile('/Users/haotong/attention-highlight/sample.py');
		let weightData = parseWeight('/Users/haotong/attention-highlight/attention_weight.json');
		highlightBoldTarget(weightData);
	});
	// Bolder
	let border = vscode.commands.registerCommand('attention-highlight.staticBorder', () => {
		openFile('/Users/haotong/attention-highlight/sample.py');
		let weightData = parseWeight('/Users/haotong/attention-highlight/attention_weight.json');
		borderTarget(weightData);
	});

	context.subscriptions.push(staticHighlight, bold, highlightbold, border, dynamicHighlight);
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
// 	// 转换路径
// 	let fullPath = vscode.Uri.parse('/Users/haotong/attention-highlight/sample.py');
// 	let lineNumber = 2;
// 	// 打开文件
// 	await vscode.workspace.openTextDocument(fullPath)
// 	.then(async doc => {
// 	  // 获取当前打开的文件的editor 
// 	  //vscode.window.showTextDocument(doc);
// 	  let editor = vscode.window.activeTextEditor;
// 	  if (!editor) {
// 		return;
// 	  }
// 	  //从editor 中拿document。
// 	  let document = editor.document;
// 	  // 调用document的lineAt获取某行代码的range。
// 	  let start = document.lineAt(lineNumber).range.start.character;
// 	  let end = document.lineAt(lineNumber).range.end.character;
// 	  // 组装range。
// 	  let range: vscode.Range = new vscode.Range(lineNumber, start, lineNumber, end);
// 	  //高亮！！！
// 	  await vscode.window.showTextDocument(doc , {preserveFocus: false, selection: range, viewColumn: vscode.ViewColumn.One});
// 	});
// }

// This method is called when your extension is deactivated
export function deactivate() {}
