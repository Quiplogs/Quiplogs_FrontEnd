export class FileProcessed {
    constructor(
        public fileName: string,
        public fileType: string,
        public fileBase64: any,
    ) { }
}
