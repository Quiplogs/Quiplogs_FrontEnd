import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-dialog-delete',
  templateUrl: 'dialog-delete.component.html',
  styleUrls: ['dialog-delete.component.scss'],
})
export class DialogDeleteComponent {

  @Input() type: string;
  @Input() name: string;
  @Input() id: string;

  constructor(protected ref: NbDialogRef<DialogDeleteComponent>) { }

  cancel() {
    this.ref.close();
  }

  submit(id) {
    this.ref.close(id);
  }
}
