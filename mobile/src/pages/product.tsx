import React, { useState, useEffect } from 'react';
import { IonCardContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import { RouteComponentProps } from "react-router-dom";
import { Plugins } from '@capacitor/core';
import './product.css';

// Set geolocation module from Capacitor's core plugins
const { Geolocation } = Plugins;

// Get product id from url params
interface UserDetailPageProps extends RouteComponentProps<{
  id: string;
}> {}

const Product: React.FC<UserDetailPageProps> = ({match}) => {

  const [marmitton, setMarmitton] = useState('');

  // Informations
  const [brand, setBrand] = useState('');
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [type, setType] = useState('');

  // Geolocation
  const [city, setCity] = useState('');
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);

  // Recyclage
  const [finalConsignes, setConsignes] = useState('');

  // Alternatives
  const [alimentaire, setAlim] = useState('');
  const [alternatives, setAltsFinal] = useState('');

  // Direct geolocation
  Geolocation.watchPosition({}, (position, err) => {
    if (!err) {
      setLat(position.coords.latitude);
      setLon(position.coords.longitude);
    }
  })

  // Get Recyclage
  const finalize = async () => {
    const newConsignes = await fetch(`https://raw.githubusercontent.com/Vexcited/onetwotrie/master/api/recyclage.json`);
    const consignes = await newConsignes.json();

    if(consignes[city]){
      setConsignes(consignes[city][type]);
    }
    else{
      setConsignes('(aucune consignes de tri à été renseigné pour cette ville)');
    }
  }

  // Get city
  const reverse = async () => {
    const reverseGeocode = await fetch(`https://api-adresse.data.gouv.fr/reverse/?lon=${lon}&lat=${lat}`);
    const reversedJson = await reverseGeocode.json();

    setCity(reversedJson.features[0].properties.city);
  }

  function checkAlts (name: string, alimentaire: string) {

    var count = 0;

    if(alimentaire === 'yes'){
      setAlim('yes');
      setMarmitton('https://www.marmiton.org/recettes/recherche.aspx?type=all&aqt=' + name);
      count++;
    }

    if (count > 0){
      setAltsFinal('yes');
    }
    else if (count === 0){
      setAltsFinal('no');
    }
  }

  // Get informations
  const informations = async () => {

    const product = await fetch(`https://raw.githubusercontent.com/Vexcited/onetwotrie/master/api/products.json`);
    const productJson = await product.json();

    $.each(productJson, function(key, val){
      if(val.barcode === match.params.id){
        setImage('https://raw.githubusercontent.com/Vexcited/onetwotrie/master/api/images/' + val.barcode + '.' + val.ext)
        setName(val.name);
        setBrand(val.brand);      
        setType(val.type);

        checkAlts(val.name, val.alimentaire);
      }
    })
  }

  // Fetch product's informations if id is changed  
  useEffect(() => {
    informations();
  }, [match.params.id])

  // Fetch user's city if lon or lat is changed  
  useEffect(() => {
    reverse();
  }, [lon])
  
  useEffect(() => {
    reverse();
  }, [lat])

  // Fetch user's city `consignes de tri` if city if changed
  useEffect(() => {
    finalize();
  }, [city])
  

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{match.params.id}</IonTitle>
        </IonToolbar>

      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{match.params.id}</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonCard className="card">
          <IonCardHeader>
            <img className="image_card" src={image}></img>
            <IonCardSubtitle className="card-sub">{match.params.id} / {brand}</IonCardSubtitle>
            <IonCardTitle className="card-title">{name}</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            <h1 className="header_text">Recyclage</h1>
            <p>Vous recyclez à <strong>{city}</strong>
              <br />
              Ce produit se met (dans le/à la) <strong>{finalConsignes}</strong>
            </p>

            <h1 className="header_text">Alternatives</h1>

            {alternatives === 'yes' &&
              alimentaire === 'yes' &&
                <a href={marmitton}>Afficher des recettes pour ce produit</a>
            }

            {alternatives === 'no' &&
                <h2>Aucune alternative n'a été trouvé pour ce produit</h2>
            }
          </IonCardContent>
        </IonCard>

      </IonContent>
    </IonPage>
  );

};

const ProductVide: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Produit</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <h1 className="product-empty">Scannez un produit et vous verrez ses informations ici.</h1>

        <IonButton className="button-scan" href="/accueil">Scanner un produit</IonButton>
      </IonContent>
    </IonPage>
  );
};

export {Product, ProductVide};
