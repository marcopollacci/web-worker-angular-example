import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoolWorkerComponent } from './pool-worker.component';

describe('PoolWorkerComponent', () => {
  let component: PoolWorkerComponent;
  let fixture: ComponentFixture<PoolWorkerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PoolWorkerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoolWorkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
