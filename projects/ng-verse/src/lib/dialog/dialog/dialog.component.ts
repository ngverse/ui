import { DIALOG_DATA, DialogConfig } from '@angular/cdk/dialog';
import {
  ComponentType,
} from '@angular/cdk/portal';
import { Component, inject, OnInit, viewChild, ViewContainerRef } from '@angular/core';
import { DialogCloseIconComponent } from '../dialog-close-icon.component';
import { DialogCloseDirective } from '../dialog-close.directive';

export interface DialogOptions
  extends Pick<DialogConfig, 'disableClose' | 'hasBackdrop'> {
  component: ComponentType<unknown>;
  title?: string;
  showClose?: boolean;
}

@Component({
  selector: 'app-dialog',
  imports: [DialogCloseIconComponent, DialogCloseDirective],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogComponent implements OnInit {
  dialogData = inject<DialogOptions>(DIALOG_DATA);
  dialogContent = viewChild.required('dialogContent', { read: ViewContainerRef });

  get showClose() {
    return this.dialogData.showClose;
  }

  get title() {
    return this.dialogData.title;
  }

  ngOnInit() {
    this.createComponent(this.dialogData.component)
  }

  private createComponent(component: ComponentType<unknown>) {
    this.dialogContent().clear();
    return this.dialogContent().createComponent(component);
  }
}
