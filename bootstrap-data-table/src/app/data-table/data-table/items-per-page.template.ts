export const MODAL_TEMPLATE =
  `<div class="modal-header">
      <h3 class="modal-title">Change Items Per Page</h3>
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
        <button class="btn btn-sm btn-primary float-left" type="submit">Submit</button>
      </div>
    </form>
  </div>`;

export const SEARCH_TEMPLATE = `
  <div class="form-group row">
    <label for="colFormLabelSm" class="col-auto col-form-label col-form-label-md">Filter:</label>
    <!--<div class="col-sm-8">
      <input type="text" class="form-control form-control-sm" id="colFormLabelSm" placeholder="col-form-label-sm">
    </div>-->
    <div class="input-group col-md-7">
      <div class="input-group-addon">
        <i class="fa fa-search"></i>
      </div>
      <input (keyup)="searchTerm$.next($event.target.value)" type="text" class="form-control form-control-md" id="colFormLabelSm" placeholder="col-form-label-sm">
    </div>
  </div>`;

export const ENTRIES_TEMPLATE = `
<div class="float-right">
  <span>Show &nbsp;</span>
  <select name="dt-entries-select" class="form-control input-sm dt-entries">
    <option value="10">10</option>
    <option value="25">25</option>
    <option value="50">50</option>
    <option value="100">100</option>
  </select>
  <span>&nbsp; Entries</span>
</div>`;
