/*
 * @Descripttion: 正在加载
 * @Author: Zhiping Jiang
 * @Information: 564371466@qq.com
 * @Date: 2020-09-10 23:41:45
 * @Belong: Copyright (c) 2020 564371466@qq.com All rights reserved.
 */

export default class LoadingManager {

    private _loadingView : any = null;
    private _timeOut : number = 20;
    private _timer : any = null;
    private _loadingCount : number = 0;

    private static _ins : LoadingManager = null;

    static getInstance () : LoadingManager {
        if (!this._ins) {
            this._ins = new LoadingManager();
        }
        return this._ins;
    }

    /**
     * 显示正在加载界面
     */
    showLoadingView () {
        if (!this._loadingView) {
            cc.resources.load("prefabs/loading/LoadingView", cc.Prefab, (err:any, prefab:cc.Prefab) => {
                this._loadingView = cc.instantiate(prefab);
                let anim = this._loadingView.getComponent(cc.Animation);
                let animState = anim.play("loading");
                animState.wrapMode = cc.WrapMode.Loop;
                cc.director.getScene().addChild(this._loadingView,2);
                this._timer = setTimeout(() => {
                    this.clearLoadingView();
                }, this._timeOut*1000);
            });
        }
        this._loadingCount += 1;
        cc.log("LoadingView count ++ " + this._loadingCount);
    }

    /**
     * 隐藏一次正在加载界面
     */
    hideLoadingView () {
        if (this._loadingView) {
            this._loadingCount--;
            if (this._loadingCount <= 0) {
                this._loadingView.destroy();
                this._loadingView = null;
                if (this._timer !== null) {
                    clearTimeout(this._timer);
                }
                this._timer = null;
            }
            cc.log("LoadingView count -- " + this._loadingCount);
        }
    }

    /**
     * 清空所有正在加载界面
     */
    clearLoadingView () {
        if (this._loadingView) {
            this._loadingCount = 0;
            this._loadingView.destroy();
            this._loadingView = null;
            if (this._timer !== null) {
                clearTimeout(this._timer);
            }
            this._timer = null;
        }
    }

}
