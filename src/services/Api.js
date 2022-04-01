const currency = async () => {
  const URL = 'https://economia.awesomeapi.com.br/json/all';
  const response = await fetch(URL);
  const JSON = await response.json();
  const JSON_FILTERED = Object.keys(JSON).filter((coin) => coin.codein !== 'USDT');
  return JSON_FILTERED;
};

export default currency;
