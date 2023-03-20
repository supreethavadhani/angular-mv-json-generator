import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageGeneratorComponent } from './page-generator.component';

describe('PageGeneratorComponent', () => {
  let component: PageGeneratorComponent;
  let fixture: ComponentFixture<PageGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageGeneratorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
