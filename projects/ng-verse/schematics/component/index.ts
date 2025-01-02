import { SchematicsException, Tree } from '@angular-devkit/schematics';
import { getProjectFromWorkspace } from '@angular/cdk/schematics';
import { getWorkspace } from '@schematics/angular/utility/workspace';
import { join } from 'path';
import { Schema } from './schema';

// A function that will generate a Rule to copy the specified component folder
export function component(options: Schema) {
  return async (host: Tree) => {

    const workspace = await getWorkspace(host);
    const project = getProjectFromWorkspace(workspace, options.project);

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
