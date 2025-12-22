import { View } from 'react-native';
import { useTheme } from '../context/ThemeProvider';
import { createStyles } from '../styles/components/HeaderAjuster';

export default function HeaderAjuster() {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  return (
    <View style={styles.spacer} />
  );
}