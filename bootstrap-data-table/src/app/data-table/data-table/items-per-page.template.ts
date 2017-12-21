export const MODAL_TEMPLATE =
  `
  <div class="modal-header">
      <h4 class="modal-title">Hi there!</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body items-per-page-body">
    <form action="" class="form-horizontal" (ngSubmit)="onSubmit()">
      <div class="form-group row">
        <label class="col-md-4 col-form-label" for="hf-items-per-page">Items Per Page</label>
        <div class="col-md-4">
          <input class="form-control" [(ngModel)]="itemsPerPage"
          id="hf-items-per-page" name="hf-items-per-page" type="number">
        </div>
      </div>
      <div class="form-group form-actions">
        <button class="btn btn-sm btn-primary float-right" type="submit">Submit</button>
      </div>
    </form>
  </div>
    `;
