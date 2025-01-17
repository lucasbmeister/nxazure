import { Tree, readProjectConfiguration } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import generator from '../generator';
import { InitGeneratorSchema } from '../schema';

jest.mock('@nx/devkit', () => {
  const originalModule = jest.requireActual('@nx/devkit');

  return {
    ...originalModule,
    installPackagesTask: jest.fn(() => console.log('Imagine installing packages here...')),
  };
});

describe('Check port increased value', () => {
  let appTree: Tree;
  const baseOptions: InitGeneratorSchema = { name: 'HelloWorld', strict: true, silent: true, v4: false };

  beforeAll(() => {
    appTree = createTreeWithEmptyWorkspace({ layout: 'apps-libs' });
  });

  it('Port is 7071', async () => {
    const projectName = `${baseOptions.name}1`;

    await generator(appTree, { ...baseOptions, name: projectName });
    const config = readProjectConfiguration(appTree, projectName);

    expect(config).toHaveProperty('targets.start.options.port', 7071);
  });

  it('Port is 7072', async () => {
    const projectName = `${baseOptions.name}2`;

    await generator(appTree, { ...baseOptions, name: projectName });
    const config = readProjectConfiguration(appTree, projectName);

    expect(config).toHaveProperty('targets.start.options.port', 7072);
  });

  it('Port is 7073', async () => {
    const projectName = `${baseOptions.name}3`;

    await generator(appTree, { ...baseOptions, name: projectName });
    const config = readProjectConfiguration(appTree, projectName);

    expect(config).toHaveProperty('targets.start.options.port', 7073);
  });
});
