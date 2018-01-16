import { RouterStateSerializer } from '@ngrx/router-store';
import { RouterStateSnapshot } from '@angular/router';

export interface RouterStateTitle {
  title: string;
}

export class CustomRouterStateSerializer
  implements RouterStateSerializer<RouterStateTitle> {
  serialize(routerState: RouterStateSnapshot): RouterStateTitle {
    let childRoute = routerState.root;
    while (childRoute.firstChild) {
      childRoute = childRoute.firstChild;
    }
    // Use the most specific title
    const title = childRoute.data['title'];
    return { title };
  }
}
