import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';

interface ShowModalProps {
    isVisible: boolean;
    onClose: () => void;
    content: React.ReactNode;
    gray?: boolean;
}

const ShowModal: React.FC<ShowModalProps> = ({ isVisible, onClose, content, gray }) => {
    const [containerHeight, setContainerHeight] = useState<number>(0);
    return (
        <Modal
            isVisible={isVisible}
            onBackdropPress={onClose}
            style={styles.modal}
            backdropTransitionOutTiming={0}
            scrollHorizontal={false}
            propagateSwipe={true}
            avoidKeyboard={true}
        >
            <View style={[styles.container, { maxHeight: '90%', backgroundColor: gray ? '#f4f4f4' : 'white' }]}>
            <View style={{ width: '25%', height: 4, backgroundColor: '#444', alignSelf: 'center', borderRadius: 2, marginBottom: 12 }} />
            <ScrollView
                onLayout={(event) => {
                const { height } = event.nativeEvent.layout;
                setContainerHeight(height);
                }}
                style={{ borderRadius: 8 }}
                contentContainerStyle={{ display: 'flex', justifyContent: 'flex-end', gap: 8, padding: 16, paddingBottom: 64 }}>
                {content}
            </ScrollView>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
        width: '100%',
    },
    container: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingVertical: 18,
        paddingHorizontal: 12,
        paddingBottom: 4,
    },
})

export default ShowModal;