import {
  callRule,
  chain,
  noop,
  Rule,
  SchematicContext,
  Tree,
} from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import {
  getProjectFromWorkspace,
  getProjectStyleFile,
} from '@angular/cdk/schematics';
import { addRootProvider } from '@schematics/angular/utility';
import { join } from 'path';

import {
  addPackageJsonDependency,
  NodeDependencyType,
} from '@schematics/angular/utility/dependencies';
import { getWorkspace } from '@schematics/angular/utility/workspace';
import { Schema } from './schema';

function installDependenceis(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const packageJson = JSON.parse(
      tree.read('package.json')?.toString() || '{}'
    );
    if (!packageJson.dependencies['ng-verse']) {
      addPackageJsonDependency(tree, {
        type: NodeDependencyType.Default,
        name: 'ng-verse',
        version: 'latest',
      });
      context.addTask(new NodePackageInstallTask());
    }
    return tree;
  };
}

function addStyles(options: Schema) {
  return async (host: Tree, context: SchematicContext) => {
    const workspace = await getWorkspace(host);
    const project = getProjectFromWorkspace(workspace, options.project);
    const styleFilePath = getProjectStyleFile(project);
    const logger = context.logger;

    if (!styleFilePath) {
      logger.error(`Could not find the default style file for this project.`);
      logger.info(`Consider manually adding the Roboto font to your CSS.`);
      logger.info(
        `More information at https://fonts.google.com/specimen/Roboto`
      );
      return;
    }

    const buffer = host.read(styleFilePath);

    if (!buffer) {
      logger.error(
        `Could not read the default style file within the project ` +
          `(${styleFilePath})`
      );
      logger.info(`Please consider manually setting up the Roboto font.`);
      return;
    }

    const htmlContent = buffer.toString();
    const globalStylesPath = join(
      'node_modules',
      'ng-verse',
      'src',
      'lib',
      'globals.scss'
    );
    const globalStylesContent = host.read(globalStylesPath);

    const insertion = `\n ${globalStylesContent?.toString() || ''}\n`;

    if (htmlContent.includes(insertion)) {
      return;
    }

    const recorder = host.beginUpdate(styleFilePath);

    recorder.insertLeft(htmlContent.length, insertion);
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

    // The `addRootProvider` rule can throw in some custom scenarios (see #28640).
    // Add some error handling around it so the setup isn't interrupted.
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
