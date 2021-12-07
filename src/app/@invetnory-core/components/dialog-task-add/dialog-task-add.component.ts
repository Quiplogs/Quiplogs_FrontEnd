import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ngx-task-add',
  styleUrls: ['dialog-task-add.component.scss'],
  templateUrl: 'dialog-task-add.component.html',
})

export class DialogTaskAddComponent implements OnInit {
  @Input() id: string;

  public task: Task;
  public taskForm: FormGroup;

  constructor(
    protected ref: NbDialogRef<DialogTaskAddComponent>,
    private taskService: TaskService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    if (this.id) {
      this.taskService.get(this.id).subscribe(data => {
        this.task = data;
      });
    }

    this.taskForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
    });
  }

  cancel() {
    this.ref.close();
  }

  submit() {
    this.task = this.taskForm.value;

    if (this.id) {
      this.task.id = this.id;
    }

    this.taskService.put(this.task).subscribe(data => {
      this.ref.close(data.id);
    });

  }
}
