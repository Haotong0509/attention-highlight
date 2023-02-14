import * as vscode from 'vscode';

type StaticWeight = {
    id: number;
    start: number;
    end: number;
    content: string;
    weight: number;
  };

var background:string[]; 
background = ["#965454","#FFFFe5","#FFFFcc","#FFFF00","#3072f6","#3072f6","#FFFFe5","#FFFFcc","#FFFFcc","#FFFF00","#FFFF00"];

export const highlightTarget = (obj: object) => {

    let highlightThreshold = 0.6;
    let staticWeight = obj as StaticWeight[];

    for(let i = 0; i < staticWeight.length; i++){
        if(staticWeight[i].weight > highlightThreshold){
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
        borderRadius: '0.5px',
        color: '#000000',
        //color: '#fff',
        // set background color according to weight
        backgroundColor: background[staticWeight.weight*10],
    });

    // 获取可见编辑器实例
    const visibleTextEditors = vscode.window.visibleTextEditors;
    visibleTextEditors.forEach((editor) => {

        // 获取文档实例
        const { document } = editor;

        // 通过文档实例获取目标字符串位置
        //const startIndex = document.getText().indexOf(str);
        const startPos = document.positionAt(startIndex);
        const endPos = document.positionAt(endIndex+1);
        const range = [new vscode.Range(startPos, endPos)];

        // 在目标位置设置装饰器
        editor.setDecorations(decorator, range);
    });
};