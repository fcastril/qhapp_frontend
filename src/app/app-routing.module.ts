import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseComponent } from './views/layout/base/base.component';
import { AuthGuard } from './core/guard/auth.guard';
import { ErrorPageComponent } from './views/pages/error-page/error-page.component';
import { TypesDocumentsComponent } from './components/types-documents/types-documents.component';
import { TypeDocumentComponent } from './components/types-documents/type-document.component';
import { GendersComponent } from './components/genders/genders.component';
import { GenderComponent } from './components/genders/gender.component';
import { CivilStatusesComponent } from './components/civil-statuses/civil-statuses.component';
import { CivilStatusComponent } from './components/civil-statuses/civil-status.component';
import { CitiesComponent } from './components/cities/cities.component';
import { CityComponent } from './components/cities/city.component';
import { TypesConnectionsComponent } from './components/types-connections/types-connections.component';
import { TypeConnectionComponent } from './components/types-connections/type-connection.component';
import { CauseComponent } from './components/causes/cause.component';
import { CausesComponent } from './components/causes/causes.component';
import { RelationsShipsComponent } from './components/relations-ships/relations-ships.component';
import { RelationShipComponent } from './components/relations-ships/relation-ship.component';
import { PurposesComponent } from './components/purposes/purposes.component';
import { PurposeComponent } from './components/purposes/purpose.component';
import { TypesHearaboutComponent } from './components/types-hearabout/types-hearabout.component';
import { TypeHearaboutComponent } from './components/types-hearabout/type-hearabout.component';
import { TypesAccountingsComponent } from './components/types-accountings/types-accountings.component';
import { TypeAccountingComponent } from './components/types-accountings/type-accounting.component';
import { TypesTaxpayersComponent } from './components/types-taxpayers/types-taxpayers.component';
import { TypeTaxpayerComponent } from './components/types-taxpayers/type-taxpayer.component';
import { TypesProductsComponent } from './components/types-products/types-products.component';
import { TypeProductComponent } from './components/types-products/type-product.component';
import { UensComponent } from './components/uens/uens.component';
import { UenComponent } from './components/uens/uen.component';
import { TypesPricelistsComponent } from './components/types-pricelists/types-pricelists.component';
import { TypePricelistComponent } from './components/types-pricelists/type-pricelist.component';
import { DisciplinesComponent } from './components/disciplines/disciplines.component';
import { DisciplineComponent } from './components/disciplines/discipline.component';
import { TypesPaymentsComponent } from './components/types-payments/types-payments.component';
import { TypePaymentComponent } from './components/types-payments/type-payment.component';
import { ReasonsMovementsComponent } from './components/reasons-movements/reasons-movements.component';
import { ReasonMovementComponent } from './components/reasons-movements/reason-movement.component';
import { InsuranceCompaniesComponent } from './components/insurance-companies/insurance-companies.component';
import { InsuranceCompanyComponent } from './components/insurance-companies/insurance-company.component';
import { PatientComponent } from './components/patients/patient.component';
import { PatientsComponent } from './components/patients/patients.component';
import { WarehousesComponent } from './components/warehouses/warehouses.component';
import { WarehouseComponent } from './components/warehouses/warehouse.component';
import { ReasonsAppointmentsComponent } from './components/reasons-appointments/reasons-appointments.component';
import { ReasonAppointmentComponent } from './components/reasons-appointments/reason-appointment.component';
import { ProductComponent } from './components/products/product.component';
import { ProductsComponent } from './components/products/products.component';
import { TypeMeasureComponent } from './components/types-measures/type-measure.component';
import { TypesMeasuresComponent } from './components/types-measures/types-measures.component';
import { StatusAppointmentsComponent } from './components/status-appointments/status-appointments.component';
import { StatusAppointmentComponent } from './components/status-appointments/status-appointment.component';
import { TypesMovementsComponent } from './components/types-movements/types-movements.component';
import { TypeMovementComponent } from './components/types-movements/type-movement.component';
import { TypesAgendasComponent } from './components/types-agendas/types-agendas.component';
import { TypeAgendaComponent } from './components/types-agendas/type-agenda.component';
import { AppointmentRecordsComponent } from './components/appointment-records/appointment-records.component';
import { AppointmentRecordComponent } from './components/appointment-records/appointment-record.component';
import { UsersComponent } from './components/users/users.component';
import { UserComponent } from './components/users/user.component';
import { SchedulesComponent } from './components/schedules/schedules.component';
import { SchedulingComponent } from './components/schedules/scheduling.component';
import { ListDailyAgendaComponent } from './components/daily-agenda/list-daily-agenda/list-daily-agenda.component';
import { MedicalHistoriesComponent } from './components/medical-histories/medical-histories.component';
import { MedicalHistoryComponent } from './components/medical-histories/medical-history.component';
import { MedicalHistoryChildComponent } from './components/medical-histories/medical-history-child.component';
import { MeasuresControlComponent } from './components/measures-control/measures-control.component';
import { MeasureControlComponent } from './components/measures-control/measure-control.component';
import { ListGeneralAttentionComponent } from './components/generalattention/list-general-attention/list-general-attention.component';
import { GraphicsMeasureControlComponent } from './components/measures-control/graphics-measure-control.component';
import { TreatmentsComponent } from './components/treatments/treatments.component';
import { TreatmentComponent } from './components/treatments/treatment.component';
import { MovementEntriesComponent } from './components/movement-entries/movement-entries.component';
import { MovementEntryComponent } from './components/movement-entries/movement-entry.component';
import { DiagnosticsComponent } from './components/diagnostics/diagnostics.component';
import { DiagnosticComponent } from './components/diagnostics/diagnostic.component';
import { ListPricesComponent } from './components/list-prices/list-prices.component';
import { ListPriceComponent } from './components/list-prices/list-price.component';
import { InvoicesComponent } from './components/invoices/invoices.component';
import { ViewtreatmentdetailComponent } from './components/treatments/viewtreatmentdetail.component';
import { InvoiceComponent } from './components/invoices/invoice.component';
import { CreateEditGeneralAttentionComponent } from './components/generalattention/create-edit-general-attention/create-edit-general-attention.component';
import { CreditNotesComponent } from './components/credit-notes/credit-notes.component';
import { CreditNoteComponent } from './components/credit-notes/credit-note.component';
import { DebitNoteComponent } from './components/debit-notes/debit-note.component';
import { DebitNotesComponent } from './components/debit-notes/debit-notes.component';
import { TreatmentslaserComponent } from './components/treatments/treatmentslaser/treatmentslaser.component';
import { TreatmentlaserComponent } from './components/treatments/treatmentslaser/treatmentlaser.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { RecipeComponent } from './components/recipes/recipe.component';
import { ConsentsComponent } from './components/consents/consents.component';
import { ConsentComponent } from './components/consents/consent.component';
import { OthersComponent } from './components/others/others.component';
import { AdverseEventsComponent } from './components/adverse-events/adverse-events.component';
import { AdverseEventComponent } from './components/adverse-events/adverse-event.component';
import { ReportProductsComponent } from './components/reports/report-products/report-products.component';
import { ListNotesComponent } from './components/notes/list-notes/list-notes.component';
import { CreateEditNotesComponent } from './components/notes/create-edit-notes/create-edit-notes.component';
import { ListAttachedDocumentComponent } from './components/Attached-document/list-attached-document/list-attached-document.component';
import { CreateEditAttachedDocumentComponent } from './components/Attached-document/create-edit-attached-document/create-edit-attached-document.component';
import { ListPhotographicEvolutionComponent } from './components/photographic-evolution/list-photographic-evolution/list-photographic-evolution.component';
import { CreateEditPhotographicEvolutionComponent } from './components/photographic-evolution/create-edit-photographic-evolution/create-edit-photographic-evolution.component';
import { ProfileComponent } from './components/profiles/profile.component';
import { ProfilesComponent } from './components/profiles/profiles.component';
import { AddNotesComponent } from './components/addnotes/addnotes.component';
import { AddNoteComponent } from './components/addnotes/addnote.component';
import { RecipesPatientsComponent } from './components/recipes-patients/recipes-patients.component';
import { RecipePatientComponent } from './components/recipes-patients/recipe-patient.component';
import { MedicineComponent } from './components/dashboards/medicine/medicine.component';
import { BillingComponent } from './components/dashboards/billing/billing.component';
import { AppointmentComponent } from './components/dashboards/appointment/appointment.component';
import { InvoicesMedicalHistoryComponent } from './components/invoices-medical-history/invoices-medical-history.component';
import { PqrsComponent } from './components/pqrs/pqrs.component';
import { PqrscreateEditComponent } from './components/pqrs/pqrscreate-edit.component';
import { InitialpageComponent } from './components/initialpage/initialpage.component';
import { SurveyComponent } from './components/surveys/survey.component';
import { SurveysComponent } from './components/surveys/surveys.component';
import { ConsentsmedicalComponent } from './components/consentsmedical/consentsmedical.component';
import { ConsetmedicalComponent } from './components/consentsmedical/consetmedical.component';
import { SchedulesGeneralComponent } from './components/schedules-general/schedules-general.component';
import { RecipePatientPrintComponent } from './components/recipes-patients/recipe-patient-print.component';

