import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevicepageComponent } from './devicepage.component';

describe('DevicepageComponent', () => {
  let component: DevicepageComponent;
  let fixture: ComponentFixture<DevicepageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevicepageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevicepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
