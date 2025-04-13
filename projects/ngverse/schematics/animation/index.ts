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

export function animation(options: Schema) {
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
      join(rootPath, path, `${options.name}.animation.ts`)
    );
    const elementName = getElementName(options.name);

    const animationPath = normalize(
      join(
        'node_modules',
        '@ngverse',
        'ui',
        'src',
        'lib',
        'animations',
        `${elementName}.animation.ts`
      )
    );

    const animationFile = host.get(animationPath);
    if (animationFile === null) {
      throw new SchematicsException(`Could not find ${elementName}`);
    }
    const animationContent = animationFile.content.toString('utf-8');

    const appanimationFile = host.get(applicationPath);

    if (appanimationFile && !options.replace) {
      throw new SchematicsException(
        `the ${elementName} already exists in ${applicationPath}, use --replace=true option to overwrite`
      );
    }

    // const animationTestPath = normalize(
    //   join(
    //     'node_modules',
    //     '@ngverse',
    //     'ui',
    //     'src',
    //     'lib',
    //     'animations',
    //     `${elementName}.animation.spec.ts`
    //   )
    // );

    // const animationTestFile = host.get(animationTestPath);

    // if (animationTestFile) {
    //   if (options.includeTests) {
    //     const animationTestContent = animationTestFile.content.toString('utf-8');
    //     host.create(
    //       applicationPath.replace('.animation.ts', '.animation.spec.ts'),
    //       animationTestContent
    //     );
    //   }
    // }

    if (appanimationFile) {
      host.overwrite(applicationPath, animationContent);
    } else {
      host.create(applicationPath, animationContent);
    }
    return host;
  };
}
