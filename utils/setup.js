#!/usr/bin/env node
const { execSync } = require('child_process');
const fs = require('fs-extra');
const core = require('@actions/core');
const path = require('path');

const destDir = 'node_modules/swift-syntax';
const package = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const command = `git clone \
 "https://github.com/apple/swift-syntax.git" \
 "${destDir}" \
 --branch "${package.version}" --single-branch`;
core.startGroup(`Cloning official swift-syntax repo`);
fs.removeSync(destDir);
execSync(command, {
  stdio: ['inherit', 'inherit', 'inherit'],
  encoding: 'utf-8'
}
);
core.endGroup();

core.startGroup(`Copy source files for swift-syntax`);
['Sources', 'Tests'].forEach((dir) => {
  const source = `${destDir}/${dir}`;
  fs.emptyDirSync(dir);
  fs.copySync(source, dir);
});
core.endGroup();

core.startGroup(`Removing .docc directories from Sources`);
fs.readdirSync('Sources', { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .forEach(dirent => {
    const dirPath = path.join('Sources', dirent.name);
    fs.readdirSync(dirPath, { withFileTypes: true })
      .filter(innerDirent => innerDirent.isDirectory() && innerDirent.name.endsWith('.docc'))
      .forEach(innerDirent => {
        const doccDirPath = path.join(dirPath, innerDirent.name);
        console.log(`Removing directory: ${doccDirPath}`);
        fs.removeSync(doccDirPath);
      });
  });
core.endGroup();