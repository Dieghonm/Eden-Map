import React, { useState, useContext } from 'react';
import { View, Text, Modal, TouchableOpacity, TextInput as RNTextInput, Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useTheme } from '../../context/ThemeProvider';
import { AppContext } from '../../context/AppProvider';
import { SENTIMENTOS } from '../../../assets/json/Sentimentos';
import { spacing } from '../../theme/texts';
import { createStyles } from '../../styles/Header/EditModal';
import ButtonSecundary from '../../components/ButtonSecundary';
import GlassBox from '../../components/GlassBox';
import ButtonPrimary from '../../components/ButtonPrimary';
import Feeling from '../Starting/Feeling';

export default function EditModal({ visible, onClose, onSave }) {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  
  const {
    desireName: savedName,
    desireDescription: savedDescription,
    selectedFeelings: savedFeelings,
    setDesireName,
    setDesireDescription,
    setSelectedFeelings
  } = useContext(AppContext);

  const [editMode, setEditMode] = useState(null);
  const [localName, setLocalName] = useState(savedName || '');
  const [localDescription, setLocalDescription] = useState(savedDescription || '');
  const [localFeelings, setLocalFeelings] = useState(savedFeelings || []);

  const maxChars = 15;

  const handleClose = () => {
    setEditMode(null);
    setLocalName(savedName || '');
    setLocalDescription(savedDescription || '');
    setLocalFeelings(savedFeelings || []);
    onClose();
  };

  const handleSaveDesire = async () => {
    await setDesireName(localName);
    await setDesireDescription(localDescription);
    if (onSave) onSave();
    handleClose();
  };

  const handleSaveFeeling = async () => {
    await setSelectedFeelings(localFeelings);
    if (onSave) onSave();
    handleClose();
  };

  const toggleFeeling = (id) => {
    if (localFeelings.includes(id)) {
      setLocalFeelings(localFeelings.filter(f => f !== id));
    } else if (localFeelings.length < 3) {
      setLocalFeelings([...localFeelings, id]);
    }
  };

  const isDesireValid = 
    localName.trim().length > 0 && 
    localName.trim().length <= maxChars &&
    localDescription.trim().length > 0;

  const isFeelingValid = localFeelings.length === 3;

  // TELA INICIAL: Escolher o que editar
  const renderInitialView = () => (
    <View style={styles.modalContent}>
      <GlassBox>
        <Text style={styles.modalTitle}>O que deseja editar?</Text>
      
        <TouchableOpacity
          style={[styles.optionButton, {borderColor: theme.warning}]}
          onPress={() => setEditMode('desire')}
          activeOpacity={0.7}
        >
          <Text style={styles.optionText}>Editar desejo material</Text>
          <Text style={styles.optionText}>{'(nome e descrição)'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.optionButton, {borderColor: theme.success,}]}
          onPress={() => setEditMode('feeling')}
          activeOpacity={0.7}
        >
          <Text style={styles.optionText}>Editar desejo subjetivo</Text>
          <Text style={styles.optionText}>{'(sentimentos)'}</Text>
        </TouchableOpacity>
        <ButtonPrimary
          title="Cancelar"
          onPress={handleClose}
          width={220}
        />
      </GlassBox>
    </View>
  );

  // TELA DE EDIÇÃO DO DESEJO
  const renderDesireEdit = () => (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.scrollContent}
      enableOnAndroid={true}
      enableAutomaticScroll={true}
      extraScrollHeight={Platform.OS === 'ios' ? spacing.xs : spacing.xl}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Editar Desejo</Text>

        <GlassBox>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Qual o nome do seu desejo?</Text>
            <RNTextInput
              style={styles.input}
              placeholder='Máximo de 15 caracteres'
              placeholderTextColor={theme.fontColor}
              value={localName}
              onChangeText={setLocalName}
              maxLength={maxChars}
            />
          </View>
        </GlassBox>

        <GlassBox>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Descreva o desejo material.</Text>
            <RNTextInput
              style={[styles.input, styles.textArea]}
              placeholder='Máximo de 300 caracteres'
              placeholderTextColor={theme.fontColor}
              value={localDescription}
              onChangeText={setLocalDescription}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              maxLength={300}
            />
          </View>
        </GlassBox>
        <View style={styles.teste}>
          <ButtonPrimary
            title="Salvar"
            onPress={handleSaveDesire}
            disabled={!isDesireValid}
            width={220}
          />

          <ButtonSecundary
            title="Voltar"
            onPress={() => setEditMode(null)}
            width={220}
          />
        </View>

      </View>
    </KeyboardAwareScrollView>
  );

  // TELA DE EDIÇÃO DOS SENTIMENTOS
  const renderFeelingEdit = () => (
    <View style={styles.modalContent}>
      <Feeling />

    </View>
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={handleClose}
      >
        <TouchableOpacity
          style={styles.modalBox}
          activeOpacity={1}
          onPress={(e) => e.stopPropagation()}
        >
          {editMode === null && renderInitialView()}
          {editMode === 'desire' && renderDesireEdit()}
          {editMode === 'feeling' && renderFeelingEdit()}
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}