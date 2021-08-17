
import anime from 'animejs/lib/anime.es.js'

class AudioPlayer {

    static MaxVolumne = 0.8;
    audio: HTMLAudioElement;

    constructor(url: string){
        this.audio = new Audio(url);
        this.audio.volume = 0.05
    }


    public play = () => {
        this.audio.play()
        anime({
            easing:"easeInQuad",
            target: this.audio,
            volumn: 0.9,
            duration: 3236,
            complete: function(anim) {
                console.log('c',this.audio.volumne)
              }
        })
    }

    public stop = (onFinish = () => {}) => {
        this.audio.pause()
        anime({
            easing:"easeOutQuad",
            target: this.audio,
            volumn: 0.9,
            duration: 3236,
            complete: function(anim) {
                onFinish()
            }
        })
    }


}


export {AudioPlayer}