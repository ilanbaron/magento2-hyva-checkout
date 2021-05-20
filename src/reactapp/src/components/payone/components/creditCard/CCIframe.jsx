import React from 'react';

import Checkbox from '../../../common/Form/Checkbox';
import paymentConfig from '../../utility/paymentConfig';

function CCIframe() {
  return (
    <>
      <div className="mt-2">
        <div className="flex justify-between mb-2">
          <label className="md:text-sm">Credit Card Number</label>
          <div className="flex space-x-2">
            {paymentConfig.isAutoCardtypeDetectionEnabled &&
              paymentConfig.availableCardTypes.map(cardType => (
                <img
                  key={cardType.id}
                  alt={cardType.title}
                  id={`payone_creditcard_cc_icon_${cardType.id.toLowerCase()}`}
                  src={`https://cdn.pay1.de/cc/${cardType.id.toLowerCase()}/s/default.png`}
                  className="w-auto h-3"
                />
              ))}
          </div>
        </div>
        <div id="cardpan" className="inputIframe"></div>
      </div>

      <div>
        <label className="md:text-sm">Expiration Date</label>
        <div className="flex justify-between">
          <div className="w-2/5" id="cardexpiremonth"></div>
          <div className="w-2/5" id="cardexpireyear"></div>
        </div>
      </div>

      {paymentConfig.checkCvc && (
        <div>
          <label className="md:text-sm">Card Verification Number</label>
          <div id="cardcvc2" className="inputIframe"></div>
        </div>
      )}

      {paymentConfig.isSaveDataEnabled() && (
        <Checkbox
          label="Save the payment data for future use."
          name="payment.save_payment_data"
        />
      )}
    </>
  );
}

export default CCIframe;
