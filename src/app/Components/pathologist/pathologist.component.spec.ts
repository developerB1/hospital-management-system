import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PathologistComponent } from './pathologist.component';

describe('PathologistComponent', () => {
  let component: PathologistComponent;
  let fixture: ComponentFixture<PathologistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PathologistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PathologistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
