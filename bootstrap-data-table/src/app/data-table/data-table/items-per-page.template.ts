export const MODAL_TEMPLATE =
  `
  <div class="modal-header">
      <h4 class="modal-title">Hi there!</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body items-per-page-body">
    <form action="" class="form-horizontal" method="post">
      <div class="form-group row">
        <label class="col-md-3 col-form-label" for="hf-email">Email</label>
        <div class="col-md-9">
          <input class="form-control" id="hf-email" name="hf-email" placeholder="Enter Email.." type="email">
          <span class="help-block">Please enter your email</span>
        </div>
      </div>
      <div class="form-group form-actions">
        <button class="btn btn-sm btn-primary float-right" type="submit">Submit</button>
      </div>
    </form>
  </div>
    `;
