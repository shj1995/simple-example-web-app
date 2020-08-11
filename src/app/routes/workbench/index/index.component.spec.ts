import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkbenchIndexComponent } from './index.component';

describe('WorkbenchIndexComponent', () => {
  let component: WorkbenchIndexComponent;
  let fixture: ComponentFixture<WorkbenchIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkbenchIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkbenchIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
