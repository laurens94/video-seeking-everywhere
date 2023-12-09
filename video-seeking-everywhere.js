console.debug("💾 'Video Seeking Everywhere' plugin loaded.");
const params = new URLSearchParams(document.currentScript.src.split('?')[1]);

const config = {
  rewindSec: params.get('rewindSec'),
  seekForwardSec: params.get('seekForwardSec')
};

function onSeek(e) {
  if (document.activeElement.tagName == "INPUT" || document.activeElement.tagName == "TEXTAREA"
    || document.activeElement.tagName == "SELECT")
    return;
  const players = [...document.querySelectorAll('video')].filter(vid => !vid.paused);
  players.forEach((player) => {
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

// Listen to keydown events:
document.addEventListener('keydown', onSeek);
