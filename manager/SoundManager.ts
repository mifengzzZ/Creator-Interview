/*
 * @Descripttion: 音频管理器
 * @Author: Zhiping Jiang
 * @Information: 564371466@qq.com
 * @Date: 2020-08-23 18:33:12
 * @Belong: Copyright (c) 2020 564371466@qq.com All rights reserved.
 */

export default class SoundManager {

    private static _ins : SoundManager = null;

    _playAudioIDList : any = {};

    static getInstance () : SoundManager {
        if (!this._ins) {
            this._ins = new SoundManager();
        }
        return this._ins;
    }

    /**
     * 播放音频
     */
    play ( path:string, loop:boolean, value:number ) {
        cc.resources.load(path, cc.AudioClip, (err:any, audioClip:cc.AudioClip) => {
            let audioID = cc.audioEngine.play(audioClip, loop, value);
            this._playAudioIDList[path] = audioID;
        });
    }

    /**
     * 停止音频
     */
    stop ( path:string ) {
        if (!this._playAudioIDList[path]) {
            cc.log("[SoundManager] stop Error : not found AudioID");
            return;
        }
        cc.audioEngine.stop(this._playAudioIDList[path]);
    }

    /**
     * 恢复音频
     */
    resume ( path:string ) {
        if (!this._playAudioIDList[path]) {
            cc.log("[SoundManager] resume Error : not found AudioID");
            return;
        }
        cc.audioEngine.resume(this._playAudioIDList[path]);
    }

    /**
     * 设置音频音量
     */
    setVolume ( path:string, value:number ) {
        if (!this._playAudioIDList[path]) {
            cc.log("[SoundManager] setVolume Error : not found AudioID");
            return;
        }
        cc.audioEngine.setVolume(this._playAudioIDList[path], value);
    }

    /**
     * 获取音频音量
     */
    getVolume ( path:string ) {
        if (!this._playAudioIDList[path]) {
            cc.log("[SoundManager] getVolume Error : not found AudioID");
            return;
        }
        return cc.audioEngine.getVolume(this._playAudioIDList[path]);
    }

    /**
     * 停止所有音频
     */
    stopAll () {
        cc.audioEngine.stopAll();
    }

    /**
     * 恢复所有音频
     */
    resumeAll () {
        cc.audioEngine.resumeAll();
    }

}
