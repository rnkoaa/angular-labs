import { PokedxPage } from './app.po';

describe('pokedx App', () => {
  let page: PokedxPage;

  beforeEach(() => {
    page = new PokedxPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
