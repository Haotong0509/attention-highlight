import * as vscode from 'vscode';

type StaticWeight = {
    id: number;
    start: number;
    end: number;
    content: string;
    weight: number;
  };

var background:string[]; 
//background = ["#000000","#000000","#1a0f00","#331e00","#4d2d00","#663d00","#804c00","#995b00","#b36a00","#cc7900","#e68900"]; //orange(995b00)
//background = ["#000000","#000000","#1a0019","#1a0019","#1a0019","#000033","#000066","#000080","#000099","#0000b3","#0000b3"]; //bule
//background = ["#201c1c","#201c1c","#201c1c","#201c1c","#3a221b","#532819","#6d2f18","#873517","#a03b15","#ba4114","#ba4114"]; //dark orange
background = ["#201c1c","#31211e","#31211e","#42261f","#532b21","#653023","#763424","#873926","#983e27","#a94329","#a94329"]; //dark orange2
//background = ["#201c1c","#201c1c","#201c1c","#201c1c","#3b2521","#2e283b","#362f4b","#3d355b","#443b6a","#4b417a","#a94329"]; //purple

export const highlightTarget = (obj: object) => {

    let highlightThreshold = 0.4;
    let staticWeight = obj as StaticWeight[];

    for(let i = 0; i < staticWeight.length; i++){
        if(staticWeight[i].weight >= highlightThreshold){
            highlightWord(staticWeight[i]);
        }
    }
};

export const highlightWord = (staticWeight: StaticWeight) => {
    let startIndex = staticWeight.start;
    let endIndex = staticWeight.end;
     // create decorator
     const decorator = vscode.window.createTextEditorDecorationType({
        overviewRulerLane: vscode.OverviewRulerLane.Center,
        //borderRadius: '1px',
        //color: '#001433',
        //fontWeight: 'bold',
        backgroundColor: background[Math.round(staticWeight.weight*10)], // set background color according to weight
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