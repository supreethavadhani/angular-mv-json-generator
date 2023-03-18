import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordGeneratorComponent } from './record-generator.component';

describe('RecordGeneratorComponent', () => {
  let component: RecordGeneratorComponent;
  let fixture: ComponentFixture<RecordGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecordGeneratorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecordGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
