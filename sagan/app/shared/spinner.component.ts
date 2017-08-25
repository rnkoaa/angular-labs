import {Component, Input, OnInit } from '@angular/core';

@Component({
    template: `
        <div *ngIf="visible" class="spinner-loading">
            <i class="fa fa-spinner fa-spin fa-3x"></i>
        </div>
    `,
    selector: 'spinner',
    styles: [
        `.spinner-loading {
            padding: 15px;
        }`,
        `.spinner-loading i {
            color: #2c3e50;
        }
        `
    ]
})
export class SpinnerComponent{
    @Input() visible: boolean;
}