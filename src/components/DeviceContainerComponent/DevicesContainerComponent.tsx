import { Badge, Box, Grid, GridItem } from "@hope-ui/solid";
import { createResource, createSignal, For, Match, onCleanup, Show, Switch } from "solid-js";
import { Device } from "../../models/Device";
import DeviceModalComponent from "../DeviceModalComponent/DeviceModalComponent";
import "./DevicesContainerComponent.css";
import config from "../../config/app.config.json";

const led_stripe = new URL('/src/assets/led_stripe.jpg', import.meta.url).href;

const fetchDevices = async () => {
    const response = await fetch(`http://${config.host}:8080/devices`);
    const health = await response.json();
    return health as Device[];
};

export default function DevicesContainerComponent() {
    const [devices] = createResource(fetchDevices);
    const [showModal, setShowModal] = createSignal(false);
    const [selectedDevice, setSelectedDevice] = createSignal();

    const openModal = (device: Device): void => {
        setSelectedDevice(device);
        setShowModal(true);
    };

    return (
        <>
            <Grid templateColumns="repeat(6, 1fr)" gap="$6">
                <For each={devices()}>{(device) =>
                    <GridItem class="grid-item" onClick={(_e: any) => openModal(device)}>
                        <Box
                            maxW="$sm"
                            borderWidth="1px"
                            borderColor="$neutral6"
                            borderRadius="$lg"
                            overflow="hidden"
                        >
                            <Box as="img" src={led_stripe} alt={"dev_type_img"} />
                            <Box p="$6">
                                <Box display="flex" alignItems="baseline">
                                    <Badge px="$2" colorScheme="primary" rounded="$full">
                                        {device.dev_type}
                                    </Badge>
                                    <Box
                                        color="$neutral9"
                                        fontWeight="$bold"
                                        letterSpacing="$wide"
                                        fontSize="$xs"
                                        textTransform="uppercase"
                                        ml="$2"
                                    >
                                        ID: {device.id}  &bull; State: {device.state}
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </GridItem>
                }</For>
            </Grid>
            <Show when={showModal()}>
                <DeviceModalComponent showModal={showModal} setShowModal={setShowModal} device={selectedDevice()}></DeviceModalComponent>
            </Show>
        </>
    );
};