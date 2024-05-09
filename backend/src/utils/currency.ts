export function convertCurrency(
  amount: number,
  fromCurrency: string,
  toCurrency: string
): number {
  console.log("Converting currency:", { amount, fromCurrency, toCurrency });

  if (fromCurrency === toCurrency) {
    console.log("Same currency. No need to convert.");
    return amount;
  }

  let rate: number;

  if (fromCurrency === "ARS" && toCurrency === "USD") {
    rate = getCurrencyRate("ARS", "USD");
  } else if (fromCurrency === "USD" && toCurrency === "ARS") {
    rate = getCurrencyRate("USD", "ARS");
  } else {
    const usdAmount = convertToUSD(amount, fromCurrency);
    rate = getCurrencyRate("USD", toCurrency);
    return usdAmount * rate;
  }

  console.log("Conversion rate:", rate);

  const convertedAmount = amount * rate;

  console.log("Converted amount:", convertedAmount);

  return convertedAmount;
}

function convertToUSD(amount: number, fromCurrency: string): number {
  if (fromCurrency === "USD") {
    return amount;
  }

  const rate = getCurrencyRate(fromCurrency, "USD");
  return amount / rate;
}

export function getCurrencyRate(
  fromCurrency: string,
  toCurrency: string
): number {
  const conversionRates: Record<string, number> = {
    USD_ARS: 100,
    ARS_USD: 0.01,
  };

  const key = `${fromCurrency}_${toCurrency}`;
  const rate = conversionRates[key] || 1;

  console.log("Currency rate:", rate);

  return rate;
}
