import { useCallback, useState } from "react";
import {
    View,
    Text,
    TextInput,
    Pressable,
} from "react-native";
import Toast from "react-native-toast-message";
import Button from "../../components/Button";
import useResponsive from "../../hooks/useResponsive";
import styles from "../../assets/styles/styles";

function PasswordVerification({
    verifyResetCode,
    navigation,
    route,
}) {
    const { isDesktop } = useResponsive();
    const [code, setCode] = useState("");
    const [verifying, setVerifying] = useState(false);

    const email = route?.params?.email || "";

    const handleVerify = useCallback(() => {
        const trimmedCode = code.trim();
        setVerifying(true);

        if (!trimmedCode) {
            Toast.show({
                type: "error",
                text1: "Code Required",
                text2: "Please enter the verification code.",
            });
            return;
        }

        if (!/^\d{6}$/.test(trimmedCode)) {
            Toast.show({
                type: "error",
                text1: "Invalid Code",
                text2: "Please enter the 6-digit verification code.",
            });
            return;
        }

        if (!email) {
            Toast.show({
                type: "error",
                text1: "Email Missing",
                text2: "Please restart the password reset process.",
            });
            return;
        }

        verifyResetCode(
            {
                email,
                code: trimmedCode,
            },

            // Error
            (error) => {
                setVerifying(true);
                Toast.show({
                    type: "error",
                    text1: "Verification Failed",
                    text2:
                        error?.error ||
                        error?.message ||
                        "The verification code is invalid or has expired.",
                });
            },

            // Success
            (response) => {
                setVerifying(true);
                Toast.show({
                    type: "success",
                    text1: "Code Verified",
                    text2:
                        response?.message ||
                        "Your verification code has been verified.",
                });

                navigation.replace("ResetPassword", {
                    email,
                    resetToken: response?.resetToken,
                });
            }
        );
    }, [verifyResetCode, navigation, code, email]);

    return (
        <View style={[styles.container, isDesktop && styles.desktopLoginContainer]}>
            <View style={isDesktop ? styles.card : null}>
                <Text style={styles.text}>
                    Verify Your Email
                </Text>

                <Text style={styles.description}>
                    Enter the 6-digit verification code sent to
                    your email address.
                </Text>

                <Text style={styles.email}>
                    {email}
                </Text>

                <Text style={styles.label}>
                    Verification Code
                </Text>

                <TextInput
                    style={styles.passCodeInput}
                    placeholder="000000"
                    placeholderTextColor="#999"
                    value={code}
                    onChangeText={(value) =>
                        setCode(
                            value
                                .replace(/\D/g, "")
                                .slice(0, 6)
                        )
                    }
                    keyboardType="number-pad"
                    maxLength={6}
                    textAlign="center"
                />

                <Button
                    onPress={handleVerify}
                    disabled={verifying}
                    loading={verifying}
                    title="Verify Code"
                />

                <Pressable onPress={() => navigation.navigate('ForgotPassword')}>
                    <Text style={styles.backText}>
                        Back
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}

export default PasswordVerification;