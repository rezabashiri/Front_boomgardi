# Front_boomgardi

src/index.js
Project's life begins with src/index.js file. Uses hot module reload to load src/App.js file.

src/App.js
This file is responsible for routing. Gets routing from browser, initializes redux and shows src/container/App.js.

src/containers/App.js
This file is responsible for passing application path to src/routes/index.js file. It also initializes language and notification provider.

src/routes/index.js
Finally, this file adds navbar, sidebar and shows the corresponding page from src/routes directory.

