import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { FileProcessed } from '../../models/FileProcessed';
import { BlobService } from '../../../@core/services/blob.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'ngx-image-upload',
    styleUrls: ['./image-upload.component.scss'],
    templateUrl: './image-upload.component.html',
})

export class ImageUploadComponent implements OnInit {
    @Input()
    applicationType: string = null;
    @Input()
    companyId: string = null;
    @Input()
    id: string = null;
    private acceptedFileTypes: string;

    imagePreview: any = null;

    @Output()
    fileUploaded: EventEmitter<FileProcessed> = new EventEmitter<FileProcessed>();
    @Output()
    fileRemoved: EventEmitter<boolean> = new EventEmitter<boolean>();

    fileName: string;
    private fileData: File = null;

    public ImageSource: string;
    private fileId: string;

    constructor(
        private ng2ImgMax: Ng2ImgMaxService,
        private blobService: BlobService,
        public sanitizer: DomSanitizer,
    ) { }

    ngOnInit() {
        if (!this.acceptedFileTypes) {
            this.acceptedFileTypes = '.png, .jpg, .jpeg';
        }
        this.fileName = 'Select file';

        if (this.id && this.applicationType) {
            this.blobService.get(this.id, this.applicationType).subscribe(res => {
                this.fileId = res.id;
                this.ImageSource = res.fileUrl;
            });
        }
    }

    public removeImage() {
        if (this.id && this.applicationType) {
            this.blobService.delete(this.id, this.applicationType).subscribe(res => {
                this.ImageSource = null;
            });
        }
    }

    public processFile(fileInput: any) {
        this.fileData = <File>fileInput.target.files[0];

        this.ng2ImgMax.resizeImage(this.fileData, 10000, 500).subscribe(
            result => {
                this.fileName = this.fileData.name;
                this.getImagePreview(new File([result], result.name));
                this.emitProcessedFile();
            },
        );
    }

    private emitProcessedFile() {
        const reader = new FileReader();
        if (this.fileData) {
            reader.readAsDataURL(this.fileData);
            reader.onload = (_event) => {
                this.fileUploaded.emit(new FileProcessed(this.fileData.name, this.fileData.type, reader.result));
            };
        }
    }

    private getImagePreview(file: File) {
        const reader: FileReader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            this.imagePreview = reader.result;
        };
    }
}
