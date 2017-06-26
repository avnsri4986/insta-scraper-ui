# User Interface for Instagram Scraper
-   Built purely on Angular2 along with Semantic and Bootstrap UI Frameworks. 
-   Implements lazy loading to load more images every time user reaches the end of gallery. 
-   Logic built on parsing XHTML responses sent by instagram.
-   Uses ng-cli to make the code easy to set up. 
-   Uses inbuild http-proxy-middle to proxy rewrite paths to backend server. 
-   All UI requirements are fulfilled through Bower Dependency management. 
-   Application is responsive till mobile views. Tested on OnePlus 3. 


Software Requirements
- NodeJS (npm)
- Angular 2 CLI (`npm install @angualr/cli typescript -g`)

How to setup? 
- Browse to the project directory. Open Command prompt.
- Run, npm install && bower install (If you work behind a corporate proxy network please make sure you set HTTP_PRXY and HTTPS_PROXY) variables in command prompt. 
- Run: npm start [Please make sure that the backend server (i.e. https://github.com/avnsri4986/insta-scraper ) is started up]

Future Development Scope:
-   Add ability for user to click on an image and obtain a zoomed view of the same along with the comments.
-   Add authentication [Will Require Instagram APIs (Scraper will become discarded)]
-   Improve Lazy Loading logic.