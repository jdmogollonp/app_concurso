import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestsAdministrationComponent } from './contests-administration.component';

describe('ContestsAdministrationComponent', () => {
  let component: ContestsAdministrationComponent;
  let fixture: ComponentFixture<ContestsAdministrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContestsAdministrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContestsAdministrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
