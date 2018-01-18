export class RequestParam {
  sort?: string;
  order?: string;
  page?: number;
  limit?: number;

  constructor(obj: any) {
    if (obj.hasOwnProperty('sort')) {
      this.sort = obj['sort'];
    }
    if (obj.hasOwnProperty('order')) {
      this.sort = obj['order'];
    }
    if (obj.hasOwnProperty('page')) {
      this.page = obj['page'];
    }
    if (obj.hasOwnProperty('limit')) {
      this.limit = obj['limit'];
    }
  }

  getParam(): string {
    let paramString = '';
    if (this.page) {
      paramString += `_page=${this.page}`;
    }

    if (this.limit) {
      if (paramString.length > 0) {
        paramString += `&`;
      }
      paramString += `_limit=${this.limit}`;
    }
    if (this.sort) {
      if (paramString.length > 0) {
        paramString += `&`;
      }
      paramString += `_sort=${this.sort}`;
    }
    if (this.order) {
      if (paramString.length > 0) {
        paramString += `&`;
      }
      paramString += `_order=${this.order}`;
    }
    return paramString;
  }
}
