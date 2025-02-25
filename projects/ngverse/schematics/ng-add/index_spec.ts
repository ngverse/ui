import { SchematicsException } from '@angular-devkit/schematics';
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

const PROJECT_ROOT = `projects/demo/src/`;
const PROJECT_APP_ROOT = `${PROJECT_ROOT}/app/`;
const STYLE_PATH = `projects/demo/src/styles.scss`;
const NG_VERSE_ROOT = `node_modules/ngverse/src/lib/`;

describe('ng-add', () => {
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
    style: Style.Scss,
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
  });

  it('should throw an error if styles.scss is not found', async () => {
    appTree.delete(STYLE_PATH);

    await expectAsync(
      testRunner.runSchematic(
        'ng-add-setup-project',
        { project: PROJECT_NAME },
        appTree
      )
    ).toBeRejectedWithError(
      SchematicsException,
      `Could not find ${STYLE_PATH} to add ngverse.scss`
    );
  });

  it('should throw an error if ngverse.scss is not found', async () => {
    await expectAsync(
      testRunner.runSchematic(
        'ng-add-setup-project',
        { project: PROJECT_NAME },
        appTree
      )
    ).toBeRejectedWithError(
      SchematicsException,
      `Could not find ${NG_VERSE_ROOT}ngverse.scss to add ngverse.scss`
    );
  });

  it("should add ngverse.scss file to the project's styles", async () => {
    appTree.create(NG_VERSE_ROOT + 'ngverse.scss', '');
    await testRunner.runSchematic(
      'ng-add-setup-project',
      { project: PROJECT_NAME },
      appTree
    );
    const stylesContent = appTree
      .read(PROJECT_ROOT + 'styles.scss')
      ?.toString();
    expect(stylesContent).toContain(`@use './ngverse.scss';`);
  });

  it('should add animation to the project config', async () => {
    appTree.create(NG_VERSE_ROOT + 'ngverse.scss', '');
    await testRunner.runSchematic(
      'ng-add-setup-project',
      { project: PROJECT_NAME },
      appTree
    );
    const appConfigContent = appTree
      .read(PROJECT_APP_ROOT + 'app.config.ts')
      ?.toString();
    expect(appConfigContent).toContain(
      "import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';"
    );
    expect(appConfigContent).toContain(`provideAnimationsAsync()`);
  });
  it('should add noop animation to the project config', async () => {
    appTree.create(NG_VERSE_ROOT + 'ngverse.scss', '');
    await testRunner.runSchematic(
      'ng-add-setup-project',
      { project: PROJECT_NAME, animations: 'disabled' },
      appTree
    );

    const appConfigContent = appTree
      .read(PROJECT_APP_ROOT + 'app.config.ts')
      ?.toString();
    expect(appConfigContent).toContain(
      "import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';"
    );
    expect(appConfigContent).toContain(`provideAnimationsAsync('noop')`);
  });
  it('should add excluded animation to the project config', async () => {
    appTree.create(NG_VERSE_ROOT + 'ngverse.scss', '');
    await testRunner.runSchematic(
      'ng-add-setup-project',
      { project: PROJECT_NAME, animations: 'excluded' },
      appTree
    );

    const appConfigContent = appTree
      .read(PROJECT_APP_ROOT + 'app.config.ts')
      ?.toString();
    expect(appConfigContent).not.toContain(
      "import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';"
    );
  });
  it("should add ngverse to the project's package.json", async () => {
    appTree.create(NG_VERSE_ROOT + 'ngverse.scss', '');
    await testRunner.runSchematic(
      'ng-add-setup-project',
      { project: PROJECT_NAME },
      appTree
    );
    const packageJson = JSON.parse(
      appTree.read('package.json')?.toString() || '{}'
    );
    expect(packageJson.dependencies['ngverse']).toBeDefined();
  });
  it("ng-add should add @angular/cdk to the project's package.json", async () => {
    appTree.create(NG_VERSE_ROOT + 'ngverse.scss', '');
    await testRunner.runSchematic('ng-add', { project: PROJECT_NAME }, appTree);
    const packageJson = JSON.parse(
      appTree.read('package.json')?.toString() || '{}'
    );
    expect(packageJson.dependencies['@angular/cdk']).toBeDefined();
  });
});
