// helper to generate path list
export const createPaths = <T extends Record<string, any>>() => {
  return new Proxy({} as {[K in keyof T]: K}, {
    get: (_, prop: string) => prop,
  });
};
