// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import {exec} from 'child_process';
import * as fs from 'fs';

const outputChannel = vscode.window.createOutputChannel("Pepper");
	
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	
	//outputChannel.clear();
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('itp.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
			
		//runTaskAndDisplayOutput();
		let changeTimeout : NodeJS.Timeout | null = null;
		const editor = vscode.window.activeTextEditor;
		if (editor){
		const filePath = editor.document.uri.fsPath;
		runTaskAndDisplayOutput(filePath);
		vscode.window.showInformationMessage(filePath);
					fs.watch(filePath,(eventType,filename) =>{
						if (eventType === 'change'){
							if (changeTimeout){
								clearTimeout(changeTimeout);
							}
							changeTimeout = setTimeout( () => {
							outputChannel.clear();
							runTaskAndDisplayOutput(filePath);
						},500);
						}});
	
					}
		});

	context.subscriptions.push(disposable);
}
async function runTaskAndDisplayOutput(filePath : String) {
    // 创建或显示一个输出通道
	//outputChannel.clear();
    //const cleanExecute = "cd /home/user/project/Prover && cabal clean";
	console.log('Congratulations, your extension "itp" is now active!');
	

		
		// vscode.window.showInformationMessage(`当前工作目录: ${currentFolder}`);
	exec(`Pepper ${filePath}`,(error,stdout,stderr) => {
		if (error) {
			outputChannel.appendLine("error:");
			outputChannel.appendLine(error.message);
		}
		if (stderr){
			outputChannel.appendLine("stderr:");
			outputChannel.appendLine(stderr);
		}if (stdout) {
			outputChannel.appendLine(stdout);
		}
	});
	//outputChannel.show();
}

// This method is called when your extension is deactivated
export function deactivate() {

}
