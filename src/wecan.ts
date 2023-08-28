import { initModule, getModule } from "./module.js";

export type ObjectPtr = number;

export type Piece = {
  startBit: number;
  signalLength: number;
  signalValue: number;
};

export class WeCan {
  static initialize() {
    return initModule();
  }
  #frameBuffer: ObjectPtr = 0;

  constructor() {
    this.#frameBuffer = getModule().ccall("get_frame", "number", [], []);
  }

  puzzle(pieces: Piece[], frameLength: number) {
    getModule().ccall("reset_frame", null, [], []);
    for (let piece of pieces) {
      this.#insertStatic(piece.startBit, piece.signalLength, piece.signalValue);
    }
    return this.#frame(frameLength);
  }

  #frame(len: number) {
    const frameBuffer = getModule().HEAPU8.subarray(this.#frameBuffer, this.#frameBuffer + 64);
    if (len > 64) {
      console.log("Frame length too long");
      return frameBuffer.slice(0, 64);
    } else {
      return frameBuffer.slice(0, len);
    }
  }

  #insertStatic(startBit: number, signalLength: number, signalValue: number) {
    getModule().ccall(
      "insert_s",
      null,
      ["number", "number", "number"],
      [startBit, signalLength, signalValue]
    );
  }
}
