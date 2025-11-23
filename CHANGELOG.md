# Changelog

## v1.0.0

- Extension launch.
- Added the **Workspace Color** tool.
    - There are 15 predefined colors (you can customize them after selecting them).
    - You can apply custom colors.
- Added the **Hide Resources** tool.
    - Implemented the option to add paths manually.
    - Implemented the option to hide files/folders in the context menu.
    - Optimized to open hidden files from the tool.
    - Added buttons to unhide per item or all at once.
- Added the **Package Version Updater** tool.
    - Automatic scanning of all `package.json` files in the workspace.
    - Independent controls for Major, Minor and Patch of each package.
    - Real-time updating of `package.json` files.
    - Smart ordering: root package.json first, then alphabetical.
    - Click on the path to open the file directly in the editor.
    - Support for projects with multiple packages (Angular libraries, monorepos, etc.).
- Added the **Package Scripts Manager** tool.
    - Automatic scanning of all `package.json` files in the workspace.
    - Create, edit, run and delete scripts for each package.
    - Execute npm scripts directly from the interface in new terminals.
    - Inline editing of script commands.
    - Add new scripts with custom names and commands.
    - Delete scripts with confirmation dialog.
    - Automatically clean empty `scripts` objects from package.json.
    - Smart ordering: root package.json first, then alphabetical.
    - Click on the path to open the file directly in the editor.
    - Support for projects with multiple packages (Angular libraries, monorepos, etc.).
- Translated the README to [English](https://github.com/javiertdev/jtAlium/blob/main/README.md) and [Spanish](https://github.com/javiertdev/jtAlium/blob/main/README.es.md).

## Roadmap

- [x] Workspace Color: With predefined colors
- [x] Workspace Color: With custom colors
- [x] Hide resources: Hide folders or files you don't need to see
- [x] Package Version Updater: Major, Minor and patch
- [x] Package Scripts Manager: Create, edit, run and delete
- [ ] Hides sensitive data: For iPROPERTIES type
- [ ] Hides sensitive data: For .env
- [ ] GIT Commit Generator
- [ ] Autoclose unused old tabs