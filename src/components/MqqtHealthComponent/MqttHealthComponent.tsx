import { createResource, Match, onCleanup, Show, Switch } from "solid-js";
import { MqttHealth } from "../../models/mqtt-health";
import { Alert, AlertIcon, Tag } from "@hope-ui/solid";
import "./MqttHealthComponent.css";
import config from "../../config/app.config.json";

const green_heart = new URL('/src/assets/heart_green.png', import.meta.url).href;
const grey_heart = new URL('/src/assets/heart_grey.png', import.meta.url).href;

const fetchMqttHealth = async () => {
    const response = await fetch(`http://${config.host}:8080/mqtt/health`);
    const health = await response.json();
    return health as MqttHealth;
};

export default function MqttHealthComponent() {
    const [mqttHealth, { refetch }] = createResource(fetchMqttHealth);
    const timer = setInterval(refetch, 10000);
    onCleanup(() => clearInterval(timer));
    return (
        <Alert status="info" class="notification">
            <AlertIcon/>
            <span>MQTT Health:</span>
            <div class="icon">
                <Switch fallback={<img src={grey_heart} alt="grey-heart" />}>
                    <Match when={mqttHealth.state === 'pending' || mqttHealth.state === 'unresolved'}>
                        <img src={grey_heart} alt="grey-heart" />
                    </Match>
                    <Match when={mqttHealth.state === 'ready'}>
                        <Show when={mqttHealth()?.alive}
                            fallback={<img src={grey_heart} alt="grey-heart" />}>
                            <img class="animate-ping-small" src={green_heart} alt="green-heart" />
                        </Show>
                    </Match>
                    <Match when={mqttHealth.state === 'errored'}>
                        {JSON.stringify(mqttHealth.error)}
                    </Match>
                </Switch>
            </div>
        </Alert>
    );
};