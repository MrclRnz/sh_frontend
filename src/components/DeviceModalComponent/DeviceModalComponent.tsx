import { Grid, GridItem, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from "@hope-ui/solid";

export default function DeviceModalComponent(props: any) {

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
                                State: {props.device.state}
                            </GridItem>
                        </Grid>

                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};