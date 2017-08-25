import { AngularRoutingPage } from './app.po';

describe('angular-routing App', function() {
  let page: AngularRoutingPage;

  beforeEach(() => {
    page = new AngularRoutingPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
