function extractProductDetails() {
  const productNameElement = document.querySelector('.pd-title.pd-title-normal');
  const productPriceElement = document.getElementById('pdp-product-price');
  const productImageElement = document.getElementById('0prod_img');

  const productName = productNameElement ? productNameElement.innerText : 'N/A';
  const productPrice = productPriceElement ? productPriceElement.innerText : 'N/A';
  const productImage = productImageElement ? productImageElement.src : '';

  console.log('Product Name:', productName);
  console.log('Product Price:', productPrice);
  console.log('Product Image:', productImage);

  return {
    name: productName,
    price: productPrice,
    image: productImage
  };
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getProductDetails") {
    const productDetails = extractProductDetails();
    sendResponse(productDetails);
  }
});

