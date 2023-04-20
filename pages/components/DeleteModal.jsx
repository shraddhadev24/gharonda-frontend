import * as React from 'react';
import { View } from 'react-native';
import { Button, Dialog, Portal, Provider, Text } from 'react-native-paper';

const DeleteModal = ({ title, body, onClose, onConfirm, visible }) => {

  return (
    <Provider>
    <Portal>
      <Dialog visible={visible} onDismiss={onClose}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium">{body}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onClose}>Cancel</Button>
          <Button onPress={onConfirm}>Done</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
    </Provider>

  );
};

export default DeleteModal;