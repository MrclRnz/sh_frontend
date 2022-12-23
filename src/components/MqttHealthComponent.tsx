import { Component, createEffect, createResource, Match, Show, Switch } from "solid-js";
import { MqttHealth } from "../models/mqtt-health";

const heart = new URL('../assets/heart.png', import.meta.url).href

const fetchMqttHealth = async () => {
    const response = await fetch("http://localhost:8080/mqtt/health");
    const health = await response.json();
    return health as MqttHealth;
};

export default function MqttHealthComponent() {
    const [mqttHealth] = createResource(fetchMqttHealth);
    return (
        <Switch fallback={<div>Not Found</div>}>
            <Match when={mqttHealth.state === 'pending' || mqttHealth.state === 'unresolved'}>
                Loading...
            </Match>
            <Match when={mqttHealth.state === 'ready'}>
                <div class="w-8">
                    <img src={heart}
                        alt="heart" />
                </div>
            </Match>
            <Match when={mqttHealth.state === 'errored'}>
                {JSON.stringify(mqttHealth.error)}
            </Match>
        </Switch>
    );
};