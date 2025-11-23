# jtAlium

![jtAlium](https://s6.imgcdn.dev/YKt5ke.png)

An extension that will light the way for your developments!

Read this in [Spanish](https://github.com/javiertdev/jtAlium/blob/main/README.es.md)

## Features

### Workspace Color

![jtAlium - Workspace Color](https://s6.imgcdn.dev/YKt1jV.png)

Customize the color of your workspace's top bar. Very useful when you have different projects in multiple windows.
All this without changing the theme you like, just adjust what's necessary in the right place.

![Workspace Color](https://s6.imgcdn.dev/YKWp5a.png)

#### Main utilities:
- **Select predefined themes**: Click on the color squares to apply ready-made themes.
- **Apply custom colors**: Use the color pickers for background and text, then press "Apply custom colors".
- **Remove customization**: Click on the "×" button to remove any applied customization.

#### How to use:
1. Open the "Workspace Color" view from the jtAlium side panel
2. Select a predefined theme by clicking on one of the color squares
3. Or adjust custom colors using the color inputs for the background, the text and then press "Apply custom colors"
4. To remove the customization, click on the "×" button

![Workspace Color](https://s6.imgcdn.dev/YKWoDL.png)

### Hide Resources

![jtAlium](https://s6.imgcdn.dev/YKtPFM.png)

Easily manage which files and folders you want to hide from the VSCode explorer. Perfect for keeping your workspace clean by hiding unnecessary files like `node_modules`, temporary files, or any element you don't want to see.

> **Important note**: This functionality only hides the files from the VSCode explorer. The *"physical"* files **are not deleted** or modified in any way, they are only hidden visually to maintain a cleaner view of the project.

#### Main utilities:
- **Add files/folders**: Type the path in the input and press "Add" or Enter.
- **List of hidden files**: See all the files/folders you have hidden.
- **Unhide individually**: Click on the "×" next to each element to unhide it.
- **Unhide all**: "Unhide All" button to unhide all elements at once.
- **Open files**: Click on the name of a file to open it directly.
- **Context menu**: Right-click on any file/folder in the explorer to hide it quickly.

#### How to use:
1. Open the "Hide resources" view from the jtAlium side panel
2. Type the path of the file/folder you want to hide (e.g.: `node_modules`, `dist`, `*.keys`)
3. Press the "Add" button or the Enter key
4. The element will disappear from the explorer
5. To unhide, use the individual "×" or "Unhide All"

![Hide Resources](https://s6.imgcdn.dev/YKWHeN.png)

#### Context menu:
You can also hide files directly from the explorer:
- Right-click on any file or folder
- Select "Hide this file/folder"

![Context Menu](https://s6.imgcdn.dev/YKWgMq.png)

### Package Version Updater

![jtAlium](https://s6.imgcdn.dev/YKtz3h.png)

Easily manage the versions of all `package.json` files in your workspace. Perfect for projects with multiple packages (like Angular libraries) where you need to keep semantic versioning versions synchronized.

#### Main utilities:
- **Automatic scanning**: Finds all `package.json` in your workspace, excluding folders like `node_modules`, `vendor`, `dist`, etc.
- **Smart ordering**: The root `package.json` appears first, followed by the others sorted alphabetically.
- **Independent controls**: Each package has separate controls for Major, Minor and Patch.
- **Real-time updating**: Changes are saved immediately to the `package.json` files.
- **Quick navigation**: Click on the file path to open it directly in the editor.

#### How to use:
1. Open the "Package Version Updater" view from the jtAlium side panel
2. You will see all the `package.json` found in your workspace
3. For each package, use the "+" and "-" buttons to increment/decrement Major, Minor or Patch
4. Changes are saved automatically to the corresponding file
5. Click on the file path (e.g.: `package.json` or `projects/utils/package.json`) to open it in the editor

![Package Version Updater](https://s6.imgcdn.dev/YKW8tu.png)

### Package Scripts Manager

![jtAlium](https://s6.imgcdn.dev/YKtl0l.png)

Manage all scripts from your `package.json` files with ease. Perfect for projects with multiple packages where you need to create, edit, run and delete npm scripts efficiently.

#### Main utilities:
- **Automatic scanning**: Finds all `package.json` in your workspace, excluding folders like `node_modules`, `vendor`, `dist`, etc.
- **Smart ordering**: The root `package.json` appears first, followed by the others sorted alphabetically.
- **Script management**: Create, edit, run and delete scripts for each package.
- **Run scripts**: Execute npm scripts directly from the interface, opening in new terminals.
- **Inline editing**: Edit script commands directly in the interface.
- **Add scripts**: Create new scripts with custom names and commands.
- **Delete scripts**: Remove scripts with confirmation dialog.
- **Clean package.json**: Automatically removes empty `scripts` objects when the last script is deleted.
- **Quick navigation**: Click on the file path to open it directly in the editor.

#### How to use:
1. Open the "Package Scripts Manager" view from the jtAlium side panel
2. You will see all the `package.json` found in your workspace with their scripts
3. For each script, use the ▶ button to run it, ✎ to edit it, or × to delete it
4. Use the "+ Add Script" button to create new scripts
5. Click on the file path (e.g.: `package.json` or `projects/utils/package.json`) to open it in the editor

![Package Scripts Manager](https://s6.imgcdn.dev/YKWEzB.png)