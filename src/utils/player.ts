import { Howl, Howler } from 'howler'

interface IPlayer {
  _sound: Howl | null
  _volume: number
}

class Player implements IPlayer {
  _sound: Howl | null
  _volume: number

  constructor() {
    this._sound = null
    this._volume = 1.0

    this._init()
  }

  get volume() {
    return this._volume
  }

  set volume(volume: number) {
    this._volume = volume
    Howler.volume(this.volume)
  }

  _init() {
    Howler.volume(this.volume)
  }

  _playAudioSource(source: string) {
    this._stop()
    console.log('new Howl')
    this._sound = new Howl({
      src: [source],
      html5: true,
      loop: false,
      autoplay: false,
      mute: false,
      rate: 1,
    })
    this._play()
  }

  _play() {
    console.log('play')
    this._sound?.play()
  }

  _pause() {
    console.log('pause')
    this._sound?.pause()
  }

  _stop() {
    console.log('stop')
    this._sound?.stop()
  }

  _halfVolume() {
    this.volume = 0.5
  }

  _MaxVolume() {
    this.volume = 1.0
  }
}

export default Player
