import {
  Contents,
  ContentsManager,
  Drive,
  IContentsManager,
  IDefaultDrive,
  ServiceManagerPlugin
} from '@jupyterlab/services';

class CustomDrive extends Drive {
  constructor(options: Drive.IOptions) {
    super(options);
    console.log('Instantiating a custom drive');
  }
}

class CustomContents extends ContentsManager {
  async get(
    path: string,
    options?: Contents.IFetchOptions
  ): Promise<Contents.IModel> {
    console.log('CustomContents.get', path);
    return super.get(path, options);
  }
}

/**
 * Initialization data for the myextension extension.
 */
const defaultDrivePlugin: ServiceManagerPlugin<Contents.IDrive> = {
  id: 'myextension:default-drive',
  description:
    'A JupyterLab extension providing a different custom default drive',
  autoStart: true,
  provides: IDefaultDrive,
  activate: (_: null): Contents.IDrive => {
    console.log('Using a CUSTOM default drive plugin');
    return new CustomDrive({ name: 'CustomDrive' });
  }
};

const contentsPlugin: ServiceManagerPlugin<Contents.IManager> = {
  id: 'myextension:contents-drive',
  description: 'A JupyterLab extension providing a custom contents manager',
  autoStart: true,
  provides: IContentsManager,
  activate: (_: null): Contents.IManager => {
    console.log('Using a CUSTOM contents manager plugin');
    return new CustomContents();
  }
};

export default [defaultDrivePlugin, contentsPlugin];
