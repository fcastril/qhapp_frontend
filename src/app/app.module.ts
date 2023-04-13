import { BrowserModule } from "@angular/platform-browser";
import { NgModule, LOCALE_ID } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";

import { LayoutModule } from "./views/layout/layout.module";
import { AuthGuard } from "./core/guard/auth.guard";

import { AppComponent } from "./app.component";
import { ErrorPageComponent } from "./views/pages/error-page/error-page.component";

import { HIGHLIGHT_OPTIONS } from "ngx-highlightjs";

// Cambio de región
import { registerLocaleData, DatePipe } from "@angular/common";
import localEs from "@angular/common/locales/es-CO";
registerLocaleData(localEs);

// Calendario
import { FullCalendarModule } from "@fullcalendar/angular";

// Editor
// import { NgxEditorModule } from 'ngx-editor';
// import { CKEditorModule } from 'ng2-ckeditor';
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";

// FullCalendarModule.registerPlugins([ // register FullCalendar plugins
//   dayGridPlugin,
//   interactionPlugin
// ]);

// Graficos
import { ChartsModule } from "ng2-charts";

// Select2
import { Select2Module } from "ng-select2-component";

// Tablas de datos
import { DataTablesModule } from "angular-datatables";

import { HttpClientModule } from "@angular/common/http";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatTabsModule } from "@angular/material/tabs"; // Con el MatTabsModule se hace la invcacion para poder utilizar los tabs de materials
import { MatCheckboxModule } from "@angular/material/checkbox";

import { BoolTOstringPipe } from "./pipes/bool-tostring.pipe";
import { ColorPickerModule } from "ngx-color-picker";

