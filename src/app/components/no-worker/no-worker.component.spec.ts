import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoWorkerComponent } from './no-worker.component';

describe('NoWorkerComponent', () => {
  let component: NoWorkerComponent;
  let fixture: ComponentFixture<NoWorkerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoWorkerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoWorkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
