import { basename, normalize } from '@angular-devkit/core';
import { SchematicsException, Tree } from '@angular-devkit/schematics';
import { getProjectFromWorkspace } from '@angular/cdk/schematics';
import { getWorkspace } from '@schematics/angular/utility/workspace';
import { join } from 'path';
import { Schema } from './schema';

function getElementName(inputPath: string): string {
  // Normalize the input path to handle different OS separators
  const normalizedPath = normalize(inputPath);

  // Get the last part of the path
  return basename(normalizedPath);
}

export function pipe(options: Schema) {
  return async (host: Tree) => {
    const workspace = await getWorkspace(host);

    const project = getProjectFromWorkspace(workspace, options.project);
    if (!project) {
      throw new SchematicsException(`Invalid project name: ${options.project}`);
    }
    const projectType =
      project.extensions['projectType'] === 'application' ? 'app' : 'lib';

    const rootPath = normalize(`${project.sourceRoot}/${projectType}`);
    let path = './';
    if (options.path) {
      path = `./${options.path}`;
    }
    const applicationPath = normalize(join(rootPath, path, options.name));
    const elementName = getElementName(options.name);

    const elementsPath = normalize(
      join('node_modules', '@ngverse/ui', 'src', 'lib', elementName)
    );
    const dir = host.getDir(elementsPath);
    const directoryExists = dir.subfiles.length > 0 || dir.subdirs.length > 0;
    if (!directoryExists) {
      throw new SchematicsException(`Could not find ${elementName}`);
    }
    const applicationDir = host.getDir(applicationPath);
    const applicationDirExists =
      applicationDir.subfiles.length > 0 || applicationDir.subdirs.length > 0;
    if (applicationDirExists && !options.replace) {
      throw new SchematicsException(
        `the ${elementName} already exists in ${applicationPath}, use --replace=true option to overwrite`
      );
    }
    // Copy element files from the library to the application
    dir.visit((filePath) => {
      if (!options.includeTests && filePath.endsWith('.spec.ts')) {
        return;
      }
      const content = host.read(filePath)?.toString('utf-8');

      if (content !== undefined) {
        const targetPath = filePath.replace(elementsPath, applicationPath);
        if (host.exists(targetPath)) {
          host.overwrite(targetPath, content);
        } else {
          host.create(targetPath, content);
        }
      }
    });

    return host;
  };
}
