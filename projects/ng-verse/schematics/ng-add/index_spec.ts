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

describe('simple-schematic', () => {
  const testRunner = new SchematicTestRunner('rocket', collectionPath);

  const workspaceOptions: WorkspaceOptions = {
    name: 'workspace',
    newProjectRoot: 'projects',
    version: '6.0.0',
  };

  describe('with project', () => {
    const appOptions: ApplicationOptions = {
      name: 'bar',
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
    });

    it('hey', () => {
      expect(true).toBe(true);
    });
  });
});
