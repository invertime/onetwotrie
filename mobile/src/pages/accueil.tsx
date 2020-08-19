import React, { useState, useEffect } from 'react';
import { IonButton, IonList, IonItem, IonLabel, IonContent, IonHeader, IonSearchbar, IonPage, IonTitle, IonToolbar, IonAvatar } from '@ionic/react';
import './accueil.css';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';


const Accueil: React.FC = () => {

  const [productId, setProductId] = useState('');
  const [outputFinal, setOutput] = useState([]);
  const [productOut, setProductOut] = useState('');
  const imagePath = 'https://raw.githubusercontent.com/Vexcited/onetwotrie/master/api/images/';

  const openScanner = async () => {
    const data = await BarcodeScanner.scan();
    window.open(`/product/barcode/${data.text}`);
  };

  const fetchProducts = async () => {
    const products = await fetch(`https://raw.githubusercontent.com/Vexcited/onetwotrie/master/api/products.json`);
    const data = await products.json();

    setProductOut(JSON.stringify(data));
  }

  useEffect(() => {
    fetchProducts();
  }, [productId])

  function searchData (query: string) {

    // If the query is empty...
    if(query === '') {
      // Create empty array
      var output = '[]';
      // Pull this empty array to outputFinal
      setOutput(JSON.parse(output));
    }
    // If the query is not empty...
    else{
      // Get the JSON stored previously into productOut
      var data = JSON.parse(productOut);

      // Create search
      var regex = new RegExp(query, "i");
      var output = '[';

      // Reset counter
      var i = 0;

      // Search in JSON products
      $.each(data, function(key, val){
        if((val.name.search(regex) != -1) || (val.brand.search(regex) != -1) || (val.barcode.search(regex) != -1)) {
          var image = imagePath + val.barcode + '.' + val.ext;
          var product = '/product/barcode/' + val.barcode;

          // Pull into JSON the product          
          output += '{"key":"'+ i +'", "path":"' + product + '", "name":"' + val.name + '", "imagePath":"' + image + '", "brand":"'+val.brand+'", "barcode":"'+val.barcode+'"}, ';
          
          // Implementing 1 to previous value
          i++;
        }
        
      });

      // Remove last comma
      var output = output.replace(/,\s*$/, "");
      output += ']';

      // Parse the JSON and put it into outputFinal
      setOutput(JSON.parse(output));
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>OneTwoTrie</IonTitle>
        </IonToolbar>

      </IonHeader>
      <IonContent>

        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Accueil</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonButton className="button-scan" onClick={openScanner}>Ouvrir la caméra</IonButton>

        <h1 className="accueil-or">ou</h1>

        <IonSearchbar onIonChange={e => searchData(e.detail.value!)} placeholder="Rechercher un produit (nom, marque, code-barres)"></IonSearchbar>
        
        <IonList>
          {outputFinal.map((val: any) =>
            <IonItem key={val.key} routerLink={val.path}>
              <IonAvatar slot="start"><img src={val.imagePath} /></IonAvatar>
              <IonLabel><h2>{val.name}</h2><h3>{val.brand}</h3><p>{val.barcode}</p></IonLabel>
            </IonItem>
          )}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Accueil;
