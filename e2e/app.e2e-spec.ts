import { NgRxjsPage } from './app.po';

describe('ng-rxjs App', () => {
  let page: NgRxjsPage;

  beforeEach(() => {
    page = new NgRxjsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
