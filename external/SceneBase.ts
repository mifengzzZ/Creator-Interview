/*
 * @Descripttion: 场景基类
 * @Author: Zhiping Jiang
 * @Information: 564371466@qq.com
 * @Date: 2020-09-13 20:08:55
 * @Belong: Copyright (c) 2020 564371466@qq.com All rights reserved.
 */

const {ccclass, property} = cc._decorator;

@ccclass
export default class SceneBase extends cc.Component {

    // 当前场景类型
    _sceneType : string = null;

    // 跳转场景时携带参数
    _userData : any = null;

    setSceneType ( type:string ) {
        cc.log("Cur scene type : ", type);
        this._sceneType = type;
    }

    getSceneType () : string {
        return this._sceneType;
    }

    setUserData ( data:any ) {
        cc.log("Cur jump scene user data : ", data);
        this._userData = data;
    }

    getUserData () : any {
        return this._userData;
    }

}
