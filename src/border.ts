import * as vscode from 'vscode';

type StaticWeight = {
    id: number;
    start: number;
    end: number;
    content: string;
    weight: number;
  };

var background:string[]; 

export const borderTarget = (obj: object) => {

    let highlightThreshold = 0.4;
    let staticWeight = obj as StaticWeight[];

    for(let i = 0; i < staticWeight.length; i++){
        if(staticWeight[i].weight >= highlightThreshold){
            borderWord(staticWeight[i]);
        }
    }
};

export const borderWord = (staticWeight: StaticWeight) => {
    let startIndex = staticWeight.start;
    let endIndex = staticWeight.end;
     // create decorator
     const decorator = vscode.window.createTextEditorDecorationType({
        overviewRulerLane: vscode.OverviewRulerLane.Center,
        //fontWeight: 'bold',
        border: '1px solid #80807b' //63635f
    });

    // get the active text editor
    let editor = vscode.window.activeTextEditor;
    if (!editor) {
        console.log("No open text editor");
 		return;
 	}
    let document = editor.document;
    // set the loction of target string
    const startPos = document.positionAt(startIndex);
    const endPos = document.positionAt(endIndex);
    const range = [new vscode.Range(startPos, endPos)];
    // set decoration on the target
    editor.setDecorations(decorator, range);
};