"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const child_process_1 = require("child_process");
const vid = core.getInput("vid");
const vkey = core.getInput("vkey");
const path = core.getInput("path");
greet(vid, vkey, path);
function greet(vid, vkey, path) {
    console.log(`'Path :  ${path}'`);
    let curlCommandOutput;
    try {
        process.env.VERACODE_API_KEY_ID = vid;
        process.env.VERACODE_API_KEY_SECRET = vkey;
        curlCommandOutput = (0, child_process_1.execSync)(`curl -fsS https://tools.veracode.com/veracode-cli/install | sh && ./veracode scan --source ${path} --type directory --format table`);
        core.info('---- DEBUG OUTPUT START ----');
        core.info('---- Cli installation ' + curlCommandOutput);
        core.info('---- DEBUG OUTPUT END ----');
    }
    catch (ex) {
        curlCommandOutput = ex.stdout.toString();
    }
}
