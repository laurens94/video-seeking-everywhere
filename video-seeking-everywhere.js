console.debug("💾 'Video Seeking Everywhere' plugin loaded.");
const params = new URLSearchParams(document.currentScript.src.split('?')[1]);

const config = {
  rewindSec: params.get('rewindSec'),
  seekForwardSec: params.get('seekForwardSec')
};

function onSeek(e) {
  if (["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement?.tagName)) {
    return;
  }
  [...document.querySelectorAll('video')].filter(vid => !vid.paused).forEach((player) => {
    if (player) {
      switch (e.key) {
        case '<':
        case ',':
          console.debug(`⏪ Seeking backwards by ${config.rewindSec} second${config.rewindSec > 1 ? 's' : ''}`);
          player.currentTime -= parseInt(config.rewindSec);
          break;
        case '>':
        case '.':
          console.debug(`⏩ Seeking forwards by ${config.seekForwardSec} second${config.seekForwardSec > 1 ? 's' : ''}`);
          player.currentTime += parseInt(config.seekForwardSec);
          break;
      }
    }
  });
}

document.addEventListener('keydown', onSeek);
