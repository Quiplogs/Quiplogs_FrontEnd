export function throwIfAlreadyLoaded(parentModule: any, moduleName: string) {
    if (parentModule) {
      throw new Error(`${moduleName} has already been loaded. Import WorkOrder-Core modules in the AppModule only.`);
    }
  }
