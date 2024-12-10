import { SchematicsException, Tree } from '@angular-devkit/schematics';
import { join } from 'path';
import { virtualFs, workspaces } from '@angular-devkit/core';
import { Schema } from './schema';

function createHost(tree: Tree): workspaces.WorkspaceHost {
  return {
    async readFile(path: string): Promise<string> {
      const data = tree.read(path);
      if (!data) {
        throw new SchematicsException('File not found.');
      }
      return virtualFs.fileBufferToString(data);
    },
    async writeFile(path: string, data: string): Promise<void> {
      return tree.overwrite(path, data);
    },
    async isDirectory(path: string): Promise<boolean> {
      return !tree.exists(path) && tree.getDir(path).subfiles.length > 0;
    },
    async isFile(path: string): Promise<boolean> {
      return tree.exists(path);
    },
  };
}

// A function that will generate a Rule to copy the specified component folder
export function component(options: Schema) {
  return async (tree: Tree) => {
    const host = createHost(tree);
    const { workspace } = await workspaces.readWorkspace('/', host);

    const project =
      options.project != null ? workspace.projects.get(options.project) : null;
    if (!project) {
      throw new SchematicsException(`Invalid project name: ${options.project}`);
    }
    const projectType =
      project.extensions['projectType'] === 'application' ? 'app' : 'lib';

    const rootPath = `${project.sourceRoot}/${projectType}/${
      options.path ?? '/core/components'
    }`;

    const applicationPath = join(rootPath, options.name);

    const componentsPath = join(
      'node_modules',
      'ng-verse',
      'src',
      'lib',
      options.name
    );

    // Copy component files from the library to the application
    tree.getDir(componentsPath).visit((filePath) => {
      const content = tree.read(filePath);
      if (content) {
        const targetPath = filePath.replace(componentsPath, applicationPath);
        tree.create(targetPath, content);
      }
    });

    return tree;
  };
}
