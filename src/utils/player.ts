import { Howl, Howler } from 'howler'
import type { Ref } from 'vue'
import { useStore } from '~/store/project'

let store: any
setTimeout(() => {
  store = useStore()
}, 100)

interface IPlayer {
  _sound: Howl | null
  _volume: number
  _isPlay: Ref<boolean>
  _MODE: 'SINGLE_LOOP' | 'LIST_LOOP'
  _progress: Ref<number>
  _duration: Ref<number>
}

class Player implements IPlayer {
  _sound: Howl | null
  _volume: number
  _isPlay: Ref<boolean>
  _MODE: 'SINGLE_LOOP' | 'LIST_LOOP'
  _progress: Ref<number>
  _duration: Ref<number>

  constructor() {
    this._sound = null
    this._volume = 1.0
    this._isPlay = ref(false)
    this._MODE = 'LIST_LOOP'
    this._progress = ref(0)
    this._duration = ref(0)

    this._init()
  }

  get volume() {
    return this._volume
  }

  set volume(volume: number) {
    this._volume = volume
    Howler.volume(this.volume)
  }

  // _progress必须是响应式数据，否则该get函数不会随数据变化生效
  get progress() {
    return this._progress.value
  }

  set progress(value: number) {
    if (this._sound)
      this._seek(Math.floor(value))
  }

  // get duration() {
  //   console.log(`change${this._duration.value}`)
  //   return this._duration.value
  // }

  // set duration(value: number) {
  //   this._duration.value = value
  // }

  _init() {
    Howler.volume(this.volume)
    this._setIntervals()
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
      onload: () => {
        console.log(this._sound?.duration())
        this._duration.value = Math.ceil(this._sound!.duration())
      },
      onend: () => {
        this._isPlay.value = false
        if (this._MODE === 'LIST_LOOP') {
          this._playAudioSource(store.nextMusicUrl)
          store.changeToNextMusicID()
        }
        else {
          this._play()
        }
      },
    })

    this._play()
  }

  _play() {
    console.log('play')
    this._sound?.play()
    this._isPlay.value = true
  }

  _pause() {
    console.log('pause')
    this._sound?.pause()
    this._isPlay.value = false
  }

  _stop() {
    console.log('stop')
    this._sound?.stop()
    this._isPlay.value = false
  }

  _seek(value: number) {
    console.log('seek')
    this._progress.value = value
    // 跳转
    this._sound?.seek(value)
    // 打印
    // console.log(this._sound?.seek())
  }

  _setIntervals() {
    // 同步播放进度
    // TODO: 如果 _progress 在别的地方被改变了，这个定时器会覆盖之前改变的值，是bug
    setInterval(() => {
      if (this._sound === null)
        return
      console.log('timer')
      this._progress.value = this._sound.seek()
      // localStorage.setItem('playerCurrentTrackTime', this._progress)
    }, 1000)
  }
}

export default Player
