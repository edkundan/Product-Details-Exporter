window.onload = function () {
    // Query the active tab and send a message to get product details
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "getProductDetails" }, function (response) {
            if (chrome.runtime.lastError) {
                console.error('Error fetching details:', chrome.runtime.lastError);
                document.getElementById('productName').innerText = 'Error fetching details';
                return;
            }

            if (response) {
                document.getElementById('productName').innerText = response.name || 'Product Name Not Found';
                document.getElementById('productPrice').innerText = response.price || 'Price Not Found';
                document.getElementById('productImage').src = response.image || '';
            } else {
                document.getElementById('productName').innerText = 'No product found';
            }
        });
    });

    // Add event listener to the export button
    document.getElementById('exportButton').addEventListener('click', () => {
        const productName = document.getElementById('productName').innerText;
        const productPrice = document.getElementById('productPrice').innerText;
        const productImage = document.getElementById('productImage').src;

        // Validate product details
        if (productName && productPrice && productImage) {
            // Create CSV content
            const csvContent = [
                ['Product Name', 'Price', 'Image URL'],
                [productName, productPrice, productImage]
            ].map(e => e.join(",")).join("\n");

            // Create a blob and download
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement("a");
            const url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", "product-details.csv");
            document.body.appendChild(link); // Required for Firefox
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url); // Clean up the URL object
        } else {
            alert("Please ensure all product details are available before exporting.");
        }
    });
};
