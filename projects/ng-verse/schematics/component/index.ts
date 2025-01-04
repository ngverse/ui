import { basename, normalize } from '@angular-devkit/core';
import { SchematicsException, Tree } from '@angular-devkit/schematics';
import { getProjectFromWorkspace } from '@angular/cdk/schematics';
import { getWorkspace } from '@schematics/angular/utility/workspace';
import { join } from 'path';
import { Schema } from './schema';

function getComponentName(inputPath: string): string {
  // Normalize the input path to handle different OS separators
  const normalizedPath = normalize(inputPath);

  // Get the last part of the path
  return basename(normalizedPath);
}

export function component(options: Schema) {
  return async (host: Tree) => {
    const workspace = await getWorkspace(host);
    const project = getProjectFromWorkspace(workspace, options.project);

    if (!project) {
      throw new SchematicsException(`Invalid project name: ${options.project}`);
    }
    const projectType =
      project.extensions['projectType'] === 'application' ? 'app' : 'lib';

    const rootPath = normalize(`${project.sourceRoot}/${projectType}`);

    const applicationPath = normalize(join(rootPath, options.name));
    const componentName = getComponentName(options.name);
    const componentsPath = normalize(
      join('node_modules', 'ng-verse', 'src', 'lib', componentName)
    );

    // Copy component files from the library to the application
    host.getDir(componentsPath).visit((filePath) => {
      const content = host.read(filePath);
      if (content) {
        const targetPath = filePath.replace(componentsPath, applicationPath);
        host.create(targetPath, content);
      }
    });

    return host;
  };
}
