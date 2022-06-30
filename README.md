# Chrome-Extensions

We are building Chrome extensions since Google Chrome is a widely used browser and Chrome extensions are supported by other browsers as well, like Microsoft Edge, Opera etc.
Extensions can be used to modify the user interface or enhance the functionality of a browser.
We are building 8 different Chrome extensions which can be useful in different scenarios. 
1. Adblocker - This extension can block the unwanted advertisements from your website.
2. Dark mode - sets background color Dark mode/light mode and also any custom color.
3. Notemaker - create and delete notes, we will use local storage for storing notes.
4. Clear Cache- Clear-Cache gives you instant access to clearing your browser data with a single click.
5. Social Media Blocker-  block the social media website that you navigate while working.
6. Background Music - Plays tracks background while using chrome.
7. The Great Suspender - Suspend the tabs that are not in use from long while.
8. Web Scraper - web scraper will traverse the website and extract the relevant data from that website.

## About browser Extensions
Extensions are made of different, but cohesive, components. Components can include background scripts, content scripts, an options page, UI elements and various logic files.Extensions start with their manifest. Every extension has a JSON-formatted manifest file, named manifest.json, which specifies the assets within your extension that are to be made accessible by web pages.

![this is an image showing architecture of Browser extension](https://cdn.tutsplus.com/net/uploads/2013/07/architecture.png)

Chrome extensions work with 3 distinct areas that communicate: Background, content and inner scripts. Each of them has their area of expertise within the page and serves several functions.

The ***content script*** acts in the area which the user visits and can serve to communicate information about the current state of the page. Any information can be obtained from it and sent to the extension in order to change its behavior.<br>
The ***background script*** acts in the browser area, it is the extension's event handler. This is where all event listeners that are important to the extension are stored. It remains inactive until an event is triggered and executes the logic that has been assigned to it.<br>
Finally, the ***inner script (in the image above, the popup.js)*** is responsible for the visual functionalities of the extension, interacting directly with the HTML of the extension and in conjunction with the background script, it can perform, for example, calls to an API and data return something.

## APIs used in this Project
- Chrome.webRequest- The web request API defines a set of events that follow the life cycle of a web request. We can use these events to observe and analyze traffic. We are using onBeforeRequest (optionally synchronous)-Fires when a request is about to occur. This event is sent before any TCP connection is made and can be used to cancel or redirect requests.
- Chrome.runtime- Use the chrome.runtime API to retrieve the background page, return details about the manifest, and listen for and respond to events in the app or extension lifecycle. You can also use this API to convert the relative path of URLs to fully-qualified URLs.	
  - onInstalled- Fired when the extension is first installed, when the extension is updated to a new version, and when Chrome is updated to a new version.
  - chrome.runtime.onMessage- Fired when a message is sent from either an extension process (by runtime.sendMessage) or a content script (by tabs.sendMessage).
- Chrome.storage.sync- The stored data will automatically be synced to any Chrome browser that the user is logged into, provided the user has sync enabled. We can get and set the data.
- Chrome.tabs- Use the chrome.tabs API to interact with the browser's tab system. You can use this API to create, modify, and rearrange tabs in the browser. 
  - chrome.tabs.executeScript- Injects JavaScript code into a page.
  
## Reference
- Chrome Extension Documentation by google: [ https://developer.chrome.com/docs/extensions/mv3/getstarted/](  https://developer.chrome.com/docs/extensions/mv3/getstarted/)
