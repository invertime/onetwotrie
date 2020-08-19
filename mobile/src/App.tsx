import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { addOutline,  homeOutline, pricetagOutline } from 'ionicons/icons';
import Accueil from './pages/accueil';
import Suggerer from './pages/suggerer';
import {Product, ProductVide} from './pages/product';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/accueil" component={Accueil} />
          <Route path="/suggerer" component={Suggerer} />
          <Route path="/product" component={ProductVide} exact />
          <Route path="/product/barcode/:id" component={Product} />
          <Route path="/" render={() => <Redirect to="/accueil" />} exact />
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
        <IonTabButton tab="accueil" href="/accueil">
            <IonIcon icon={homeOutline} />
            <IonLabel>Accueil</IonLabel>
          </IonTabButton>
          <IonTabButton tab="suggerer" href="/suggerer">
            <IonIcon icon={addOutline} />
            <IonLabel>Suggérer</IonLabel>
          </IonTabButton>
          <IonTabButton tab="product" href="/product">
            <IonIcon icon={pricetagOutline} />
            <IonLabel>Produit</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
