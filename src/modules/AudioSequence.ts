import { AudioPlayer } from "./AudioPlayer";



class AudioSequence {

    currentSessionIndex: number = 0;
    currentSessionSongIndex: number = 0;

    musicSessions = [];

    player: AudioPlayer

    lastUrl: string;


    constructor(musicSessions: string[][]){
        this.musicSessions = musicSessions
        this.player = new AudioPlayer(this.getCurrentMp3Url())
        this.lastUrl = this.getCurrentMp3Url();
        // this.player.play()
        this.player.onFinish = () => {
            var newurl = this.getNextMp3Url()
            this.player.setUrl(newurl)
            this.lastUrl = newurl
            this.player.play()
        }
        
    }


    
    getCurrentMp3Url = () => {
        if(this.musicSessions[this.currentSessionIndex].length){
            return this.musicSessions[this.currentSessionIndex][this.currentSessionSongIndex]
        }
        else {
            return this.lastUrl
        }
    }

    getNextMp3Url = () => {
       var currentSession: string[] = this.musicSessions[this.currentSessionIndex];

       if(!currentSession.length){
           return this.getCurrentMp3Url()
       }

       this.currentSessionSongIndex = (this.currentSessionSongIndex + 1) % currentSession.length;
       return currentSession[this.currentSessionSongIndex]
    }


    play = () => {
        this.player.play()
    }

    pause = () => {
        this.player.audio.pause()
    }



}

export {
    AudioSequence
}