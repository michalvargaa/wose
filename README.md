# WOSE
- Simple Google Chrome web extension that allows users to search for something once and consequently receive results from all the desired search engines, hence **WOSE** ( write once, search everywhere ).
- #### Video : https://www.youtube.com/watch?v=ZFzNj5ZWZ74&ab_channel=MichalVarga


### Idea behind WOSE

-   Search engines hold an incredible amount of power since they dictate the flow of information. Having more than one search engine is immensely important, because of a simple fact, **prevention of monopoly.** Also, every search engine has different algorithms and ranking systems. As a result, different search engines give different results for the same search query. Although, many people ( including me ) have a tendency to use only one to two engines. In my opinion, the reason for not using more engines is either **unnecessity** or **laziness**. For simple and quick searches it is reasonable to use only one search engine. But in the case of, for example, students doing thorough research on some topic it may seem reasonable to get more information back to examine and consequently work with.
-   We have the ability to change what search engine to use with every web browser. The process of changing the search engine is relatively simple and we have multiple ways how to change the engine. Either we can with a few clicks in the settings and a maximum of a minute choose our desired engine or alternatively, even more straightforwardly and quickly we are able to type the name of the search engine (e.g. [bing.com](http://bing.com)), press tab, and put the search phrase.       
#### The problem

-   The problem is, that for every search, we only receive data from the one chosen search engine. If we would like to perform the same query with another search engine, we either have to change the engine in the settings or, as said before, type the name of the search engine, press tab, and put the search phrase. This change of the engines is effective but slow. As we all know, every second counts and fairly we do not have time to do this for every search we do.

#### The Solution

-   After thorough research, I concluded that there are not many options for internet users to search using multiple search engines simultaneously. That is why I decided to solve this particular problem of mine and create a **WOSE( write once, search everywhere )**.


### Technologies used
-   **HTML** (Hyper Text Markup Language)
-   **CSS** (Cascading Style Sheets
-   **JavaScript**  
-   I also took advantage of API's that Chrome provided such as : tabs, tabGroups and storage
   #### tabs
-   `chrome.tabs` API to interact with the browser's tab system. 
-   I used this API to create tabs in the browser. 
   #### tabGroups
-   `chrome.tabGroups` API to interact with the browser's tab grouping system.
-   I used this API to particularly group newly tabs 
   #### storage
-   `chrome.storage` API to store, retrieve, and track changes to user data.
-   I used this API to save user's preferences.

### Possible improvements
- This Google Chrome web extension can be improved as every other application that exists on the Internet
- Here are some possible improvements :
> 1. Create a group name for the desired search engines
> 2. Ability to let users add their prefered search engines
> 3. Ability to remove engines users know they are never going to use
> 4. Code right now is a hot mess, so code should be improved

### How to launch WOSE
- Since WOSE is not published on a Google Store, adding WOSE to Chrome has to be performed manually.
1. Clone the code: `git clone https://github.com/michalvargaa/wose.git`
2. Open Chrome and type: `chrome://extensions/`
3. Click on `Load unpacked`
4. Select the extension directory/
5. Pin the extension
6. You are ready to go!
