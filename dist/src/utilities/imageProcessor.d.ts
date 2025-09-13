declare function checkFile(fileName: string): string | null;
declare function processImage(
  filePath: string,
  filename: string,
  width: number,
  height: number,
  blackAndWhiteEffect: boolean
): Promise<string>;
export { checkFile, processImage };
//# sourceMappingURL=imageProcessor.d.ts.map
