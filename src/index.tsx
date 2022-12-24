/* @refresh reload */
import { render } from 'solid-js/web';

import './index.css';
import App from './App';
import { HopeProvider, HopeThemeConfig } from '@hope-ui/solid';
import { Router } from '@solidjs/router';

const config: HopeThemeConfig = {
    initialColorMode: "dark"
  }

render(() => <HopeProvider config={config}><Router><App/></Router></HopeProvider>, document.getElementById('root') as HTMLElement);
