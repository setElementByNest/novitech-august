import { StyleSheet } from 'react-native';

import { Colors } from '../../constants/Colors';
const styles = StyleSheet.create({
    container_center: {
        flex: 1,
        padding: 30,
        justifyContent: 'center',
        backgroundColor: Colors.light.background,
        width: '100%',
        height: '100%',
        position: 'relative',
    },
    container_top: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f4f4f4',
        width: '100%',
        height: '100%',
        paddingTop: 210,
        paddingBottom: 40,
        justifyContent: 'flex-start',
    },
    input: {
        padding: 8,
        marginBottom: 12,
        fontSize: 16,
        backgroundColor: '#fff',
        fontFamily: 'Kanit400',
        width: '100%',
        borderWidth: 1,
        borderBottomColor: '#ccc',
        borderRadius: 6,
    },
    button_green: {
        backgroundColor: '#2e6b50',
        paddingVertical: 14,
        borderRadius: 4,
        alignItems: 'center',
        marginBottom: 15,
    },
    button_green_text: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Kanit400',
    },
    button_white: {
        backgroundColor: '#fff',
        borderRadius: 4,
        borderColor: '#ddd',
        borderWidth: 1,
        paddingVertical: 12,
        alignItems: 'center',
        marginBottom: 20,
    },
    button_gray: {
        backgroundColor: '#eaeaea',
        paddingVertical: 14,
        borderRadius: 4,
        alignItems: 'center',
    },
    button_gray_text: {
        color: '#888',
        fontSize: 16,
        fontFamily: 'Kanit400',
    },
    nextIcon: {
        position: 'absolute',
        bottom: 50,
        right: 25,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
    },
    nextIcon_Text: {
        fontSize: 24,
        color: '#000',
        fontFamily: 'Kanit400',
        marginRight: 10,
    },
})

const loginmain_styles = StyleSheet.create({
    viewmain: {
        width: '100%',
        height: '100%',
        position: 'relative',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    scrollmain: {
        width: '100%',
        height: '100%',
        position: 'relative',
    },
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f4f4f4',
        width: '100%',
        height: '100%',
        paddingTop: 210,
        paddingBottom: 40,
        justifyContent: 'flex-start',
    },
    input: styles.input,
    loginButton: styles.button_green,
    loginButton_text: styles.button_green_text,
    googleButton: styles.button_white,
    googleContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    googleIcon: {
        marginRight: 25,
    },
    googleText: {
        fontSize: 16,
        color: '#000',
        fontFamily: 'Kanit_400Regular',
    },
    separatorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 12,
    },
    separatorLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#ccc',
    },
    separatorText: {
        marginHorizontal: 10,
        color: '#999',
        fontFamily: 'Kanit_400Regular',
    },
    registerButton: styles.button_gray,
    registerButton_text: styles.button_gray_text,
    gearIcon: {
        position: 'absolute',
        bottom: 25,
        right: 25,
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingVertical: 10,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 180,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
    },

    headerBackground: {
        position: 'absolute',
        left: 0,
        right: 0,
        height: 180,
        width: '100%',
    },

    headerText: {
        backgroundColor: '#fff',
        borderRadius: 50,
        paddingHorizontal: 24,
        paddingVertical: 8,
        display: 'flex',
        position: 'absolute',
        bottom: -20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
        right: '50%',
        transform: [{ translateX: '50%' }],
    },

    headerImage: {
        width: '20%',
        height: '70%',
        resizeMode: 'contain',
        alignSelf: 'flex-end',
        position: 'absolute',
        bottom: 20,
        right: 0,
        marginHorizontal: 30,
    },
});

const loginselect_styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f4f4f4',
        width: '100%',
        height: '100%',
        paddingTop: 60,
        paddingBottom: 40,
        justifyContent: 'flex-start',
    },
    selectImage: {
        width: '96%',
        height: '96%',
        resizeMode: 'contain',
        borderRadius: 10,
        alignSelf: 'center',
        position: 'relative',
    },
    selectLayout: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingVertical: 12,
    },
    selectFarmItem: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 12,
    },
    selectFarmItemImg: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 12,
        outlineStyle: 'solid',
        outlineWidth: 3,
        outlineColor: '#2e6b5000',
    },
    selectFarmItemText: {
        fontSize: 20,
        fontWeight: '400',
        color: '#000',
        fontFamily: 'Kanit_400Regular',
        marginBottom: 2,
    },
    nextIcon: styles.nextIcon,
    nextIconText: styles.nextIcon_Text,
})

const loginnewuser_styles = StyleSheet.create({
    container: styles.container_top,
    input: styles.input,
    nextIcon: styles.nextIcon,
    nextIconText: styles.nextIcon_Text,
});

const logincreatefarm_styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f4f4f4',
        width: '100%',
        height: '100%',
        paddingTop: 210,
        paddingBottom: 40,
        justifyContent: 'flex-start',
    },
    input: styles.input,
    nextIcon: styles.nextIcon,
    nextIconText: styles.nextIcon_Text,
})

const logincreatingfarm_styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f4f4f4',
        width: '100%',
        height: '100%',
        paddingTop: 210,
        paddingBottom: 40,
        justifyContent: 'flex-start',
    },
    progressContainer: {
        gap: 8,
        position: 'absolute',
        bottom: 100,
        left: 0,
        right: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    percentText: {
        fontSize: 16,
        fontFamily: 'Kanit_700Bold',
        color: '#1B4F3E',
        marginBottom: 8,
    },
})

const logincreatedone_styles = StyleSheet.create({
    container: styles.container_top,
    nextIcon: styles.nextIcon,
    nextIconText: styles.nextIcon_Text,
})

const settingmodal_styles = StyleSheet.create({
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    container: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 30,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'Kanit',
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        fontFamily: 'Kanit',
        marginTop: 12,
    },
    buttonRow: {
        flexDirection: 'row',
        gap: 8,
        marginVertical: 8,
    },
    activeButton: {
        backgroundColor: '#1c4c3f',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 6,
    },
    inactiveButton: {
        backgroundColor: '#eee',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 6,
    },
    buttonText: {
        color: 'white',
        fontFamily: 'Kanit',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        padding: 8,
        marginVertical: 8,
        fontFamily: 'Kanit',
        fontSize: 18,
        width: '30%',
    },
    confirmButton: {
        backgroundColor: '#1c4c3f',
        borderRadius: 8,
        padding: 12,
        alignItems: 'center',
        marginTop: 24,
    },
    confirmText: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'Kanit',
    },
});

export default {
    loginmain_styles,
    loginselect_styles,
    loginnewuser_styles,
    logincreatefarm_styles,
    logincreatingfarm_styles,
    logincreatedone_styles,
    settingmodal_styles
};