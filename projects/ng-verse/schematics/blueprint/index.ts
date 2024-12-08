import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { join } from 'path';

// A function that will generate a Rule to copy the specified component folder
export function blueprint(options: Schema): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const componentsPath = join(
      'node_modules',
      'ng-verse',
      'src',
      'lib',
      options.name
    );

    const applicationPath = join('src', 'app', 'components', options.name);

    // Copy component files from the library to the application
    tree.getDir(componentsPath).visit((filePath) => {
      const content = tree.read(filePath);
      if (content) {
        const targetPath = filePath.replace(componentsPath, applicationPath);
        tree.create(targetPath, content);
      }
    });

    return tree;
  };
}

// Schema file (schema.ts)
export interface Schema {
  name: string;
}
