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
//background = ["#000000","#000000","#1a0019","#1a0019","#1a0019","#330033","#4d004c","#660065","#80007f","#990098","#e68900"]; //purple(80007f)
//background = ["#000000","#000000","#1a0019","#1a0019","#1a0019","#000033","#000066","#000080","#000099","#0000b3","#0000b3"]; //bule
//background = ["#201c1c","#201c1c","#201c1c","#201c1c","#3a221b","#532819","#6d2f18","#873517","#a03b15","#ba4114","#ba4114"]; //dark orange
background = ["#201c1c","#201c1c","#201c1c","#201c1c","#3b2521","#552f25","#70382a","#8b412f","#a54b33","#c05438","#a94329"]; //dark orange2
export const highlightTarget = (obj: object) => {

    let highlightThreshold = 0.5;
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
     // 创建装饰器
     const decorator = vscode.window.createTextEditorDecorationType({
        overviewRulerLane: vscode.OverviewRulerLane.Center,
        borderRadius: '1px',
        //color: '#001433',
        //color: new vscode.ThemeColor('workbench.preferredDarkColorTheme') ,
        //fontWeight: 'bold',
        backgroundColor: background[staticWeight.weight*10], // set background color according to weight
    });

    // 获取可见编辑器实例
    let editor = vscode.window.activeTextEditor;
    //console.log(editor);
    if (!editor) {
        console.log("No open text editor");
 		return;
 	}
    let document = editor.document;
    // 通过文档实例获取目标字符串位置
    const startPos = document.positionAt(startIndex);
    const endPos = document.positionAt(endIndex+1);
    const range = [new vscode.Range(startPos, endPos)];
    // 在目标位置设置装饰器
    editor.setDecorations(decorator, range);

    // const visibleTextEditors = vscode.window.visibleTextEditors;
    // visibleTextEditors.forEach((editor) => {

    //     // 获取文档实例
    //     const { document } = editor;

    //     // 通过文档实例获取目标字符串位置
    //     //const startIndex = document.getText().indexOf(str);
    //     const startPos = document.positionAt(startIndex);
    //     const endPos = document.positionAt(endIndex+1);
    //     const range = [new vscode.Range(startPos, endPos)];

    //     // 在目标位置设置装饰器
    //     editor.setDecorations(decorator, range);
    // });
};