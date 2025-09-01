import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';

interface ShowModalProps {
    isVisible: boolean;
    onClose: () => void;
    content: React.ReactNode;
}

const ShowModal: React.FC<ShowModalProps> = ({ isVisible, onClose, content }) => {
    const [containerHeight, setContainerHeight] = useState<number>(0);
    return (
        <Modal
            isVisible={isVisible}
            onBackdropPress={onClose}
            onSwipeComplete={onClose}
            swipeDirection="down"
            style={styles.modal}
            backdropTransitionOutTiming={0}
            scrollHorizontal={false}
            propagateSwipe={true}
            avoidKeyboard={true}
            swipeThreshold={0.35 * containerHeight}
        >
            <View style={[styles.container, { maxHeight: '90%' }]}>
                <View style={{ width: '25%', height: 4, backgroundColor: '#444', alignSelf: 'center', borderRadius: 2, marginBottom: 12 }} />
                <View
                    onLayout={(event) => {
                        const { height } = event.nativeEvent.layout;
                        setContainerHeight(height);
                    }}
                    style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, padding: 16, backgroundColor: 'white', borderRadius: 8 }}>
                    {content}
                </View>
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
        paddingBottom: 64,
    },
})

export default ShowModal;