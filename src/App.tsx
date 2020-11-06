import React, { useRef, useState } from 'react';
import { IonAlert, IonApp, IonButton, IonCard, IonCardContent, IonCardHeader, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonRouterOutlet, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { calculatorOutline, refreshOutline, flaskOutline } from 'ionicons/icons';

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
import { isCallSignatureDeclaration } from 'typescript';


const App: React.FC = () => {
  const [calculatedAlk, setCalculatedAlk] = useState<number>();
  const [calculatedPhos, setCalculatedPhos] = useState<number>();
  const [alkError, setAlkError] = useState<string>();
  const [phosphateError, setPhosphateError] = useState<string>();
  const [showHideAlk, setShowHideAlk] = useState(false);
  const [showHidePhos, setShowHidePhos] = useState(false);

  const alkInputRef = useRef<HTMLIonInputElement>(null);
  const phosphateInputRef = useRef<HTMLIonInputElement>(null);

  const calculateAlk = () => {
    const enteredAlk = alkInputRef.current!.value;
    if (!enteredAlk) {
      console.log("alk is null");
      return;
    }
    let alk: number = 0.056 * +enteredAlk;
    //round to nearest hundreths place
    alk = Math.round(alk * 100) / 100;
    setCalculatedAlk(alk);

    if (alk > 11.0) {
      setAlkError('Your Alk is very high, it is recommended that you lower it.')
      console.log('greater than 11');
    }
    else if (alk < 6.5) {
      setAlkError('Your Alk is very low, it is recommended that you raise it.')
      console.log('lower than 6.5');
    }
  };

  const calculatePhosphate = () => {
    const enteredPhos = phosphateInputRef.current!.value;
    if (!enteredPhos) {
      console.log("phosphate is null")
      return;
    }
    let phosphate:number = (3.066 * +enteredPhos) / 1000;
    setCalculatedPhos(phosphate);

    if(phosphate > .3){
      setPhosphateError('Your Phopshate is very high. Do a water change or run GFO');
    }
    else if(phosphate < .01){
      setPhosphateError('Your Phopshate is very low and are in danger of starving your corals!');
    }
  };


  return (
    <React.Fragment>
      <IonAlert isOpen={!!alkError}
        onDidDismiss={() => setAlkError('')}
        message={alkError}
        buttons={['OK']}></IonAlert>
        <IonAlert isOpen={!!phosphateError}
        onDidDismiss={() => setPhosphateError('')}
        message={phosphateError}
        buttons={['OK']}></IonAlert>
      <IonApp>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Reef Calculators</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonGrid>
            <IonRow>
              <IonCol size-sm>
                <IonCard>
                  <IonButton onClick={() => (setShowHideAlk(!showHideAlk))}>Alkalinty
                <IonIcon icon={flaskOutline} />
                  </IonButton>
                  {showHideAlk &&
                    <IonGrid>
                      <IonRow>
                        <IonCol>
                          <IonInput placeholder="Enter Alkalinty in PPM" ref={alkInputRef} />
                        </IonCol>
                        <IonCol>
                          <IonButton className="cardButtons" onClick={calculateAlk}>
                            Convert
                        <IonIcon icon={calculatorOutline} />
                          </IonButton>
                        </IonCol>
                      </IonRow>
                      <IonRow>
                        <h2>{calculatedAlk} </h2>
                      </IonRow>
                    </IonGrid>
                  }
                </IonCard>
              </IonCol>

              <IonCol size-sm>
                <IonCard>
                  <IonButton onClick={() => (setShowHidePhos(!showHidePhos))}>Phosphate
                  <IonIcon icon={calculatorOutline} />
                  </IonButton>
                  {showHidePhos &&
                    <IonGrid>
                    <IonRow>
                      <IonCol>
                        <IonInput placeholder="Enter Phosphate in PPB" ref={phosphateInputRef} />
                      </IonCol>
                      <IonCol>
                        <IonButton className="cardButtons" onClick={calculatePhosphate}>
                          Convert
                      <IonIcon icon={calculatorOutline} />
                        </IonButton>
                      </IonCol>
                    </IonRow>
                    <IonRow>
                      <h2>{calculatedPhos} </h2>
                    </IonRow>
                  </IonGrid>
                  }

                </IonCard>
              </IonCol>
            </IonRow>

          </IonGrid>
        </IonContent>
      </IonApp>
    </React.Fragment>
  );
};

export default App;
