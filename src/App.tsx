import { Divider, HopeProvider, HopeThemeConfig, Tab, TabList, Tabs } from '@hope-ui/solid';
import { Route, Router, Routes, useNavigate } from '@solidjs/router';
import { Component } from 'solid-js';
import DevicesContainerComponent from './components/DeviceContainerComponent/DevicesContainerComponent';
import MqttHealthComponent from './components/MqqtHealthComponent/MqttHealthComponent';
import "./App.css";

const App: Component = () => {
  const navigator = useNavigate();
  const navigate = (path: string) => navigator(path, { replace: true });
  return (
    <div class="body-container">
      <Tabs>
        <TabList>
          <Tab onClick={[navigate, "/"]}>
            Home
          </Tab>
          <Tab onClick={[navigate, "/devices"]}>
            Devices
          </Tab>
        </TabList>
      </Tabs>
      <Divider class="divider" orientation="horizontal" variant="solid" thickness="3px" />
      <MqttHealthComponent />
      <Routes>
        <Route path="/devices" component={DevicesContainerComponent} />
      </Routes>
    </div>
  );
};

export default App;
