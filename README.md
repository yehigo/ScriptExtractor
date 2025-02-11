# ScriptExtractor README

|   |  |
| ------------- | ------------- |
|  [![Visual Studio Marketplace Downloads](https://img.shields.io/visual-studio-marketplace/d/MeenaPintu.scriptextractor?style=for-the-badge)](https://marketplace.visualstudio.com/items?itemName=MeenaPintu.scriptextractor) | ![Visual Studio Marketplace Rating](https://img.shields.io/visual-studio-marketplace/stars/MeenaPintu.scriptextractor?link=https%3A%2F%2Fmarketplace.visualstudio.com%2Fitems%3FitemName%3DMeenaPintu.scriptextractor) |


Description: ScriptExtractor is a powerful Visual Studio Code extension designed to help developers extract JavaScript code from HTML files with ease. Whether you're working on a large project or a single file, ScriptExtractor simplifies the process by identifying and extracting all JavaScript within <script> tags and saving it to a separate .js file and html in a different file. 

## Features

**Effortless Extraction:** Automatically scans your HTML files and extracts all JavaScript code.

**Seamless Integration:** Works directly within Visual Studio Code, providing a smooth and integrated workflow.

**Batch Processing:** Capable of processing entire folders, extracting JavaScript from multiple HTML files at once.

**Intuitive Commands:** Simple commands to initiate extraction, making it accessible for developers of all levels.

**Customizable Output:** Save extracted JavaScript to specified locations with ease.


## How to Use:
Just install it and it will automaticlly run once you edit any html file.

## Manually
Open an HTML file or a folder containing HTML files in Visual Studio Code.

Open the Command Palette (Ctrl+Shift+P or Cmd+Shift+P).

Run the command Extract JavaScript from HTML.

The extracted JavaScript will be saved to a new .js file in the same directory as the HTML file.

## Benefits:

Save time and reduce manual effort.

Keep your projects organized by separating JavaScript from HTML.

Improve code readability and maintainability.

Get ScriptExtractor today and streamline your web development workflow

## Requirements
VS code

--
## Extension Settings

```json
{
    "scriptextractor.excludePaths": ["folders path to exclude"],
    "scriptextractor.outJsPath": "folder where to write js files",
    "scriptextractor.outHtmlPath": "folder where to write html files"
}
```
## Known Issues

None

## Release Notes

None

### 0.0.1

Initial release

### 0.0.3
Added auto activation on html file.

---
