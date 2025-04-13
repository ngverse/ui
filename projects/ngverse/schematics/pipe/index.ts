import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import {
  Schema as ApplicationOptions,
  Style,
} from '@schematics/angular/application/schema';
import { Schema as WorkspaceOptions } from '@schematics/angular/workspace/schema';

const collectionPath = require.resolve('../collection.json');

const PROJECT_NAME = 'demo';

const CHAR_AT_TS = `
    import { Pipe, PipeTransform } from '@angular/core';
    
    /**
     * A pipe that returns the character at the specified index in the given string.
     */
    @Pipe({
      name: 'charAt',
    })
    export class CharAtPipe implements PipeTransform {
      /**
       * Returns the character at the specified index in the given string.
       *
       * If the string is null or undefined, the function returns undefined.
       *
       * If the index is out of bounds, the function returns undefined.
       *
       * @param value The string to get the character from.
       * @param index The index of the character to get, defaults to 0.
       * @returns The character at the specified index, or undefined if the string is null or undefined, or the index is out of bounds.
       */
      transform(value: string | undefined | null, index = 0): string | undefined {
        return value?.charAt(index) ?? undefined;
      }
    }
`;

const CHAR_AT_SPEC_TS = 'CHAR AT SPEC';

function createElementPath(name: string, extension: string) {
  return `node_modules/@ngverse/ui/src/lib/pipes/${name}.${extension}`;
}

// function getProjectPath(name: string, extension: string) {
//   return `projects/demo/src/app/${name}/${name}.${extension}`;
// }

function createPipe(appTree: UnitTestTree) {
  appTree.create(createElementPath('char-at', 'pipe.ts'), CHAR_AT_TS);
  appTree.create(createElementPath('char-at', 'pipe.spec.ts'), CHAR_AT_SPEC_TS);
}

describe('element', () => {
  const testRunner = new SchematicTestRunner('ngverse', collectionPath);
  const workspaceOptions: WorkspaceOptions = {
    name: 'workspace',

    newProjectRoot: 'projects',
    version: '19.0.6',
  };

  const appOptions: ApplicationOptions = {
    name: PROJECT_NAME,
    inlineStyle: false,
    inlineTemplate: false,
    routing: false,
    style: Style.Css,
    skipTests: false,
    skipPackageJson: false,
  };
  let appTree: UnitTestTree;
  beforeEach(async () => {
    appTree = await testRunner.runExternalSchematic(
      '@schematics/angular',
      'workspace',
      workspaceOptions
    );
    appTree = await testRunner.runExternalSchematic(
      '@schematics/angular',
      'application',
      appOptions,
      appTree
    );
    createPipe(appTree);
  });

  it('test', async () => {
    const componentName = 'char-at';
    await expectAsync(
      testRunner.runSchematic(
        'pipe',
        { name: componentName, project: PROJECT_NAME },
        appTree
      )
    );

    console.log(appTree.files);
  });

  //   it('should throw error on empty name', async () => {
  //     await expectAsync(
  //       testRunner.runSchematic('add', appTree)
  //     ).toBeRejectedWithError(
  //       InvalidInputOptions,
  //       /Data path "" must have required property 'name'/
  //     );
  //   });

  //   it('should throw an exception on invalid name', async () => {
  //     const componentName = 'foo';
  //     await expectAsync(
  //       testRunner.runSchematic(
  //         'add',
  //         { name: componentName, project: PROJECT_NAME },
  //         appTree
  //       )
  //     ).toBeRejectedWithError(
  //       SchematicsException,
  //       `Could not find ${componentName}`
  //     );
  //   });

  //   it('should throw an exception on existing component', async () => {
  //     const componentName = 'button';
  //     await testRunner.runSchematic(
  //       'add',
  //       { name: componentName, project: PROJECT_NAME },
  //       appTree
  //     );

  //     await expectAsync(
  //       testRunner.runSchematic(
  //         'add',
  //         { name: componentName, project: PROJECT_NAME },
  //         appTree
  //       )
  //     ).toBeRejectedWithError(
  //       SchematicsException,
  //       `the ${componentName} already exists in projects/demo/src/app/button, use --replace=true option to overwrite`
  //     );
  //   });

  //   it('should not throw an exception if --replace option is used', async () => {
  //     const componentName = 'button';
  //     await testRunner.runSchematic(
  //       'add',
  //       { name: componentName, project: PROJECT_NAME },
  //       appTree
  //     );
  //     await testRunner.runSchematic(
  //       'add',
  //       { name: componentName, project: PROJECT_NAME, replace: true },
  //       appTree
  //     );
  //   });

  //   it('should add components to project files', async () => {
  //     const componentName = 'button';
  //     await testRunner.runSchematic(
  //       'add',
  //       { name: componentName, project: PROJECT_NAME },
  //       appTree
  //     );
  //     expect(
  //       appTree.readContent(getProjectPath(componentName, 'component.ts'))
  //     ).toEqual(CHAR_AT_TS);
  //   });

  //   it('should not add spec file by default', async () => {
  //     const componentName = 'button';
  //     await testRunner.runSchematic(
  //       'add',
  //       { name: componentName, project: PROJECT_NAME },
  //       appTree
  //     );
  //     expect(
  //       appTree.readContent(getProjectPath(componentName, 'component.spec.ts'))
  //     ).toBeFalsy();
  //   });
  //   it('should add spec file if includeTests=true', async () => {
  //     const componentName = 'button';
  //     await testRunner.runSchematic(
  //       'add',
  //       { name: componentName, project: PROJECT_NAME, includeTests: true },
  //       appTree
  //     );
  //     expect(
  //       appTree.readContent(getProjectPath(componentName, 'component.spec.ts'))
  //     ).toEqual(BUTTON_COMPONENT_SPEC_TS);
  //   });

  //   it('should update prefix of the component', async () => {
  //     const componentName = 'button';
  //     const modifiedButton = `
  //     @Component({
  //        selector:"demo-button",
  //        template:"<ng-content></ng-content>"
  //     })
  //     export class ButtonComponent{
  //     }
  // `;
  //     await testRunner.runSchematic(
  //       'add',
  //       { name: componentName, project: PROJECT_NAME, prefix: 'demo' },
  //       appTree
  //     );
  //     expect(
  //       appTree.readContent(getProjectPath(componentName, 'component.ts'))
  //     ).toEqual(modifiedButton);
  //   });

  //   it('should put component properly when path provided', async () => {
  //     const componentName = 'button';

  //     await testRunner.runSchematic(
  //       'add',
  //       { name: componentName, project: PROJECT_NAME, path: 'ui' },
  //       appTree
  //     );
  //     const path = 'projects/demo/src/app/ui/button/button.component.ts';
  //     expect(appTree.readContent(path)).toEqual(BUTTON_COMPONENT_TS);
  //   });
});
