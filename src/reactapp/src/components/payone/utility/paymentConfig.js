import RootElement from '../../../utils/rootElement';

const config = RootElement.getPaymentConfig();
const inputStyles =
  'width:100%;border: 1px solid #e2e8f0; padding: .5rem .75rem;margin:0;min-height:24px;border-radius:0.25rem;font-size: 1rem;line-height: 1.5;';
const selectStyles =
  'width:100%;border: 1px solid #e2e8f0; padding: .5rem .75rem;margin:0;min-height:24px;border-radius:0.25rem;font-size: 1rem;line-height: 1.5;';
const iframe = { height: '50px', width: '100%' };
const payOne = config.payment.payone;
const { fieldConfig, availableCardTypes } = payOne;

const paymentConfig = {
  request: config.payment.payone.hostedRequest,
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
    },
    defaultStyle: {
      ...fieldConfig.defaultStyle,
      iframe,
      input: inputStyles,
      select: selectStyles,
    },
  },
  availableCardTypes,
};

export default paymentConfig;
