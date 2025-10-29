import { Dimensions } from 'react-native';

const guidelineBaseWidth = 390;
const guidelineBaseHeight = 844;

const { width, height } = Dimensions.get('window');

const horizontalScale = (size) => {
  const scaled = (width / guidelineBaseWidth) * size;
  return Math.min(scaled, size * 2);
};

const verticalScale = (size) => {
  const scaled = (height / guidelineBaseHeight) * size;
  return Math.min(scaled, size * 2);
};

const moderateScale = (size, factor = 0.5) => {
  const scaled = size + (horizontalScale(size) - size) * factor;
  return Math.min(scaled, size * 2);
};

export { horizontalScale, verticalScale, moderateScale };
