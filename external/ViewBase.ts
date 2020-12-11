/*
 * @Descripttion: 视图基类
 * @Author: Zhiping Jiang
 * @Information: 564371466@qq.com
 * @Date: 2020-09-13 20:08:55
 * @Belong: Copyright (c) 2020 564371466@qq.com All rights reserved.
 */
//------------------------------------------------------------------------------------
// 外部引入
import ViewManager from "../manager/ViewManager";
import ToolUtils from "../utils/ToolUtils";
import EventManager from "../manager/EventManager";
import SoundManager from "../manager/SoundManager";
import NativeManager from "../manager/NativeManager";

//------------------------------------------------------------------------------------

const {ccclass, property} = cc._decorator;

@ccclass
export default class ViewBase extends cc.Component {

    _guiType : string = "";
    _userData : any = null;
    _closeShowAnimation : boolean = false;
    _isCloseAnimating : boolean = false;
    _root : any = null;
    _toolUtils : ToolUtils = ToolUtils.getInstance();
    _viewManager : ViewManager = ViewManager.getInstance();
    _eventManager : EventManager = EventManager.getInstance();
    _soundManager : SoundManager = SoundManager.getInstance();
    _nativeManager : NativeManager = NativeManager.getInstance();

    setType ( type:string ) {
        this._guiType = type;
    }

    getType () : string {
        return this._guiType;
    }

    setUserData ( data:any ) {
        this._userData = data;
    }

    getUserData () : any {
        return this._userData;
    }

    closeShowAnimation () {
        this._closeShowAnimation = true;
    }

    initView () {
        if (this.node === null) {
            return;
        }

        let mask = ToolUtils.getInstance().getNodeByName(this.node, "MASK");
        mask.setContentSize(cc.size(cc.winSize.width, cc.winSize.height));
        mask.on(cc.Node.EventType.TOUCH_START, () => {
            //@ts-ignore
            if (this.onClickMask) {
                //@ts-ignore
                this.onClickMask();
            }
            return true;
        });

        let bg = ToolUtils.getInstance().getNodeByName(this.node, "BGIMG");
        bg.on(cc.Node.EventType.TOUCH_START, () => {
            return true;
        });

        this.node.x = cc.winSize.width/2;
        this.node.y = cc.winSize.height/2;
        
        if (!this._closeShowAnimation) {
            this.node.opacity = 0;
            this.node.setScale(0.7);
            cc.tween(this.node).to(0.05, {scale : 1.1}, {easing : "sineIn"})
                                .to(0.03, {scale : 1}, {easing : "sineOut"})
                                .call(() => {
                                    ViewManager.getInstance()._viewScriptStack.push(this);
                                })
                                .start();
            cc.tween(this.node).to(0.08, {opacity : 255})
                                .start();
        }

        this._closeShowAnimation = false;
        //@ts-ignore
        if (this.onShow) {
            //@ts-ignore
            this.onShow();
        }
    }

    hide () {
        cc.tween(this.node).to(0.03, {scale : 1.1}, {easing : "sineIn"})
                            .to(0.05, {scale : 0.7}, {easing : "sineOut"})
                            .call(() => {
                                this.node.active = false;
                                //@ts-ignore
                                if (this.onHide) {
                                    //@ts-ignore
                                    this.onHide();
                                }
                            }).start();
    }
    
    show () {
        this.node.opacity = 0;
        this.node.setScale(0.7);
        cc.tween(this.node).to(0.05, {scale : 1.1}, {easing : "sineIn"}).to(0.03, {scale : 1}, {easing : "sineOut"}).start();
        cc.tween(this.node).to(0.08, {opacity : 255}).start();
    }
    
    _destroy () {
        ViewManager.getInstance().removeView(this._guiType);
        this._guiType = "";
        this._userData = null;
        this._closeShowAnimation = false;
        this._isCloseAnimating = false;
    }

    close ( isNoAnim?:any ) {
        if (this._isCloseAnimating) {
            return;
        }
        if (typeof isNoAnim === "undefined" || !isNoAnim) {
            this._isCloseAnimating = true;

            cc.tween(this.node).to(0.03, {scale : 1.1}, {easing : "sineIn"})
                                .to(0.05, {scale : 0.7}, {easing : "sineOut"})
                                .call(() => {
                                    this._isCloseAnimating = false;
                                    this._destroy();
                                }).start();

        }else {
            this.node.opacity = 0;
            this._destroy();
        }
    }

    /**
     * 查找节点上的组件
     */
    getComponentByNode ( node:cc.Node, component:any) : any {
        let comp = node.getComponent(component);
        if (!comp) {
            cc.log("ViewBase ERROR : not found component : ", component);
            return node;
        }
        return comp;
    }

}
