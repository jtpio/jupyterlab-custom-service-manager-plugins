import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { Contents, Drive, IDefaultDrive } from '@jupyterlab/services';

class CustomDrive extends Drive {
  constructor(options: Drive.IOptions) {
    super(options);
    console.log('Instantiating a custom drive');
  }
}

/**
 * Initialization data for the myextension extension.
 */
const plugin: JupyterFrontEndPlugin<Contents.IDrive> = {
  id: 'myextension:plugin',
  description:
    'A JupyterLab extension providing a different custom default drive',
  autoStart: true,
  provides: IDefaultDrive,
  activate: (app: JupyterFrontEnd): Contents.IDrive => {
    console.log('Using a CUSTOM default drive plugin');
    return new CustomDrive({ name: 'CustomDrive' });
  }
};

export default plugin;
