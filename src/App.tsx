import {AppShell} from './components/AppShell';
import {AppStateProvider, useAppState} from './state/AppStateContext';
import {CaregiverSupportView} from './views/CaregiverSupportView';
import {ChildProfileView} from './views/ChildProfileView';
import {CurationView} from './views/CurationView';
import {HomeView} from './views/HomeView';
import {LibraryView} from './views/LibraryView';
import {MyNetworkView} from './views/MyNetworkView';
import {ProfessionalView} from './views/ProfessionalView';
import {ResourcesView} from './views/ResourcesView';
import {RoutineAgendaDiaryView} from './views/RoutineAgendaDiaryView';
import {SchoolView} from './views/SchoolView';
import {StudyFeaturesView} from './views/StudyFeaturesView';

function RouteContent() {
  const {route} = useAppState();

  switch (route) {
    case 'inicio':
      return <HomeView />;
    case 'acolhimento':
      return <CaregiverSupportView />;
    case 'cadastro':
      return <ChildProfileView />;
    case 'rotina-agenda':
      return <RoutineAgendaDiaryView />;
    case 'recursos':
      return <ResourcesView />;
    case 'biblioteca':
      return <LibraryView />;
    case 'minha-rede':
      return <MyNetworkView />;
    case 'em-estudo':
      return <StudyFeaturesView />;
    case 'profissional':
      return <ProfessionalView />;
    case 'escola':
      return <SchoolView />;
    case 'curadoria':
      return <CurationView />;
    default:
      return <HomeView />;
  }
}

export default function App() {
  return (
    <AppStateProvider>
      <AppShell>
        <RouteContent />
      </AppShell>
    </AppStateProvider>
  );
}
