import {
  Tree,
  formatFiles,
  installPackagesTask,
  readProjectConfiguration,
  addProjectConfiguration,
  readWorkspaceConfiguration,
  updateWorkspaceConfiguration,
  getProjects,
  generateFiles,
  addDependenciesToPackageJson,
  getWorkspaceLayout,
  offsetFromRoot,
  normalizePath,
  applyChangesToString,
  joinPathFragments,
  names,
} from '@nrwl/devkit';

import chalk from 'chalk';

export interface AvaliableLib {
  root: string;
  sourceRoot: string;
  libName: string;
}

export function getAvailableLibs(host: Tree): Array<AvaliableLib> {
  const projects = getProjects(host);
  const libs: Array<AvaliableLib> = [];

  projects.forEach((project, libName) => {
    if (project.projectType === 'library') {
      libs.push({
        libName,
        root: project.root,
        sourceRoot: project.sourceRoot,
      });
    }
  });

  return libs;
}

export function generateDTONames(className: string) {
  return {
    CreateDTOClassName: `Create${className}DTO`,
    UpdateDTOClassName: `Update${className}DTO`,
    DeleteDTOClassName: `Deleete${className}DTO`,
  };
}

// check all reserved words?
export function isValidNamespace(namespace: string): boolean {
  return (
    // typeof namespace === 'string' &&
    // FIXME: isNaN("") === false
    // isNaN(Number(namespace)) &&
    namespace !== 'true' && namespace !== 'false'
  );
}

export function devLog(str: string): void {
  process.env.NODE_ENV === 'development'
    ? console.log(chalk.green(str))
    : void 0;
}

export function devInfo(str: string): void {
  process.env.NODE_ENV === 'development'
    ? console.log(chalk.cyan(str))
    : void 0;
}

export function devWarn(str: string): void {
  process.env.NODE_ENV === 'development'
    ? console.log(chalk.yellow(str))
    : void 0;
}

export function devError(str: string): void {
  process.env.NODE_ENV === 'development' ? console.log(chalk.red(str)) : void 0;
}
