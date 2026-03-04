import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { getFontSize, rHeight, rSpacing, rWidth } from '../../utils';

type ModalType = 'error' | 'success' | 'info';

interface AppModalProps {
  isVisible: boolean;
  message: string;
  type?: ModalType;
  onConfirm: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
  isDarkMode?: boolean;
}

export const AppModal: React.FC<AppModalProps> = ({
  isVisible,
  message,
  type = 'info',
  onConfirm,
  onCancel,
  confirmText = 'OK',
  cancelText = 'Cancel',
  isDarkMode = false,
}) => {
  const colors = getColors(isDarkMode, type);

  return (
    <Modal
      isVisible={isVisible}
      animationIn="zoomIn"
      animationOut="zoomOut"
      backdropOpacity={0.5}
      useNativeDriver
      hideModalContentWhileAnimating
    >
      <View style={[styles.container, { backgroundColor: colors.card }]}>
        <View
          style={[styles.iconContainer, { backgroundColor: colors.iconBg }]}
        >
          <Text style={styles.icon}>{colors.icon}</Text>
        </View>
        <Text style={[styles.message, { color: colors.text }]}>{message}</Text>

        {/* Actions */}
        <View style={styles.buttonRow}>
          {onCancel && (
            <TouchableOpacity
              activeOpacity={0.8}
              style={[styles.cancelButton, { borderColor: colors.border }]}
              onPress={onCancel}
            >
              <Text style={[styles.cancelText, { color: colors.text }]}>
                {cancelText}
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.confirmButton, { backgroundColor: colors.primary }]}
            onPress={onConfirm}
          >
            <Text style={styles.confirmText}>{confirmText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const getColors = (dark: boolean, type: ModalType) => {
  const base = {
    light: {
      card: '#FFFFFF',
      text: '#111827',
      border: '#D1D5DB',
    },
    dark: {
      card: '#1F2937',
      text: '#F9FAFB',
      border: '#374151',
    },
  };

  const theme = dark ? base.dark : base.light;

  const typeColors = {
    error: {
      primary: '#EF4444',
      iconBg: 'rgba(239,68,68,0.15)',
      icon: '⚠️',
    },
    success: {
      primary: '#10B981',
      iconBg: 'rgba(16,185,129,0.15)',
      icon: '✅',
    },
    info: {
      primary: '#3B82F6',
      iconBg: 'rgba(59,130,246,0.15)',
      icon: 'ℹ️',
    },
  };

  return {
    ...theme,
    ...typeColors[type],
  };
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    padding: rSpacing(24),
    alignItems: 'center',
  },
  iconContainer: {
    width: rWidth(70),
    height: rHeight(70),
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: rSpacing(16),
  },
  icon: {
    fontSize: getFontSize(30),
  },
  message: {
    fontSize: getFontSize(14),
    textAlign: 'center',
    marginBottom: rSpacing(24),
    lineHeight: 22,
    fontWeight: '700'
  },
  buttonRow: {
    flexDirection: 'row',
    gap: rSpacing(12),
  },
  cancelButton: {
    flex: 1,
    borderWidth: 1,
    paddingVertical: rSpacing(12),
    borderRadius: 12,
    alignItems: 'center',
  },
  confirmButton: {
    flex: 1,
    paddingVertical: rSpacing(12),
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelText: {
    fontSize: getFontSize(15),
    fontWeight: '500',
  },
  confirmText: {
    fontSize: getFontSize(15),
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
