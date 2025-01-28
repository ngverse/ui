import { normalize } from '@angular-devkit/core';
import {
  callRule,
  chain,
  noop,
  Rule,
  SchematicContext,
  SchematicsException,
  Tree,
} from '@angular-devkit/schematics';
import {
  getProjectFromWorkspace,
  getProjectStyleFile,
} from '@angular/cdk/schematics';
import { addRootProvider } from '@schematics/angular/utility';
import { getWorkspace } from '@schematics/angular/utility/workspace';
import { dirname, join } from 'path';
import { Schema } from './schema';

import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import {
  addPackageJsonDependency,
  NodeDependencyType,
} from '@schematics/angular/utility/dependencies';

function installDependenceis(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const packageJson = JSON.parse(
      tree.read('package.json')?.toString() || '{}'
    );
    if (!packageJson.dependencies['ngverse']) {
      addPackageJsonDependency(tree, {
        type: NodeDependencyType.Default,
        name: 'ngverse',
        version: 'latest',
      });
      context.addTask(new NodePackageInstallTask());
    }
    return tree;
  };
}

function addStyles(options: Schema) {
  return async (host: Tree) => {
    const workspace = await getWorkspace(host);

    const project = getProjectFromWorkspace(workspace, options.project);

    if (!project) {
      throw new SchematicsException(`Invalid project name: ${options.project}`);
    }

    const styleSCSSPath = getProjectStyleFile(project);

    if (!styleSCSSPath || !host.exists(styleSCSSPath)) {
      throw new SchematicsException(
        `Could not find ${styleSCSSPath} to add ngverse.scss`
      );
    }

    const ngVerseStylePath = normalize(
      join('node_modules', 'ngverse', 'src', 'lib', 'ngverse.scss')
    );
    if (!host.exists(ngVerseStylePath)) {
      throw new SchematicsException(
        `Could not find ${ngVerseStylePath} to add ngverse.scss`
      );
    }
    const styleDirectory = dirname(styleSCSSPath);

    const newNgVerseStylePath = normalize(join(styleDirectory, 'ngverse.scss'));

    host.create(newNgVerseStylePath, host.read(ngVerseStylePath) as Buffer);

    const insertion = `@use './ngverse.scss';\n`;

    const recorder = host.beginUpdate(styleSCSSPath);
    recorder.insertLeft(0, insertion);

    host.commitUpdate(recorder);
  };
}

function addAnimations(options: Schema) {
  return (host: Tree, context: SchematicContext) => {
    const animationsRule =
      options.animations === 'excluded'
        ? noop()
        : addRootProvider(options.project, ({ code, external }) => {
            return code`${external(
              'provideAnimationsAsync',
              '@angular/platform-browser/animations/async'
            )}(${options.animations === 'disabled' ? `'noop'` : ''})`;
          });

    return callRule(animationsRule as Rule, host, context);
  };
}
export default function (options: Schema): Rule {
  return chain([
    installDependenceis(),
    addAnimations(options),
    addStyles(options),
  ]);
}
