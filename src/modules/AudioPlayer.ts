
import anime from 'animejs/lib/anime.es.js'

class AudioPlayer {

    static MaxVolumne = 0.8;
    audio: HTMLAudioElement;
    onFinish: () => void;
    onPause: () => void
    isPlaying: boolean = false;

    constructor(url: string){
        this.audio = new Audio(url);
        this.audio.loop = false;
        this.audio.volume = 0.5
        this.audio.onended = () => this.onFinish()
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




}


export {AudioPlayer}