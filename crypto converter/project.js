$(document).ready(function() {
  var access_key = '***';
  var currencies = 'BTC';
  var endpoint = 'http://api.coinlayer.com/live';
  var query = '?access_key=' + access_key;
  var url = endpoint + query;

  $('input[name="currency"]').click(function() {
    var currency = $(this).val();
    var target = '&target=' + currency;
    var full_url = url + target;

    fetch(full_url)
      .then(response => response.json())
      .then(data => {
        var btc_price = data.rates.BTC;
        var eth_price = data.rates.ETH;
        var ltc_price = data.rates.LTC;
        var xrp_price = data.rates.XRP;

        $('#btc-price').text(btc_price);
        $('#eth-price').text(eth_price);
        $('#ltc-price').text(ltc_price);
        $('#xrp-price').text(xrp_price);
      })
      .catch(error => console.error(error));
  });
});
