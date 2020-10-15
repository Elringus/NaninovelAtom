**The Atom extension is deprecated as Atom itself is no longer actively developed/supported. Please use VS Code extension instead: https://naninovel.com/guide/ide-extension.html**

## Installation

1. Install [`language-naniscript`](https://atom.io/packages/language-naniscript) package
2. Install [`atom-ide-ui`](https://atom.io/packages/atom-ide-ui) package (required to show the effect of the language server responses)

## Usage

Open a folder with `.nani` files; the extension should automatically activate providing syntax highlighting, error checking, auto-completion and command docs. 

Opening a single file won't active the extension, as Atom is only able to start language server in "project mode".

In case first line in a script is not affected by syntax highlighting, make sure the script file is saved with `UTF-8` encoding **without [BOM](https://en.wikipedia.org/wiki/Byte_order_mark)**.

## Etc

Available scope names: https://github.com/psmitt/metalanguage/blob/master/examples/ScopeList.ScopeList
