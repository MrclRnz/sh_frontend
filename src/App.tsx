import { Component, createResource, Match, Switch } from 'solid-js';

import styles from './App.module.css';
import MqttHealthComponent from './components/MqttHealthComponent';

const App: Component = () => {
 
  return (
    <div class={styles.App}>
      <main>
        <MqttHealthComponent/>
      </main>
    </div>
  );
};

export default App;
