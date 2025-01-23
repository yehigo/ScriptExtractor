import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
    // Configuration settings
    const config = vscode.workspace.getConfiguration('scriptextractor');
    const excludePaths = config.get<string[]>('excludePaths') || [];
    const outJsPath = config.get<string>('outJsPath') || '';
    const outHtmlPath = config.get<string>('outHtmlPath') || '';

    let disposable = vscode.commands.registerCommand('extension.extractJS', (uri: vscode.Uri) => {
        const filePath = uri.fsPath;

        // Check if the file is in the exclude paths
        if (isExcluded(filePath, excludePaths)) {
            vscode.window.showInformationMessage(`Skipping extraction for excluded file: ${filePath}`);
            return;
        }

        if (filePath.endsWith('.html')) {
            const text = fs.readFileSync(filePath, 'utf8');
            const { jsCode, cleanHtml } = extractJavaScriptAndCleanHtml(text);

            const jsFileName = path.basename(filePath, '.html') + '.js';
            const jsFilePath = outJsPath ? path.join(outJsPath, jsFileName) : path.join(path.dirname(filePath), jsFileName);

            fs.writeFile(jsFilePath, jsCode, (err) => {
                if (err) {
                    vscode.window.showErrorMessage('Failed to write JavaScript file: ' + err.message);
                } else {
                    vscode.window.showInformationMessage('JavaScript extracted and written to ' + jsFilePath);
                }
            });

            // Determine the HTML output path
            let htmlOutFolder;
            if (outHtmlPath) {
                htmlOutFolder = outHtmlPath;
            } else {
                const pureHtmlDir = path.join(path.dirname(filePath), 'purehtml');
                if (!fs.existsSync(pureHtmlDir)) {
                    fs.mkdirSync(pureHtmlDir);
                }
                htmlOutFolder = pureHtmlDir;
            }
            // Exclude the newly written HTML folder
            if (!excludePaths.includes(htmlOutFolder)) {
                excludePaths.push(htmlOutFolder);
            }

            let htmlFilePath = path.join(htmlOutFolder, path.basename(filePath));

            fs.writeFile(htmlFilePath, cleanHtml, (err) => {
                if (err) {
                    vscode.window.showErrorMessage('Failed to write HTML file: ' + err.message);
                } else {
                    vscode.window.showInformationMessage('HTML written to ' + htmlFilePath);
                }
            });
        }
    });

    // Create a file system watcher for .html files
    const watcher = vscode.workspace.createFileSystemWatcher('**/*.html');

    // Trigger extraction on file change
    watcher.onDidChange((uri) => {
        console.log(`File changed: ${uri.fsPath}`);
        if (!isExcluded(uri.fsPath, excludePaths)) {
            vscode.commands.executeCommand('extension.extractJS', uri);
        }
    });

    // Trigger extraction on file creation
    watcher.onDidCreate((uri) => {
        console.log(`File created: ${uri.fsPath}`);
        if (!isExcluded(uri.fsPath, excludePaths)) {
            vscode.commands.executeCommand('extension.extractJS', uri);
        }
    });

    context.subscriptions.push(disposable, watcher);
}

function extractJavaScriptAndCleanHtml(html: string): { jsCode: string, cleanHtml: string } {
    const jsPattern = /<script[^>]*>([\s\S]*?)<\/script>/gi;
    let match;
    let jsCode = '';
    let cleanHtml = html;

    while ((match = jsPattern.exec(html)) !== null) {
        jsCode += match[1].trim() + '\n\n';
        cleanHtml = cleanHtml.replace(match[0], ''); // Remove the <script> tag and its content
    }

    return { jsCode, cleanHtml };
}

// file based exclude
//function isExcluded(filePath: string, excludePaths: string[]): boolean {
//    return excludePaths.some(excludePath => filePath.includes(excludePath));
//}

// Folder based exclude, efficient 
function isExcluded(filePath: string, excludePaths: string[]): boolean {
    return excludePaths.some(excludePath => filePath.startsWith(excludePath));
}


export function deactivate() { }
