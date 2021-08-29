
import anime from 'animejs/lib/anime.es.js'

class AudioPlayer {

    static MaxVolumne = 0.8;
    audio: HTMLAudioElement;
    onFinish: () => void;
    onPause: () => void
    isPlaying: boolean = false;

    static Audios = [];

    constructor(url: string){
        this.audio = new Audio(url);
        this.audio.loop = false;
        this.audio.volume = 0.5
        this.audio.onended = () => this.onFinish()

        AudioPlayer.Audios.push(this.audio)
    }

    setUrl = (url: string) => {
        this.audio = new Audio(url);
        this.audio.loop = false;
        this.isPlaying = false;
        this.audio.onended = () => this.onFinish()
    }


    public play = () => {
        this.audio.volume = 0.5
        this.audio.play()
        
    }

    static clean = () => {
        AudioPlayer.Audios.map((item: HTMLAudioElement) => {
            item.pause()
        })

        AudioPlayer.Audios = []
    }




}


export {AudioPlayer}