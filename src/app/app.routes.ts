import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { WebsComponent } from './components/pages/services/webs/webs.component';
import { InmobiliariaComponent } from './components/pages/services/webs/video/inmobiliaria/inmobiliaria.component';
import { TurismoComponent } from './components/pages/services/webs/video/turismo/turismo.component';
import { ComponentesComponent } from './components/pages/services/componentes/componentes.component';
import { PortfolioComponent } from './components/pages/portfolio/portfolio.component';
import { BlogComponent } from './components/pages/blog/blog.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { PrivacyPolicyComponent } from './components/pages/privacy-policy/privacy-policy.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { MemorialComponent } from './components/pages/memorial/memorial.component';
import { MemorialListComponent } from './components/memorial/memorial-list/memorial-list.component';
import { MemorialCreateComponent } from './components/memorial/memorial-create/memorial-create.component';
import { MemorialDetailComponent } from './components/memorial/memorial-detail/memorial-detail.component';
import { MemorialEditComponent } from './components/memorial/memorial-edit/memorial-edit.component';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'memorial', component: MemorialComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'services/webs', component: WebsComponent },
  { path: 'services/video/inmobiliaria', component: InmobiliariaComponent },
  { path: 'services/video/turismo', component: TurismoComponent },
  { path: 'services/componentes', component: ComponentesComponent },
  { path: 'portfolio', component: PortfolioComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'memorials', component: MemorialListComponent },
  { path: 'memorial/create', component: MemorialCreateComponent },
  { path: 'memorial/:id', component: MemorialDetailComponent },
  { path: 'memorial/edit/:id', component: MemorialEditComponent },
  { path: '**', redirectTo: '' }
];