import { useCallback, useState } from "react";
import {
    View,
    Text,
    TextInput,
    Pressable,
} from "react-native";
import { setSessionData } from "../../helpers";
import Toast from "react-native-toast-message";
import Button from "../../components/Button";
import useResponsive from "../../hooks/useResponsive";
import styles from "../../assets/styles/styles";

function ForgotPassword({
    forgotPassword,
    navigation,
}) {
    const { isDesktop } = useResponsive();
    const [email, setEmail] = useState("");
    const [sending, setSending] = useState(false);

    const handleSubmit = useCallback(() => {
        const trimmedEmail = email.trim().toLowerCase();
        
        if (!trimmedEmail) {
            Toast.show({
                type: "error",
                text1: "Email Required",
                text2: "Please enter your registered email address.",
            });
            return;
        }
        
        setSending(true);

        forgotPassword(
            { email: trimmedEmail },
            (error) => {
                setSending(false);
                Toast.show({
                    type: "error",
                    text1: "Unable to Continue",
                    text2:
                        error?.error ||
                        error?.message ||
                        "Unable to process your password reset request.",
                });
            },
            
            async (response) => {
                try {
                    console.log("1. Forgot password response:", response);

                    await setSessionData(
                        "passwordReset",
                        {
                            email: trimmedEmail,
                        }
                    );

                    console.log("2. Session saved");

                    setSending(false);

                    Toast.show({
                        type: "success",
                        text1: "Code Sent",
                        text2:
                            response?.message ||
                            "A password reset code has been sent to your email.",
                    });

                    console.log("3. Navigating to PasswordVerification");

                    navigation.replace("PasswordVerification");

                    console.log("4. Navigation completed");
                } catch (error) {
                    console.error("ForgotPassword error:", error);

                    setSending(false);

                    Toast.show({
                        type: "error",
                        text1: "Unable to Continue",
                        text2:
                            error?.message ||
                            "Unable to prepare the verification session.",
                    });
                }
            }
        );
    }, [forgotPassword, navigation, email]);

    return (
        <View style={[styles.container, isDesktop && styles.desktopLoginContainer]}>
            <View style={isDesktop ? styles.card : null}>
                <Text style={styles.text}>
                    Forgot Password?
                </Text>

                <Text style={styles.description}>
                    Enter the email address associated with your
                    student account and we'll send you a verification
                    code.
                </Text>

                <Text style={styles.label}>
                    Email Address
                </Text>

                <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    placeholderTextColor="#999"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                />

                <Button
                    onPress={handleSubmit}
                    title="Send Code"
                    disabled={sending}
                    loading={sending}
                />

                <Pressable onPress={() => navigation.navigate('SignIn')}>
                    <Text style={styles.backText}>
                        Back to Sign In
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}

export default ForgotPassword;