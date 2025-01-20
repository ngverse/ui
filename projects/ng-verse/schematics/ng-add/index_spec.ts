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
const NG_VERSE_ROOT = `node_modules/ng-verse/src/lib/`;

const NG_VERSE_STYLES = `:root {
  --background: white;
  --foreground: #030712;
  --primary: #2563eb;
  --border-radius: 6px;

  --primary-foreground: white;

  --inverse: #1f2937;
  --inverse-foreground: white;

  --secondary: #4b5563;
  --secondary-foreground: white;

  --accent: #f3f4f6;
  --accent-foreground: #111827;

  --danger: #dc2626;
  --danger-foreground: white;

  --warning: #ea580c;
  --warning-foreground: white;

  --success: #16a34a;
  --success-foreground: white;

  --disabled: #f3f4f6;
  --disabled-foreground: #9ca3af;

  --surface: #f9fafb;

  --surface-2: #d1d5db;

  --divider: #cbd5e1;

  --border: 1px solid #d1d5db;

  --ring: #9ca3af;

  --shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);

  --mute-start: #e0e0e0;
  --mute-end: #f0f0f0;

  --field-height: 36px;
  --field-padding: 6px 10px;

  --app-field-border-radius: 8px;
  --app-field-border: 1px solid #d1d5db;
  --app-field-focus-outline: 1px solid #9ca3af;
  --app-field-disabled-bg-color: #f3f4f6;
  --app-field-disabled-color: #9ca3af;

  --app-option-hover-bg-color: #e5e7eb;
  --app-option-padding: 6px;
  --app-option-cursor: pointer;
  --app-option-disabled-color: #9ca3af;
}

html,
body {
  background-color: var(--background);
  color: var(--foreground);
}
`;

describe('ng-add', () => {
  const testRunner = new SchematicTestRunner('ng-verse', collectionPath);
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
      `Could not find ${STYLE_PATH} to add ng-verse.scss`
    );
  });

  it('should throw an error if ng-verse.scss is not found', async () => {
    await expectAsync(
      testRunner.runSchematic(
        'ng-add-setup-project',
        { project: PROJECT_NAME },
        appTree
      )
    ).toBeRejectedWithError(
      SchematicsException,
      `Could not find ${NG_VERSE_ROOT}ng-verse.scss to add ng-verse.scss`
    );
  });

  it("should add ng-verse.scss file to the project's styles", async () => {
    appTree.create(NG_VERSE_ROOT + 'ng-verse.scss', NG_VERSE_STYLES);
    await testRunner.runSchematic(
      'ng-add-setup-project',
      { project: PROJECT_NAME },
      appTree
    );
    const stylesContent = appTree
      .read(PROJECT_ROOT + 'styles.scss')
      ?.toString();
    expect(stylesContent).toContain(NG_VERSE_STYLES);
  });

  it('should add animation to the project config', async () => {
    appTree.create(NG_VERSE_ROOT + 'ng-verse.scss', '');
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
    appTree.create(NG_VERSE_ROOT + 'ng-verse.scss', '');
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
    appTree.create(NG_VERSE_ROOT + 'ng-verse.scss', '');
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
  it("should add ng-verse to the project's package.json", async () => {
    appTree.create(NG_VERSE_ROOT + 'ng-verse.scss', '');
    await testRunner.runSchematic(
      'ng-add-setup-project',
      { project: PROJECT_NAME },
      appTree
    );
    const packageJson = JSON.parse(
      appTree.read('package.json')?.toString() || '{}'
    );
    expect(packageJson.dependencies['ng-verse']).toBeDefined();
  });
  it("ng-add should add @angular/cdk to the project's package.json", async () => {
    appTree.create(NG_VERSE_ROOT + 'ng-verse.scss', '');
    await testRunner.runSchematic('ng-add', { project: PROJECT_NAME }, appTree);
    const packageJson = JSON.parse(
      appTree.read('package.json')?.toString() || '{}'
    );
    expect(packageJson.dependencies['@angular/cdk']).toBeDefined();
  });
});
