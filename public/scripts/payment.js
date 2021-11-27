function payWithPaystack(image) {
    const data = JSON.parse(image);
    let handler = PaystackPop.setup({
    key: 'pk_test_88867702bbb1f9840c688abe0da4565401b61d03',
    email: 'immanueldiai@gmail.com',
    amount: data.price * 100,
    ref: ''+Math.floor((Math.random() * 1000000000) + 1),
    metadata: {
      imageId: data._id
    }, 

    onClose: function(){
      alert('Payment Aborted.');
    },

    callback: function(response){
      let message = 'Your payment was successful!'
      alert(message);
    }

  });
  handler.openIframe();
}