/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SemanticTaxonomyExplanatorComponent } from './semantic-taxonomy-explanator.component';

describe('SemanticTaxonomyExplanatorComponent', () => {
  let component: SemanticTaxonomyExplanatorComponent;
  let fixture: ComponentFixture<SemanticTaxonomyExplanatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SemanticTaxonomyExplanatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SemanticTaxonomyExplanatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
