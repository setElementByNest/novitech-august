import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { View } from "react-native";
import { Button, Menu, PaperProvider } from "react-native-paper";

type CustomMenuProps = {
    listName: string[];                 // menu item names
    listFunction: Array<() => void>;    // corresponding functions
};

const ShowMenu = ({ listName, listFunction }: CustomMenuProps) => {
    const [visible, setVisible] = useState(false);

    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    return (
        <PaperProvider>
            <View style={{
                justifyContent: 'center',
                width: '10%',
                position: 'absolute',
                top: 0,
                left: 0,
                margin: 0,
                padding: 0,
            }}>
                <Menu
                    visible={visible}
                    onDismiss={closeMenu}
                    anchor={<Button onPress={openMenu}><MaterialCommunityIcons name="dots-horizontal" /></Button>}
                    style={{ padding: 0, margin: 0, position: 'absolute', top: 35, left: 0 }}
                >
                    {listName.map((name, index) => (
                        <Menu.Item
                            key={index}
                            title={name}
                            onPress={() => {
                                closeMenu();
                                listFunction[index]?.(); // call function if exists
                            }}
                        />
                    ))}
                </Menu>
            </View>
        </PaperProvider>
    );
};

export default ShowMenu;
