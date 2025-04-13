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
    const applicationPath = normalize(
      join(rootPath, path, `${options.name}.pipe.ts`)
    );
    const elementName = getElementName(options.name);

    const pipePath = normalize(
      join(
        'node_modules',
        '@ngverse',
        'ui',
        'src',
        'lib',
        'pipes',
        `${elementName}.pipe.ts`
      )
    );

    const pipeFile = host.get(pipePath);
    if (pipeFile === null) {
      throw new SchematicsException(`Could not find ${elementName}`);
    }
    const pipeContent = pipeFile.content.toString('utf-8');

    const apppipeFile = host.get(applicationPath);

    if (apppipeFile && !options.replace) {
      throw new SchematicsException(
        `the ${elementName} already exists in ${applicationPath}, use --replace=true option to overwrite`
      );
    }

    // const pipeTestPath = normalize(
    //   join(
    //     'node_modules',
    //     '@ngverse',
    //     'ui',
    //     'src',
    //     'lib',
    //     'pipes',
    //     `${elementName}.pipe.spec.ts`
    //   )
    // );

    // const pipeTestFile = host.get(pipeTestPath);

    // if (pipeTestFile) {
    //   if (options.includeTests) {
    //     const pipeTestContent = pipeTestFile.content.toString('utf-8');
    //     host.create(
    //       applicationPath.replace('.pipe.ts', '.pipe.spec.ts'),
    //       pipeTestContent
    //     );
    //   }
    // }

    if (apppipeFile) {
      host.overwrite(applicationPath, pipeContent);
    } else {
      host.create(applicationPath, pipeContent);
    }
    return host;
  };
}
