import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormGeneratorComponent } from './form-generator/form-generator.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileService } from './services/fileService/file-service.service';
import { HttpClientModule } from '@angular/common/http';
import { JsonParserService } from './services/jsonParserService/jsonParser.service';
import { MatSelectModule } from '@angular/material/select';
import { RecordGeneratorComponent } from './record-generator/record-generator.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { TemplateGeneratorComponent } from './template-generator/template-generator.component';
import { PageGeneratorComponent } from './page-generator/page-generator.component'

@NgModule({
  declarations: [
    AppComponent,
    FormGeneratorComponent,
    RecordGeneratorComponent,
    TemplateGeneratorComponent,
    PageGeneratorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    NgbModule,
    MatInputModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSelectModule,
    MatCheckboxModule,
    FormsModule,
    MatAutocompleteModule
  ],
  providers: [FileService, JsonParserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
