import { Grid, GridItem, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Switch } from "@hope-ui/solid";
import { createEffect, createSignal } from "solid-js";

export default function DeviceModalComponent(props: any) {
    const [turnedOn, setPower] = createSignal(props.device.state === "On");
 
    return (
        <>
            <Modal opened={props.showModal} onClose={() => { props.setShowModal(false) }}>
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    <ModalHeader>ID: {props.device.id}</ModalHeader>
                    <ModalBody>
                        <Grid>
                            <GridItem>
                                Type: {props.device.dev_type}
                            </GridItem>
                            <GridItem>
                                <Switch variant="outline" size="lg" checked={turnedOn()} onChange={() => setPower(p => !p)}>Power</Switch>
                            </GridItem>
                        </Grid>

                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};