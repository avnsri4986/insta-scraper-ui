import { VeedhanshPage } from './app.po';

describe('veedhansh App', () => {
  let page: VeedhanshPage;

  beforeEach(() => {
    page = new VeedhanshPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
