import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentsmodalMenuComponent } from './componentsmodal-menu.component';

describe('ComponentsmodalMenuComponent', () => {
  let component: ComponentsmodalMenuComponent;
  let fixture: ComponentFixture<ComponentsmodalMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponentsmodalMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentsmodalMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
