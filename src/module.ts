// @ts-ignore
import moduleFactory from "../lib/libwecan.js";

interface LibwecanModule extends EmscriptenModule {
  ccall: typeof ccall;
  cwrap: typeof cwrap;
  addFunction: typeof addFunction;
  removeFunction: typeof removeFunction;
}

let _module: LibwecanModule | null;

export async function initModule(): Promise<void> {
  _module = (await moduleFactory()) as LibwecanModule;
}

export function getModule(): LibwecanModule {
  if (_module == null) {
    throw new Error("libwecan module is not initialized.");
  }
  return _module;
}