import { TypesDocumentsComponent } from "./components/types-documents/types-documents.component";
import { TypeDocumentComponent } from "./components/types-documents/type-document.component";
import { GendersComponent } from "./components/genders/genders.component";
import { GenderComponent } from "./components/genders/gender.component";
import { CivilStatusesComponent } from "./components/civil-statuses/civil-statuses.component";
import { CivilStatusComponent } from "./components/civil-statuses/civil-status.component";
import { CitiesComponent } from "./components/cities/cities.component";
import { CityComponent } from "./components/cities/city.component";
import { TypesConnectionsComponent } from "./components/types-connections/types-connections.component";
import { TypeConnectionComponent } from "./components/types-connections/type-connection.component";
import { CausesComponent } from "./components/causes/causes.component";
import { CauseComponent } from "./components/causes/cause.component";
import { RelationsShipsComponent } from "./components/relations-ships/relations-ships.component";
import { RelationShipComponent } from "./components/relations-ships/relation-ship.component";
import { PurposesComponent } from "./components/purposes/purposes.component";
import { PurposeComponent } from "./components/purposes/purpose.component";
import { TypesHearaboutComponent } from "./components/types-hearabout/types-hearabout.component";
import { TypeHearaboutComponent } from "./components/types-hearabout/type-hearabout.component";
import { TypesAccountingsComponent } from "./components/types-accountings/types-accountings.component";
import { TypeAccountingComponent } from "./components/types-accountings/type-accounting.component";
import { TypesTaxpayersComponent } from "./components/types-taxpayers/types-taxpayers.component";
import { TypeTaxpayerComponent } from "./components/types-taxpayers/type-taxpayer.component";
import { TypesProductsComponent } from "./components/types-products/types-products.component";
import { TypeProductComponent } from "./components/types-products/type-product.component";
import { UensComponent } from "./components/uens/uens.component";
import { UenComponent } from "./components/uens/uen.component";
import { TypesPricelistsComponent } from "./components/types-pricelists/types-pricelists.component";
import { TypePricelistComponent } from "./components/types-pricelists/type-pricelist.component";
import { DisciplinesComponent } from "./components/disciplines/disciplines.component";
import { DisciplineComponent } from "./components/disciplines/discipline.component";
import { TypesPaymentsComponent } from "./components/types-payments/types-payments.component";
import { TypePaymentComponent } from "./components/types-payments/type-payment.component";
import { ReasonsMovementsComponent } from "./components/reasons-movements/reasons-movements.component";
import { ReasonMovementComponent } from "./components/reasons-movements/reason-movement.component";
import { InsuranceCompaniesComponent } from "./components/insurance-companies/insurance-companies.component";
import { InsuranceCompanyComponent } from "./components/insurance-companies/insurance-company.component";
import { PatientsComponent } from "./components/patients/patients.component";
import { PatientComponent } from "./components/patients/patient.component";
import { WarehousesComponent } from "./components/warehouses/warehouses.component";
import { WarehouseComponent } from "./components/warehouses/warehouse.component";
import { ReasonsAppointmentsComponent } from "./components/reasons-appointments/reasons-appointments.component";
import { ReasonAppointmentComponent } from "./components/reasons-appointments/reason-appointment.component";
import { ProductsComponent } from "./components/products/products.component";
import { ProductComponent } from "./components/products/product.component";
import { TypesMeasuresComponent } from "./components/types-measures/types-measures.component";
import { TypeMeasureComponent } from "./components/types-measures/type-measure.component";
import { StatusAppointmentsComponent } from "./components/status-appointments/status-appointments.component";
import { StatusAppointmentComponent } from "./components/status-appointments/status-appointment.component";
import { TypesMovementsComponent } from "./components/types-movements/types-movements.component";
import { TypeMovementComponent } from "./components/types-movements/type-movement.component";
import { TypesAgendasComponent } from "./components/types-agendas/types-agendas.component";
import { TypeAgendaComponent } from "./components/types-agendas/type-agenda.component";
import { AppointmentRecordsComponent } from "./components/appointment-records/appointment-records.component";
import { AppointmentRecordComponent } from "./components/appointment-records/appointment-record.component";
import { UsersComponent } from "./components/users/users.component";
import { UserComponent } from "./components/users/user.component";
import { SchedulesComponent } from "./components/schedules/schedules.component";
import { SchedulingComponent } from "./components/schedules/scheduling.component";
import { ListDailyAgendaComponent } from "./components/daily-agenda/list-daily-agenda/list-daily-agenda.component";
import { MedicalHistoriesComponent } from "./components/medical-histories/medical-histories.component";
import { MedicalHistoryComponent } from "./components/medical-histories/medical-history.component";
import { MeasuresControlComponent } from "./components/measures-control/measures-control.component";
import { MeasureControlComponent } from "./components/measures-control/measure-control.component";
import { MedicalHistoryChildComponent } from "./components/medical-histories/medical-history-child.component";
import { ListGeneralAttentionComponent } from "./components/generalattention/list-general-attention/list-general-attention.component";
import { CreateEditGeneralAttentionComponent } from "./components/generalattention/create-edit-general-attention/create-edit-general-attention.component";
import { GraphicsMeasureControlComponent } from "./components/measures-control/graphics-measure-control.component";
import { TreatmentsComponent } from "./components/treatments/treatments.component";
import { TreatmentComponent } from "./components/treatments/treatment.component";
import { MovementEntriesComponent } from "./components/movement-entries/movement-entries.component";
import { DiagnosticsComponent } from "./components/diagnostics/diagnostics.component";
import { DiagnosticComponent } from "./components/diagnostics/diagnostic.component";
import { MovementEntryComponent } from "./components/movement-entries/movement-entry.component";
import { ListPricesComponent } from "./components/list-prices/list-prices.component";
import { ListPriceComponent } from "./components/list-prices/list-price.component";
import { InvoicesComponent } from "./components/invoices/invoices.component";
import { ViewtreatmentdetailComponent } from "./components/treatments/viewtreatmentdetail.component";
import { InvoiceComponent } from "./components/invoices/invoice.component";
import { CreditNotesComponent } from "./components/credit-notes/credit-notes.component";
import { CreditNoteComponent } from "./components/credit-notes/credit-note.component";
import { DebitNotesComponent } from "./components/debit-notes/debit-notes.component";
import { DebitNoteComponent } from "./components/debit-notes/debit-note.component";
import { TreatmentslaserComponent } from "./components/treatments/treatmentslaser/treatmentslaser.component";
import { TreatmentlaserComponent } from "./components/treatments/treatmentslaser/treatmentlaser.component";
import { RecipesComponent } from "./components/recipes/recipes.component";
import { RecipeComponent } from "./components/recipes/recipe.component";
import { ConsentsComponent } from "./components/consents/consents.component";
import { ConsentComponent } from "./components/consents/consent.component";
import { OthersComponent } from "./components/others/others.component";
import { AdverseEventsComponent } from "./components/adverse-events/adverse-events.component";
import { AdverseEventComponent } from "./components/adverse-events/adverse-event.component";
import { ReportProductsComponent } from "./components/reports/report-products/report-products.component";
import { ListNotesComponent } from "./components/notes/list-notes/list-notes.component";
import { CreateEditNotesComponent } from "./components/notes/create-edit-notes/create-edit-notes.component";
import { CreateEditAttachedDocumentComponent } from "./components/Attached-document/create-edit-attached-document/create-edit-attached-document.component";
import { ListAttachedDocumentComponent } from "./components/Attached-document/list-attached-document/list-attached-document.component";
import { ListPhotographicEvolutionComponent } from "./components/photographic-evolution/list-photographic-evolution/list-photographic-evolution.component";
import { CreateEditPhotographicEvolutionComponent } from "./components/photographic-evolution/create-edit-photographic-evolution/create-edit-photographic-evolution.component";
import { ProfilesComponent } from "./components/profiles/profiles.component";
import { ProfileComponent } from "./components/profiles/profile.component";
import { AddNotesComponent } from "./components/addnotes/addnotes.component";
import { AddNoteComponent } from "./components/addnotes/addnote.component";
import { RecipesPatientsComponent } from "./components/recipes-patients/recipes-patients.component";
import { RecipePatientComponent } from "./components/recipes-patients/recipe-patient.component";
import { MedicineComponent } from "./components/dashboards/medicine/medicine.component";
import { BillingComponent } from "./components/dashboards/billing/billing.component";
import { AppointmentComponent } from "./components/dashboards/appointment/appointment.component";
import { InvoicesMedicalHistoryComponent } from "./components/invoices-medical-history/invoices-medical-history.component";
import { PqrsComponent } from "./components/pqrs/pqrs.component";
import { PqrscreateEditComponent } from "./components/pqrs/pqrscreate-edit.component";
import { InitialpageComponent } from "./components/initialpage/initialpage.component";
import { SurveysComponent } from "./components/surveys/surveys.component";
import { SurveyComponent } from "./components/surveys/survey.component";
import { WebcamModule } from "ngx-webcam";
import { ConsentsmedicalComponent } from "./components/consentsmedical/consentsmedical.component";
import { ConsetmedicalComponent } from "./components/consentsmedical/consetmedical.component";
import { SchedulesGeneralComponent } from "./components/schedules-general/schedules-general.component";
import { RecipePatientPrintComponent } from "./components/recipes-patients/recipe-patient-print.component";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { MatCardModule } from "@angular/material/card";
import { NgApexchartsModule } from "ng-apexcharts";
import { SignaturePadModule } from "angular2-signaturepad";
import { InvoiceViewComponent } from './components/invoices/invoice-view/invoice-view.component';
@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent,
    TypesDocumentsComponent,
    TypeDocumentComponent,
    GendersComponent,
    GenderComponent,
    CivilStatusesComponent,
    CivilStatusComponent,
    CitiesComponent,
    CityComponent,
    TypesConnectionsComponent,
    TypeConnectionComponent,
    CausesComponent,
    CauseComponent,
    RelationsShipsComponent,
    RelationShipComponent,
    PurposesComponent,
    PurposeComponent,
    TypesHearaboutComponent,
    TypeHearaboutComponent,
    TypesAccountingsComponent,
    TypeAccountingComponent,
    TypesTaxpayersComponent,
    TypeTaxpayerComponent,
    TypesProductsComponent,
    TypeProductComponent,
    UensComponent,
    UenComponent,
    TypesPricelistsComponent,
    TypePricelistComponent,
    DisciplinesComponent,
    DisciplineComponent,
    TypesPaymentsComponent,
    TypePaymentComponent,
    ReasonsMovementsComponent,
    ReasonMovementComponent,
    InsuranceCompaniesComponent,
    InsuranceCompanyComponent,
    PatientsComponent,
    PatientComponent,
    WarehousesComponent,
    WarehouseComponent,
    ReasonsAppointmentsComponent,
    ReasonAppointmentComponent,
    ProductsComponent,
    ProductComponent,
    TypesMeasuresComponent,
    TypeMeasureComponent,
    StatusAppointmentsComponent,
    StatusAppointmentComponent,
    TypesMovementsComponent,
    TypeMovementComponent,
    TypesAgendasComponent,
    TypeAgendaComponent,
    AppointmentRecordsComponent,
    AppointmentRecordComponent,
    UsersComponent,
    UserComponent,
    SchedulesComponent,
    SchedulingComponent,
    BoolTOstringPipe,
    ListDailyAgendaComponent,
    MedicalHistoriesComponent,
    MedicalHistoryComponent,
    MeasuresControlComponent,
    MeasureControlComponent,
    MedicalHistoryChildComponent,
    ListGeneralAttentionComponent,
    CreateEditGeneralAttentionComponent,
    GraphicsMeasureControlComponent,
    TreatmentsComponent,
    TreatmentComponent,
    MovementEntriesComponent,
    DiagnosticsComponent,
    DiagnosticComponent,
    MovementEntryComponent,
    ListPricesComponent,
    ListPriceComponent,
    InvoicesComponent,
    ViewtreatmentdetailComponent,
    InvoiceComponent,
    CreditNotesComponent,
    CreditNoteComponent,
    DebitNotesComponent,
    DebitNoteComponent,
    TreatmentslaserComponent,
    TreatmentlaserComponent,
    RecipesComponent,
    RecipeComponent,
    ConsentsComponent,
    ConsentComponent,
    OthersComponent,
    AdverseEventsComponent,
    AdverseEventComponent,
    ReportProductsComponent,
    ListNotesComponent,
    CreateEditNotesComponent,
    CreateEditAttachedDocumentComponent,
    ListAttachedDocumentComponent,
    ListPhotographicEvolutionComponent,
    CreateEditPhotographicEvolutionComponent,
    ProfilesComponent,
    ProfileComponent,
    AddNotesComponent,
    AddNoteComponent,
    RecipesPatientsComponent,
    RecipePatientComponent,
    MedicineComponent,
    BillingComponent,
    AppointmentComponent,
    InvoicesMedicalHistoryComponent,
    PqrsComponent,
    PqrscreateEditComponent,
    InitialpageComponent,
    SurveysComponent,
    SurveyComponent,
    ConsentsmedicalComponent,
    ConsetmedicalComponent,
    SchedulesGeneralComponent,
    RecipePatientPrintComponent,
    InvoiceViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    HttpClientModule,
    FormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatTabsModule,
    ColorPickerModule,
    FullCalendarModule,
    NgbModule,
    ChartsModule,
    // NgxEditorModule,
    CKEditorModule,
    Select2Module,
    MatCheckboxModule,
    MatCardModule,
    NgApexchartsModule,
    DataTablesModule,
    WebcamModule,
    SignaturePadModule,
  ],
  providers: [
    AuthGuard,
    {
      provide: HIGHLIGHT_OPTIONS, // https://www.npmjs.com/package/ngx-highlightjs
      useValue: {
        coreLibraryLoader: () => import("highlight.js/lib/core"),
        languages: {
          xml: () => import("highlight.js/lib/languages/xml"),
          typescript: () => import("highlight.js/lib/languages/typescript"),
          scss: () => import("highlight.js/lib/languages/scss"),
        },
      },
    },
    {
      provide: LOCALE_ID,
      useValue: "es-CO",
    },
    DatePipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
