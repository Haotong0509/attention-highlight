import * as vscode from 'vscode';
import * as fs from 'fs';

export const parseWeight = (str = '') => {

    if (fs.existsSync(str)){
        let weightData = JSON.parse(fs.readFileSync(str, "utf8"));
     return weightData;
    }

};