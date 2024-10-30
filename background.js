function generateUniqueString() {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    
    for (let i = 0; i < 32; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      result += chars[randomIndex];
    }
    
    return result;
  }

  chrome.action.onClicked.addListener((tab) => {
    let url = tab.url;
    let domain = new URL(url).hostname;
  
    const cookieName = "uniqueId";
  
    chrome.cookies.getAll({ domain: domain }, (cookies) => {
      cookies.forEach((cookie) => {
        if (cookie.name === cookieName) {
  
          chrome.cookies.remove({
            url: url,
            name: cookie.name
          }, () => {
            console.log(`Deleted cookie: ${cookie.name}`);
      
            chrome.cookies.set({
              url: url,
              name: cookie.name,
              value: generateUniqueString(), 
              domain: domain,
              path: cookie.path
            }, (newCookie) => {
              if (newCookie) {
                console.log(`Created new cookie: ${cookie.name} with value: new_value`);
              } else {
                console.log('Failed to create the cookie');
              }
            });
          });
        }
      });
    });
  });
  