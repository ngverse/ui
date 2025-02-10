const fs = require('fs');
const path = require('path');
const dirTree = require('directory-tree');

// Define your base directory
const baseDir = path.resolve('./projects/ng-verse/src/lib');

// Custom function to modify paths in the tree
function cleanTreePaths(tree, baseDir) {
  tree.path = path.relative(baseDir, tree.path); // Make path relative to base directory

  if (tree.children) {
    tree.children = tree.children.map((child) =>
      cleanTreePaths(child, baseDir)
    );
  }

  return tree;
}

function normalizePathsRecursively(node) {
  node.path = path.posix.normalize(node.path.split(path.sep).join('/'));

  if (node.children) {
    node.children = node.children.map(normalizePathsRecursively);
  }

  return node;
}

// Custom function to add the `language` field
function addLanguageField(tree) {
  if (tree.children === undefined) {
    let language = 'ts';
    const name = tree.name;
    if (name.includes('spec.ts')) {
      language = 'spec.ts';
    } else if (name.includes('html')) {
      language = 'html';
    } else if (name.includes('scss')) {
      language = 'scss';
    }
    tree.language = language;
  }

  if (tree.children) {
    tree.children = tree.children.map(addLanguageField);
  }

  return tree;
}

// Function to add the `language` field and rename `children` to `files`
function renameToFiles(node) {
  if (!node.children || node.children.length === 0) {
    return node;
  } else {
    // This is a directory node; recursively process children
    node.files = node.children.map(renameToFiles); // Rename `children` to `files`
    delete node.children; // Remove the `children` key
  }
  return node;
}

// Generate the directory tree
let tree = dirTree(baseDir, {
  extensions: /\.(ts|js|json|html|css|scss)$/, // Optional: Filter by file types
});

// Clean up paths
tree = cleanTreePaths(tree, baseDir);

tree = normalizePathsRecursively(tree);

tree = addLanguageField(tree);

tree = renameToFiles(tree);

// Convert the tree to a JSON string
const jsonOutput = JSON.stringify(tree, null, 2);

fs.writeFileSync('projects/docs/src/tree-structure.json', jsonOutput, 'utf8');
