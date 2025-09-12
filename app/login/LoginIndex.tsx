import Button from '@/components/button/Button';
import TextStyles from '@/constants/Texts';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import styles from './Styles';

type Props = {
    setPage: React.Dispatch<React.SetStateAction<number>>;
};

const LoginIndex = ({ setPage }: Props) => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [waiting, setWaiting] = useState<boolean>(false);
    const [notic, setNotic] = useState<string>('');

    const validEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    const validPassword = (password: string) => {
        return password.length >= 6;
    }
    const handleLogin = () => {
        setWaiting(true);
        setTimeout(() => {
            setWaiting(false);
            setNotic('');
            if (!validEmail(username)) {
                setNotic('Invalid email format');
                return;
            }
            if (!validPassword(password)) {
                setNotic('Password must be at least 6 characters');
                setPassword('');
                return;
            }
            setPage(1);
            console.log('Login with username and password');
            setUsername('');
            setPassword('');
        }, 1000);
    };
    const handleGoogleLogin = () => {
        console.log('Login with Google');
        setNotic('กำลังพัฒนา...');
    };
    const handleCreateNew = () => {
        console.log('Create new account');
        setNotic('กำลังพัฒนา...');
    };

    return (
        <View style={styles.loginmain_styles.viewmain}>
            <ScrollView style={styles.loginmain_styles.scrollmain} contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
                <View style={styles.loginmain_styles.container}>
                    <View style={styles.loginmain_styles.header}>
                        <Image
                            source={require('../../assets/images/headdropLogin.png')}
                            style={stylesnow.headerBackground}
                            resizeMode="cover"
                        />
                    </View>
                    <Text style={TextStyles.text_head0}>{"ยินดีต้อนรับเข้าสู่"}</Text>
                    <Text style={TextStyles.text_head0}>{"Farm Boost"}</Text>
                    {/* <Text style={[TextStyles.text_head2, { paddingVertical: 12 }]}>{"เข้าสู่ระบบ"}</Text> */}

                    <Text style={[TextStyles.text_head5_gray, { paddingVertical: 12, marginTop: 12 }]}>{"กรุณากรอกข้อมูลเพื่อเข้าสู่ระบบ"}</Text>

                    <TextInput
                        style={styles.loginmain_styles.input}
                        placeholder={"ชื่อผู้ใช้งาน"}
                        value={username}
                        onChangeText={setUsername}
                    />

                    <TextInput
                        style={styles.loginmain_styles.input}
                        placeholder={"รหัสผ่าน"}
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />
                    <Text style={[TextStyles.text_head5_red, { display: notic == '' ? 'none' : 'flex', paddingBottom: 12 }]}>{notic}</Text>
                    <Button text={waiting ? "กำลังโหลด..." : "เข้าสู่ระบบ"} theme={waiting ? 'gray' : 'green'} fn={handleLogin} />
                    <Button text={"เข้าสู่ระบบด้วย Google"} theme={'white'} fn={handleGoogleLogin} />

                    <View style={styles.loginmain_styles.separatorContainer}>
                        <View style={styles.loginmain_styles.separatorLine} />
                        <Text style={TextStyles.text_head5_gray}>{"หรือ"}</Text>
                        <View style={styles.loginmain_styles.separatorLine} />
                    </View>
                    <Button text={"สร้างบัญชีใหม่"} theme='white' fn={handleCreateNew} />

                    <View style={{ position: 'absolute', top: 0, right: 0, height: '50%', width: '50%', filter: 'blur(70px)', zIndex: -1 }}>
                        <View style={{ backgroundColor: 'green', width: '50%', aspectRatio: 1, position: 'absolute', top: '-15%', right: 30 }}></View>
                        <View style={{ backgroundColor: 'yellow', width: '30%', aspectRatio: 1, position: 'absolute', top: '30%', right: 5 }}></View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

const stylesnow = StyleSheet.create({
    headerBackground: {
        position: 'absolute',
        left: 0,
        right: 0,
        height: 180,
        width: '100%',
    },
})

export default LoginIndex