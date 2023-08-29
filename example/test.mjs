import fs from "fs";

import { WeCan } from "../dist/index.js";

async function main() {
  await WeCan.initialize();
  const wecan = new WeCan();
  const result = wecan.puzzle([
    {
      startBit: 0,
      signalLength: 2,
      signalValue: 5,
    },
  ]);

  console.log("result : ", result);
}

main();
