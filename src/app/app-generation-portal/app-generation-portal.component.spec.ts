import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppGenerationPortalComponent } from './app-generation-portal.component';

describe('AppGenerationPortalComponent', () => {
  let component: AppGenerationPortalComponent;
  let fixture: ComponentFixture<AppGenerationPortalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppGenerationPortalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppGenerationPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
