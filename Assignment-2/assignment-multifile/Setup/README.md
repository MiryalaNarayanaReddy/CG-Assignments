
sudo npm -g install servez



run following when you change something in any file

```
npx webpack --config webpack.config.js

```

run this once and it will keep showing the new code

```
servez .
```


Instructions:

- WASD keys to move forward left back and right
- space bar to shot a cannon at the nearest pirate ship
- press t to toggle between two camera views
- pirate ship is destroyed if 2 to 5 cannons hit it
- treasures are collected on collision with it 
- game displays gameover and reloads in 5s if health is becomes 0