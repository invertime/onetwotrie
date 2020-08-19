import React, { useState } from 'react';
import { IonButton, IonCheckbox, IonLabel, IonSelect, IonSelectOption, IonItem, IonInput, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './suggerer.css';

const Suggerer: React.FC = () => {
  const [name, setName] = useState<string>();
  const [brand, setBrand] = useState<string>();
  const [barcode, setBarcode] = useState<string>();

  const [type, setType] = useState<string>();
  const [alimCheck, setAlimCheck] = useState(false);

  const [errors, setFormErrors] = useState('');


  const submit = async () => {
    try {
      var alimentaire_check = '';
      if(alimCheck === true){
        alimentaire_check = 'yes';
      }
      else if (alimCheck === false){
        alimentaire_check = 'no';
      }

      if(alimentaire_check !== '' || name !== '' || brand !== '' || barcode !== '' || type !== ''){
        $.ajax({
          type: 'POST',
          url: 'https://ott.vexcited.ml/assets/php/suggest.php',
          data: {
            name:  name,
            brand:  brand,
            barcode:  barcode,
            type: type,
            alimentaire: alimentaire_check,
            submit: 'submitted',
            phone: 'yes'
          },
          success: function (callback) {
            setAlimCheck(false);
            setName('');
            setBrand('');
            setType('');
            setBarcode('');
    
            // Show the result
            setFormErrors(callback);
          }
        });
      }
      else{
        setFormErrors('Des champs sont vides.');
      }
    } catch (e) {
      setFormErrors('Une erreur est survenue ! Veuillez réesayer.');
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Suggérer</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Suggérer</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className="form-control">
            <h2 className="err">{errors}</h2>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); submit();}}>
          <div className="form-control">
            <h1 className="accueil-or">Informations</h1>

            <h2>Nom</h2>
            <IonItem>
              <IonInput type="text" value={name} placeholder="Eau de source 150ml" onIonChange={e => setName(e.detail.value!)} clearInput></IonInput>
            </IonItem>

            <h2>Marque</h2>
            <IonItem>
              <IonInput type="text" value={brand} placeholder="Cristaline" onIonChange={e => setBrand(e.detail.value!)} clearInput></IonInput>
            </IonItem>

            <h2>Code-barres</h2>
            <IonItem>
              <IonInput type="text" value={barcode} placeholder="3274080005003 (13 ou 8 chiffres)" onIonChange={e => setBarcode(e.detail.value!)} clearInput></IonInput>
            </IonItem>

            <h1 className="accueil-or">Recyclage</h1>

            <IonItem>
              <IonLabel>Type de produit</IonLabel>
              <IonSelect value={type} okText="Valider" cancelText="Annuler" onIonChange={e => setType(e.detail.value)}>
                <IonSelectOption value="autre">Autre (Déchetterie)</IonSelectOption>
                <IonSelectOption value="potbocalverre">Pot/Bocal en verre</IonSelectOption>
                <IonSelectOption value="potyaourt">Pot de yaourt</IonSelectOption>
                <IonSelectOption value="papier">Papier</IonSelectOption>
                <IonSelectOption value="briquealimentaire">Brique alimentaire (jus, lait, ...)</IonSelectOption>
                <IonSelectOption value="boitecarton">Boîte en carton</IonSelectOption>
                <IonSelectOption value="bouteilleplastique">Bouteille en plastique</IonSelectOption>
                <IonSelectOption value="emballageplastique">Emballage en plastique</IonSelectOption>
                <IonSelectOption value="bouteilleverre">Bouteille en verre</IonSelectOption>
                <IonSelectOption value="bouteillemetal">Bouteille en métal</IonSelectOption>
                <IonSelectOption value="boitemetal">Boite en métal</IonSelectOption>
                <IonSelectOption value="porcelaine">Porcelaine</IonSelectOption>
                <IonSelectOption value="canettealuminium">Canette en aluminium</IonSelectOption>
              </IonSelect>
            </IonItem>

            <h1 className="accueil-or">Alternatives</h1>

            <IonItem>
              <IonLabel>Proposer des recettes ? (Produit alimentaire)</IonLabel>
              <IonCheckbox slot="start" checked={alimCheck} onIonChange={e => setAlimCheck(e.detail.checked)} />
            </IonItem>

            <br/>

            <IonButton className="button-scan" type="submit">Envoyer la demande  !</IonButton>
          </div>          
        </form>
      </IonContent>
    </IonPage>
  );
};

export default Suggerer;
