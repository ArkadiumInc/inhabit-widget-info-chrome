import { InhabitWidgetInfoChromePage } from './app.po';

describe('inhabit-widget-info-chrome App', function() {
  let page: InhabitWidgetInfoChromePage;

  beforeEach(() => {
    page = new InhabitWidgetInfoChromePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
