import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftpaneheaderComponent } from './leftpaneheader.component';

describe('LeftpaneheaderComponent', () => {
  let component: LeftpaneheaderComponent;
  let fixture: ComponentFixture<LeftpaneheaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeftpaneheaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftpaneheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
