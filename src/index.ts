import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import {
  Contents,
  ContentsManager,
  Drive,
  IContentsManager,
  IDefaultDrive,
  IKernelManager,
  IKernelSpecManager,
  Kernel,
  KernelSpec,
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

/**
 * Example consuming a required service
 */
const kernelsConsumerPlugin: ServiceManagerPlugin<void> = {
  id: 'myextension:kernels-consumer',
  description: 'A JupyterLab extension consuming the kernels service',
  autoStart: true,
  requires: [IKernelManager],
  activate: (_: null, kernels: Kernel.IManager): void => {
    kernels.runningChanged.connect((_, running) => {
      console.log('Running kernels:', running);
    });
  }
};

/**
 * Example consuming an optional service
 */
const kernelSpecConsumerPlugin: ServiceManagerPlugin<void> = {
  id: 'myextension:kernelspec-consumer',
  description: 'A JupyterLab extension consuming the kernel spec service',
  autoStart: true,
  optional: [IKernelSpecManager],
  activate: (_: null, kernelSpecs: KernelSpec.IManager | null): void => {
    if (kernelSpecs) {
      console.log('Available kernel specs:', kernelSpecs.specs);
      kernelSpecs.specsChanged.connect(() => {
        console.log('Available kernel specs:', kernelSpecs.specs);
      });
    }
  }
};

const examplePlugin: JupyterFrontEndPlugin<void> = {
  id: 'myextension:example',
  autoStart: true,
  activate: (app: JupyterFrontEnd): void => {
    console.log('Example of a regular JupyterLab extension is activated!');
  }
};

export default [
  defaultDrivePlugin,
  contentsPlugin,
  kernelsConsumerPlugin,
  kernelSpecConsumerPlugin,
  examplePlugin
];