const routes: Routes = [
  { path: 'initialpatient/:id',component: PatientComponent},
  { path: 'inititalgeneral-attention/:id',component: CreateEditGeneralAttentionComponent},
  { path: 'initialpage',component: InitialpageComponent},
  { path: 'initialpqrs/:id',component: PqrscreateEditComponent},
  { path: 'initialsurvey/:id',component: SurveyComponent},

  { path:'auth', loadChildren: () => import('./views/pages/auth/auth.module').then(m => m.AuthModule) },
  {
    path: '',
    component: BaseComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./views/pages/dashboard/dashboard.module').then(m => m.DashboardModule),
      },
      {
        path: 'apps',
        loadChildren: () => import('./views/pages/apps/apps.module').then(m => m.AppsModule)
      },
      {
        path: 'ui-components',
        loadChildren: () => import('./views/pages/ui-components/ui-components.module').then(m => m.UiComponentsModule)
      },
      {
        path: 'advanced-ui',
        loadChildren: () => import('./views/pages/advanced-ui/advanced-ui.module').then(m => m.AdvancedUiModule)
      },
      {
        path: 'form-elements',
        loadChildren: () => import('./views/pages/form-elements/form-elements.module').then(m => m.FormElementsModule)
      },
      {
        path: 'advanced-form-elements',
        // tslint:disable-next-line: max-line-length
        loadChildren: () => import('./views/pages/advanced-form-elements/advanced-form-elements.module').then(m => m.AdvancedFormElementsModule)
      },
      {
        path: 'charts-graphs',
        loadChildren: () => import('./views/pages/charts-graphs/charts-graphs.module').then(m => m.ChartsGraphsModule)
      },
      {
        path: 'tables',
        loadChildren: () => import('./views/pages/tables/tables.module').then(m => m.TablesModule)
      },
      {
        path: 'icons',
        loadChildren: () => import('./views/pages/icons/icons.module').then(m => m.IconsModule)
      },
      {
        path: 'general',
        loadChildren: () => import('./views/pages/general/general.module').then(m => m.GeneralModule)
      },
      { path: '', redirectTo: 'patients', pathMatch: 'full' },
      { path: 'types-documents',component: TypesDocumentsComponent, canActivate: [AuthGuard],},
      { path: 'type-document/:id',component: TypeDocumentComponent, canActivate: [AuthGuard],},
      { path: 'genders',component: GendersComponent, canActivate: [AuthGuard],},
      { path: 'gender/:id',component: GenderComponent, canActivate: [AuthGuard],},
      { path: 'civil-statuses',component: CivilStatusesComponent, canActivate: [AuthGuard],},
      { path: 'civil-status/:id',component: CivilStatusComponent, canActivate: [AuthGuard],},
      { path: 'cities',component: CitiesComponent,canActivate: [AuthGuard],},
      { path: 'city/:id',component: CityComponent, canActivate: [AuthGuard],},
      { path: 'types-connections',component: TypesConnectionsComponent,canActivate: [AuthGuard]},
      { path: 'type-connection/:id',component: TypeConnectionComponent,canActivate: [AuthGuard]},
      { path: 'causes',component: CausesComponent,canActivate: [AuthGuard]},
      { path: 'cause/:id',component: CauseComponent,canActivate: [AuthGuard]},
      { path: 'relations-ships',component: RelationsShipsComponent,canActivate: [AuthGuard]},
      { path: 'relation-ship/:id',component: RelationShipComponent,canActivate: [AuthGuard]},
      { path: 'purposes',component: PurposesComponent,canActivate: [AuthGuard]},
      { path: 'purpose/:id',component: PurposeComponent,canActivate: [AuthGuard]},
      { path: 'types-hearabout',component: TypesHearaboutComponent,canActivate: [AuthGuard]},
      { path: 'type-hearabout/:id',component: TypeHearaboutComponent,canActivate: [AuthGuard]},
      { path: 'types-accountings',component: TypesAccountingsComponent,canActivate: [AuthGuard]},
      { path: 'type-accounting/:id',component: TypeAccountingComponent,canActivate: [AuthGuard]},
      { path: 'types-taxpayers',component: TypesTaxpayersComponent,canActivate: [AuthGuard]},
      { path: 'type-taxpayer/:id',component: TypeTaxpayerComponent,canActivate: [AuthGuard]},
      { path: 'types-products',component: TypesProductsComponent,canActivate: [AuthGuard]},
      { path: 'type-product/:id',component: TypeProductComponent,canActivate: [AuthGuard]},
      { path: 'uens',component: UensComponent,canActivate: [AuthGuard]},
      { path: 'uen/:id',component: UenComponent,canActivate: [AuthGuard]},
      { path: 'types-pricelists',component: TypesPricelistsComponent,canActivate: [AuthGuard]},
      { path: 'type-pricelist/:id',component: TypePricelistComponent,canActivate: [AuthGuard]},
      { path: 'disciplines',component: DisciplinesComponent,canActivate: [AuthGuard]},
      { path: 'discipline/:id',component: DisciplineComponent,canActivate: [AuthGuard]},
      { path: 'types-payments',component: TypesPaymentsComponent,canActivate: [AuthGuard]},
      { path: 'type-payment/:id',component: TypePaymentComponent,canActivate: [AuthGuard]},
      { path: 'reasons-movements',component: ReasonsMovementsComponent,canActivate: [AuthGuard]},
      { path: 'reason-movement/:id',component: ReasonMovementComponent,canActivate: [AuthGuard]},
      { path: 'insurance-companies',component: InsuranceCompaniesComponent,canActivate: [AuthGuard]},
      { path: 'insurance-company/:id',component: InsuranceCompanyComponent,canActivate: [AuthGuard]},
      { path: 'patients',component: PatientsComponent,canActivate: [AuthGuard]},
      { path: 'patient/:id',component: PatientComponent,canActivate: [AuthGuard]},
      { path: 'warehouses',component: WarehousesComponent,canActivate: [AuthGuard]},
      { path: 'warehouse/:id',component: WarehouseComponent,canActivate: [AuthGuard]},
      { path: 'reasons-appointments',component: ReasonsAppointmentsComponent,canActivate: [AuthGuard]},
      { path: 'reason-appointment/:id',component: ReasonAppointmentComponent,canActivate: [AuthGuard]},
      { path: 'products',component: ProductsComponent,canActivate: [AuthGuard]},
      { path: 'product/:id',component: ProductComponent,canActivate: [AuthGuard]},
      { path: 'types-measures',component: TypesMeasuresComponent,canActivate: [AuthGuard]},
      { path: 'type-measure/:id',component: TypeMeasureComponent,canActivate: [AuthGuard]},
      { path: 'status-appointments',component: StatusAppointmentsComponent,canActivate: [AuthGuard]},
      { path: 'status-appointment/:id',component: StatusAppointmentComponent,canActivate: [AuthGuard]},
      { path: 'types-movements',component: TypesMovementsComponent,canActivate: [AuthGuard]},
      { path: 'type-movement/:id',component: TypeMovementComponent,canActivate: [AuthGuard]},
      { path: 'types-agendas',component: TypesAgendasComponent,canActivate: [AuthGuard]},
      { path: 'type-agenda/:id',component: TypeAgendaComponent,canActivate: [AuthGuard]},
      { path: 'appointment-records',component: AppointmentRecordsComponent,canActivate: [AuthGuard]},
      { path: 'appointment-record/:id/:date/:typeAgenda',component: AppointmentRecordComponent,canActivate: [AuthGuard]},
      { path: 'users',component: UsersComponent,canActivate: [AuthGuard]},
      { path: 'user/:id',component: UserComponent,canActivate: [AuthGuard]},
      { path: 'schedules-general',component: SchedulesGeneralComponent,canActivate: [AuthGuard]},
      { path: 'schedules/:id',component: SchedulesComponent,canActivate: [AuthGuard]},
      { path: 'scheduling/:id',component: SchedulingComponent,canActivate: [AuthGuard]},
      { path: 'daily-agenda',component: ListDailyAgendaComponent,canActivate: [AuthGuard]},
      { path: 'medical-histories',component: MedicalHistoriesComponent,canActivate: [AuthGuard]},
      { path: 'general-attention',component: ListGeneralAttentionComponent,canActivate: [AuthGuard]},
      { path: 'general-attention/:id',component: CreateEditGeneralAttentionComponent,canActivate: [AuthGuard]},
      { path: 'surveys',component: SurveysComponent,canActivate: [AuthGuard]},
      { path: 'survey/:id',component: SurveyComponent,canActivate: [AuthGuard]},
      { path: 'medical-history/:id',
        component: MedicalHistoryComponent,canActivate: [AuthGuard],
        children: [
          { path: 'medical-history',component: MedicalHistoryChildComponent},
          { path: 'measures-control',component: MeasuresControlComponent},
          { path: 'measure-control/:id',component: MeasureControlComponent},
          { path: 'graphics-measure-control/:id',component: GraphicsMeasureControlComponent},
          { path: 'treatments',component: TreatmentsComponent},
          { path: 'treatment/:id',component: TreatmentComponent},
          { path: 'view-details-treatment/:id',component: ViewtreatmentdetailComponent},
          { path: 'treatments-laser/:id',component: TreatmentslaserComponent},
          { path: 'treatment-laser/:id',component: TreatmentlaserComponent},
          { path: 'general-attention',component: ListGeneralAttentionComponent},
          { path: 'general-attention/:id',component: CreateEditGeneralAttentionComponent},
          { path: 'recipes-patients',component: RecipesPatientsComponent},
          { path: 'recipe-patient/:id',component: RecipePatientComponent},
          { path: 'recipe-patient-print/:id',component: RecipePatientPrintComponent},
          { path: 'others',
            component: OthersComponent,canActivate: [AuthGuard],
            children:[
              { path: 'adverse-events',component: AdverseEventsComponent},
              { path: 'adverse-event/:id',component: AdverseEventComponent},
              { path: 'notes',component: ListNotesComponent},
              { path: 'notes/:id',component: CreateEditNotesComponent},
              { path: 'attached-document',component: ListAttachedDocumentComponent},
              { path: 'attached-document/:id',component: CreateEditAttachedDocumentComponent},
              { path: 'photographic-evolution',component: ListPhotographicEvolutionComponent},
              { path: 'photographic-evolution/:id',component: CreateEditPhotographicEvolutionComponent},
              { path: 'invoices-medical-history',component: InvoicesMedicalHistoryComponent},
              { path: 'consents-medical',component: ConsentsmedicalComponent},
              { path: 'consent-medical/:id',component: ConsetmedicalComponent},

            ]
          },
          { path: '**', pathMatch: 'full', redirectTo: 'medical-history' }
        ]
      },
      { path: 'movements-entry', component: MovementEntriesComponent,canActivate: [AuthGuard]},
      { path: 'movements-entry/:id', component: MovementEntryComponent,canActivate: [AuthGuard]},
      { path: 'diagnostics',component: DiagnosticsComponent,canActivate: [AuthGuard]},
      { path: 'diagnostic/:id',component: DiagnosticComponent,canActivate: [AuthGuard]},
      { path: 'list-price',component: ListPricesComponent,canActivate: [AuthGuard]},
      { path: 'list-price/:id',component: ListPriceComponent,canActivate: [AuthGuard]},
      { path: 'invoices',component: InvoicesComponent,canActivate: [AuthGuard]},
      { path: 'invoices/:id', component: InvoiceComponent,canActivate: [AuthGuard]},
      { path: 'credit-notes',component: CreditNotesComponent,canActivate: [AuthGuard]},
      { path: 'credit-notes/:id', component: CreditNoteComponent,canActivate: [AuthGuard]},
      { path: 'debit-notes',component: DebitNotesComponent,canActivate: [AuthGuard]},
      { path: 'debit-notes/:id', component: DebitNoteComponent,canActivate: [AuthGuard]},
      { path: 'recipes',component: RecipesComponent,canActivate: [AuthGuard]},
      { path: 'recipes/:id', component: RecipeComponent,canActivate: [AuthGuard]},
      { path: 'consents',component: ConsentsComponent,canActivate: [AuthGuard]},
      { path: 'consents/:id', component: ConsentComponent,canActivate: [AuthGuard]},
      { path: 'report-products', component: ReportProductsComponent,canActivate: [AuthGuard]},
      { path: 'profiles',component: ProfilesComponent,canActivate: [AuthGuard]},
      { path: 'profiles/:id', component: ProfileComponent,canActivate: [AuthGuard]},
      { path: 'addnotes',component: AddNotesComponent,canActivate: [AuthGuard]},
      { path: 'addnote/:id', component: AddNoteComponent,canActivate: [AuthGuard]},
      { path: 'dash-medicine',component: MedicineComponent,canActivate: [AuthGuard]},
      { path: 'dash-billing',component: BillingComponent,canActivate: [AuthGuard]},
      { path: 'dash-appointment',component: AppointmentComponent,canActivate: [AuthGuard]},
      { path: 'pqrs',component: PqrsComponent,canActivate: [AuthGuard]},
      { path: 'pqrs/:id',component: PqrscreateEditComponent,canActivate: [AuthGuard]},
      { path: 'pqrs',component: PqrsComponent,canActivate: [AuthGuard]},
      { path: 'pqrs/:id',component: PqrscreateEditComponent,canActivate: [AuthGuard]},
      // { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  {
    path: 'error',
    component: ErrorPageComponent,
    data: {
      'type': 404,
      'title': 'Page Not Found',
      'desc': 'Oopps!! The page you were looking for doesn\'t exist.'
    }
  },
  {
    path: 'error/:type',
    component: ErrorPageComponent
  },
  { path: '**', redirectTo: 'error', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top', useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
