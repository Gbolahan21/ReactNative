import { useState } from "react";
import {
    View,
    Text,
    TextInput,
    Pressable,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet
} from "react-native";

import Toast from "react-native-toast-message";
import Ionicons from "@expo/vector-icons/Ionicons";
import Button from "../../components/Button";
import IconButton from "../../components/IconButton";
import { COLORS } from "../../constants/colors";
import useResponsive from "../../hooks/useResponsive";

function ResetPassword({
    navigation,
    route,
    resetPassword,
}) {
    const { isDesktop } = useResponsive();
    const email = route?.params?.email || "";
    const resetToken = route?.params?.resetToken;

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] =
        useState("");

    const [showPassword, setShowPassword] =
        useState(false);

    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);

    const [submitting, setSubmitting] =
        useState(false);

    const validatePassword = () => {
        if (!password) {
            Toast.show({
                type: "error",
                text1: "Password Required",
                text2:
                    "Please enter your new password.",
            });

            return false;
        }

        if (password.length < 8) {
            Toast.show({
                type: "error",
                text1: "Invalid Password",
                text2:
                    "Password must be at least 8 characters.",
            });

            return false;
        }

        if (!/[A-Z]/.test(password)) {
            Toast.show({
                type: "error",
                text1: "Invalid Password",
                text2:
                    "Password must contain an uppercase letter.",
            });

            return false;
        }

        if (!/[a-z]/.test(password)) {
            Toast.show({
                type: "error",
                text1: "Invalid Password",
                text2:
                    "Password must contain a lowercase letter.",
            });

            return false;
        }

        if (!/[0-9]/.test(password)) {
            Toast.show({
                type: "error",
                text1: "Invalid Password",
                text2:
                    "Password must contain a number.",
            });

            return false;
        }

        if (!/[^A-Za-z0-9]/.test(password)) {
            Toast.show({
                type: "error",
                text1: "Invalid Password",
                text2:
                    "Password must contain a special character.",
            });

            return false;
        }

        if (password !== confirmPassword) {
            Toast.show({
                type: "error",
                text1: "Passwords Do Not Match",
                text2:
                    "Please make sure both passwords match.",
            });

            return false;
        }

        return true;
    };

    const handleSubmit = () => {
        if (!email || !resetToken) {
            Toast.show({
                type: "error",
                text1: "Reset Session Expired",
                text2:
                    "Please restart the password reset process.",
            });

            navigation.replace("ForgotPassword");

            return;
        }

        if (!validatePassword()) {
            return;
        }

        setSubmitting(true);

        resetPassword(
            {
                email,
                resetToken,
                password,
            },

            (error) => {
                setSubmitting(false);

                Toast.show({
                    type: "error",
                    text1: "Reset Failed",
                    text2:
                        error?.message ||
                        error?.error ||
                        "Unable to reset your password.",
                });
            },

            (response) => {
                setSubmitting(false);

                Toast.show({
                    type: "success",
                    text1: "Password Reset",
                    text2:
                        response?.message ||
                        "Your password has been reset successfully.",
                });

                navigation.replace("SignIn");
            }
        );
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                <View style={isDesktop ? styles.card : null}>

                    {/* Icon */}
                    <View style={styles.iconContainer}>
                        <Ionicons
                            name="lock-closed-outline"
                            size={30}
                            color={COLORS.primary}
                        />
                    </View>

                    {/* Title */}
                    <Text style={styles.title}>
                        Reset Password
                    </Text>

                    <Text style={styles.description}>
                        Create a new password for your student account.
                    </Text>

                    {/* Email */}
                    <View style={styles.emailContainer}>
                        <Ionicons
                            name="mail-outline"
                            size={18}
                            color="#64748B"
                        />

                        <Text style={styles.email} numberOfLines={1}>
                            {email}
                        </Text>
                    </View>

                    {/* Password */}
                    <Text style={styles.label}>
                        New Password
                    </Text>

                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter new password"
                            placeholderTextColor="#94A3B8"
                            secureTextEntry={!showPassword}
                            value={password}
                            onChangeText={setPassword}
                            autoCapitalize="none"
                            autoCorrect={false}
                            textContentType="newPassword"
                            autoComplete="new-password"
                        />

                        <IconButton name={showPassword ? "eye" : "eye-off"} onPress={() => setShowPassword(!showPassword)} />
                    </View>

                    {/* Confirm Password */}
                    <Text style={styles.label}>
                        Confirm Password
                    </Text>

                    <View
                        style={
                            styles.inputContainer
                        }
                    >
                        <TextInput
                            style={styles.input}
                            placeholder="Confirm new password"
                            placeholderTextColor="#94A3B8"
                            secureTextEntry={!showConfirmPassword}
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            autoCapitalize="none"
                            autoCorrect={false}
                            textContentType="newPassword"
                            autoComplete="new-password"
                        />

                        <IconButton name={showConfirmPassword ? "eye" : "eye-off"} onPress={() => setShowConfirmPassword(!showConfirmPassword)} />
                    </View>

                    {/* Password Requirements */}
                    <View style={styles.requirements}>
                        <Text style={styles.requirementsTitle}>
                            Password must contain:
                        </Text>

                        <Text style={styles.requirement}>
                            • At least 8 characters
                        </Text>

                        <Text style={styles.requirement}>
                            • One uppercase letter
                        </Text>

                        <Text style={styles.requirement}>
                            • One lowercase letter
                        </Text>

                        <Text style={styles.requirement}>
                            • One number
                        </Text>

                        <Text style={styles.requirement}>
                            • One special character
                        </Text>
                    </View>

                    {/* Reset Button */}
                    <Button
                        title={submitting ? "Resetting..." : "Reset Password"}
                        onPress={handleSubmit}
                        disabled={submitting}
                        style={styles.button}
                    />

                    {/* Back */}
                    <Pressable onPress={() => navigation.replace("SignIn")} disabled={submitting}>
                        <Text style={styles.backText}>
                            Back to Sign In
                        </Text>
                    </Pressable>

                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: 
        COLORS.background, 
        padding: 20
    }, 
    
    scrollContent: { 
        flexGrow: 1, 
        justifyContent: "center", 
        alignItems: "center", 
    }, 
    
    card: { 
        width: "100%", 
        maxWidth: 450, 
        backgroundColor: COLORS.white, 
        borderRadius: 16, 
        padding: 30, 
        elevation: 8, 
        shadowColor: "#000", 
        shadowOffset: { 
            width: 0, 
            height: 4 
        }, 
        shadowOpacity: 0.15, 
        shadowRadius: 12 
    }, 
    
    iconContainer: { 
        width: 64, 
        height: 64, 
        borderRadius: 32, 
        backgroundColor: "#EEF2FF", 
        alignItems: "center", 
        justifyContent: "center", 
        alignSelf: "center", 
        marginBottom: 18 
    }, 
    
    title: { 
        fontSize: 26, 
        fontWeight: "bold", 
        color: COLORS.text, 
        textAlign: "center", 
        marginBottom: 8 
    }, 
    
    description: { 
        fontSize: 14, 
        lineHeight: 21, 
        color: "#64748B", 
        textAlign: "center", 
        marginBottom: 20 
    }, 
    
    emailContainer: { 
        flexDirection: "row", 
        alignItems: "center", 
        backgroundColor: "#F8FAFC", 
        borderWidth: 1, 
        borderColor: COLORS.border, 
        borderRadius: 10, 
        paddingHorizontal: 14, 
        height: 48, 
        marginBottom: 22 
    }, 
    
    email: { 
        flex: 1, 
        marginLeft: 9, 
        fontSize: 14, 
        color: COLORS.text, 
        fontWeight: "500" 
    }, 
    
    label: { 
        fontSize: 14, 
        fontWeight: "600", 
        color: COLORS.text, 
        marginBottom: 8 
    }, 
    
    inputContainer: { 
        flexDirection: "row", 
        alignItems: "center", 
        borderWidth: 1, 
        borderColor: COLORS.border, 
        borderRadius: 10, 
        height: 52, 
        paddingHorizontal: 15, 
        marginBottom: 18, 
        backgroundColor: COLORS.white 
    }, 
    
    input: { 
        flex: 1, 
        fontSize: 16, 
        color: COLORS.text, 
        outlineStyle: "none" 
    }, 
    
    requirements: { 
        backgroundColor: "#F8FAFC", 
        borderRadius: 10, 
        padding: 14, 
        marginBottom: 22, 
        borderWidth: 1, 
        borderColor: "#E2E8F0" 
    }, 
    
    requirementsTitle: { 
        fontSize: 13, 
        fontWeight: "700", 
        color: COLORS.text, 
        marginBottom: 7 
    }, 
    
    requirement: { 
        fontSize: 12, 
        color: "#64748B", 
        marginBottom: 3 
    }, 
    
    button: { 
        width: "100%", 
        marginBottom: 16 
    }, 
    
    backText: { 
        textAlign: "center", 
        color: COLORS.primary, 
        fontSize: 14, 
        fontWeight: "600" 
    },
})

export default ResetPassword;