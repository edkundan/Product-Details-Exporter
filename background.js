chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url.includes('croma.com')) {
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ['content.js']
        }).then(() => {
            console.log('Content script injected');
        }).catch(err => {
            console.error('Failed to inject content script', err);
        });
    }
});
