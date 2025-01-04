/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import {
  NodePackageInstallTask,
  RunSchematicTask,
} from '@angular-devkit/schematics/tasks';

import { addPackageToPackageJson } from './package-config';
import { Schema } from './schema';
export function ngAdd(options: Schema): Rule {
  return (host: Tree, context: SchematicContext) => {
    // const angularDependencyVersion = ngCoreVersionTag || `0.0.0-NG`;

    addPackageToPackageJson(host, '@angular/cdk', '>=19.0.1');

    // Since the Angular Material schematics depend on the schematic utility functions from the
    // CDK, we need to install the CDK before loading the schematic files that import from the CDK.
    const installTaskId = context.addTask(new NodePackageInstallTask());

    context.addTask(new RunSchematicTask('ng-add-setup-project', options), [
      installTaskId,
    ]);
  };
}
