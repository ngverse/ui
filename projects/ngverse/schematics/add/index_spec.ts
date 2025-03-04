import { SchematicsException } from '@angular-devkit/schematics';
import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import { InvalidInputOptions } from '@angular-devkit/schematics/tools/schema-option-transform';
import {
  Schema as ApplicationOptions,
  Style,
} from '@schematics/angular/application/schema';
import { Schema as WorkspaceOptions } from '@schematics/angular/workspace/schema';

const collectionPath = require.resolve('../collection.json');

const PROJECT_NAME = 'demo';

const BUTTON_COMPONENT_TS = `
    @Component({
       selector:"app-button",
       template:"<ng-content></ng-content>"
    })
    export class ButtonComponent{
    }
`;
const BUTTON_COMPONENT_HTML = 'BUTTON HTML';
const BUTTON_COMPONENT_SCSS = 'BUTTON SCSS';
const BUTTON_COMPONENT_SPEC_TS = 'BUTTON SPEC';

function createElementPath(name: string, extension: string) {
  return `node_modules/ngverse/src/lib/${name}/${name}.${extension}`;
}

function getProjectPath(name: string, extension: string) {
  return `projects/demo/src/app/${name}/${name}.${extension}`;
}

function createButtonComponent(appTree: UnitTestTree) {
  appTree.create(
    createElementPath('button', 'component.ts'),
    BUTTON_COMPONENT_TS
  );
  appTree.create(
    createElementPath('button', 'component.html'),
    BUTTON_COMPONENT_HTML
  );
  appTree.create(
    createElementPath('button', 'component.css'),
    BUTTON_COMPONENT_SCSS
  );
  appTree.create(
    createElementPath('button', 'component.spec.ts'),
    BUTTON_COMPONENT_SPEC_TS
  );
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
    createButtonComponent(appTree);
  });

  it('should throw error on empty name', async () => {
    await expectAsync(
      testRunner.runSchematic('add', appTree)
    ).toBeRejectedWithError(
      InvalidInputOptions,
      /Data path "" must have required property 'name'/
    );
  });

  it('should throw an exception on invalid name', async () => {
    const componentName = 'foo';
    await expectAsync(
      testRunner.runSchematic(
        'add',
        { name: componentName, project: PROJECT_NAME },
        appTree
      )
    ).toBeRejectedWithError(
      SchematicsException,
      `Could not find ${componentName}`
    );
  });

  it('should throw an exception on existing component', async () => {
    const componentName = 'button';
    await testRunner.runSchematic(
      'add',
      { name: componentName, project: PROJECT_NAME },
      appTree
    );

    await expectAsync(
      testRunner.runSchematic(
        'add',
        { name: componentName, project: PROJECT_NAME },
        appTree
      )
    ).toBeRejectedWithError(
      SchematicsException,
      `the ${componentName} already exists in projects/demo/src/app/button, use --replace=true option to overwrite`
    );
  });

  it('should not throw an exception if --replace option is used', async () => {
    const componentName = 'button';
    await testRunner.runSchematic(
      'add',
      { name: componentName, project: PROJECT_NAME },
      appTree
    );
    await testRunner.runSchematic(
      'add',
      { name: componentName, project: PROJECT_NAME, replace: true },
      appTree
    );
  });

  it('should add components to project files', async () => {
    const componentName = 'button';
    await testRunner.runSchematic(
      'add',
      { name: componentName, project: PROJECT_NAME },
      appTree
    );
    expect(
      appTree.readContent(getProjectPath(componentName, 'component.ts'))
    ).toEqual(BUTTON_COMPONENT_TS);
    expect(
      appTree.readContent(getProjectPath(componentName, 'component.html'))
    ).toEqual(BUTTON_COMPONENT_HTML);
    expect(
      appTree.readContent(getProjectPath(componentName, 'component.css'))
    ).toEqual(BUTTON_COMPONENT_SCSS);
  });

  it('should not add spec file by default', async () => {
    const componentName = 'button';
    await testRunner.runSchematic(
      'add',
      { name: componentName, project: PROJECT_NAME },
      appTree
    );
    expect(
      appTree.readContent(getProjectPath(componentName, 'component.spec.ts'))
    ).toBeFalsy();
  });
  it('should add spec file if includeTests=true', async () => {
    const componentName = 'button';
    await testRunner.runSchematic(
      'add',
      { name: componentName, project: PROJECT_NAME, includeTests: true },
      appTree
    );
    expect(
      appTree.readContent(getProjectPath(componentName, 'component.spec.ts'))
    ).toEqual(BUTTON_COMPONENT_SPEC_TS);
  });

  it('should update prefix of the component', async () => {
    const componentName = 'button';
    const modifiedButton = `
    @Component({
       selector:"demo-button",
       template:"<ng-content></ng-content>"
    })
    export class ButtonComponent{
    }
`;
    await testRunner.runSchematic(
      'add',
      { name: componentName, project: PROJECT_NAME, prefix: 'demo' },
      appTree
    );
    expect(
      appTree.readContent(getProjectPath(componentName, 'component.ts'))
    ).toEqual(modifiedButton);
  });
});
