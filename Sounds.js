class Sounds {
  constructor() {
    this.context = new AudioContext()
    this.currentlyPlaying = null
    this.sounds = {
      ambient: {
        shoot: new Audio('sounds/shoot.mp3'),
        walk: new Audio('sounds/player_walk.mp3'),
        recharge: new Audio('sounds/recharge.mp3'),
        hit: new Audio('sounds/player_hit.mp3')
      }
    }
    this.resumed = false;
    window.addEventListener('mousedown', () => {
      if (!this.resumed) {
        this.context.resume();
        this.resumed = true;
      }
    })
  }

  async play(soundType, soundName) {
    const sound = this.sounds[soundType][soundName]
    sound.currentTime = 0
    const playPromise = sound.play()
    this.currentlyPlaying = this.sounds[soundType][soundName]

    if (playPromise !== undefined) {
      playPromise.then(() => {
      }).catch(() => {
      });
    }

    return new Promise(resolve => {
      sound.addEventListener('ended', () => {
        resolve();
      })
    })
  }

stop(soundType, soundName) {
    const sound = this.sounds[soundType][soundName]
    sound.pause()
    sound.currentTime = 0
  }

}