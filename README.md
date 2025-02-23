
# DRAGE Loading

A simple FiveM qb-core loading screen that can be customized using the config.json file.

## Installation

These are the steps to setup your server's loading screen.

```bash
  1. Download the code.
  2. Add a .mp3 file to the folder.
  3. Change the values in config.json
  4. Add folder to the server and restart.
```

The config file has the following fields:
```json
 {
    "server_name": "drage_loading",
    "music_file": "music.mp3",
    "logo_file": "logo.png",
    "gradient_start": "#FF0000",
    "gradient_end": "#FF8888",
    "background_images_display": true,
    "background_images": [
        "https://pbs.twimg.com/media/GBujle4WwAAu02U?format=jpg&name=4096x4096",
        "https://imag.malavida.com/mvimgbig/download-fs/fivem-34014-6.jpg",
        "https://www.gta-multiplayer.cz/screenshots/original/147033.jpg",
        "https://www.pcgamesn.com/wp-content/sites/pcgamesn/2021/04/gta-5-fivem-player-count.jpg",
        "https://www.gta-multiplayer.cz/screenshots/original/147123.jpg",
        "https://www.rockstarmag.fr/wp-content/uploads/2023/10/FiveM.jpg"
    ]
}
```
If you want the background to show images of your choice, set `background_images_display` to `true`. It will then take the images in `background_images` and cycle through them randomly.
## Appendix

Any server under 150 members are free to use the loading screen without asking for permission.

Any server over 150 members, you can contact me on Discord with the @DRAGEno01 username. Send a message request instead of friend request.

The following servers don't need to get in contact:
- EggRP (Victorian Based FiveM Server) [SHUTDOWN]
- QuantumRP (Victorian Based FiveM Server)


Thanks to [@RyanHardof](https://github.com/RyanHardof) for the idea to make a loading screen.
