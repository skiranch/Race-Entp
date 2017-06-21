import { DndpocPage } from './app.po';

describe('dndpoc App', () => {
  let page: DndpocPage;

  beforeEach(() => {
    page = new DndpocPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
