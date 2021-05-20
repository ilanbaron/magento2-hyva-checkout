import LocalStorage from '../../../utils/localStorage';
import RootElement from '../../../utils/rootElement';

const config = RootElement.getPaymentConfig();
const inputStyles =
  'width:100%;border: 1px solid #e2e8f0; padding: .5rem .75rem;margin:0;min-height:24px;border-radius:0.25rem;font-size: 1rem;line-height: 1.5;';
const selectStyles =
  'width:100%;border: 1px solid #e2e8f0; padding: .5rem .75rem;margin:0;min-height:24px;border-radius:0.25rem;font-size: 1rem;line-height: 1.5;';
const iframe = { height: '50px', width: '100%' };
const payOne = config.payone;
const {
  hostedRequest,
  fieldConfig,
  availableCardTypes,
  ccMinValidity,
  savedPaymentData,
  checkCvc,
  saveCCDataEnabled,
} = payOne;

const paymentConfig = {
  request: hostedRequest,
  fieldConfig: {
    ...fieldConfig,
    fields: {
      ...fieldConfig.fields,
      cardexpiremonth: {
        ...fieldConfig.fields.cardexpiremonth,
        iframe,
      },
      cardexpireyear: {
        ...fieldConfig.fields.cardexpireyear,
        iframe,
      },
      ccMinValidity,
    },
    defaultStyle: {
      ...fieldConfig.defaultStyle,
      iframe,
      input: inputStyles,
      select: selectStyles,
    },
  },
  availableCardTypes,
  savedPaymentData,
  isAutoCardtypeDetectionEnabled: !!fieldConfig.autoCardtypeDetection,
  checkCvc,
  isSaveDataEnabled: () =>
    saveCCDataEnabled && !!LocalStorage.getCustomerToken(),

  useSavedData: () =>
    paymentConfig.isSaveDataEnabled() && !!savedPaymentData.length,
};

export default paymentConfig;
