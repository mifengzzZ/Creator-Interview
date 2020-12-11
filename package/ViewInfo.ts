/*
 * @Descripttion: 注册视图(视图信息)
 * @Author: Zhiping Jiang
 * @Information: 564371466@qq.com
 * @Date: 2020-08-24 21:35:27
 * @Belong: Copyright (c) 2020 564371466@qq.com All rights reserved.
 */

export default class ViewInfo {

    tsPath : string = "";
    prefab : string = "";
    zOrder : number = 0;
    bundle : cc.AssetManager.Bundle = null;

    constructor (tsPath:string, prefab:string, zOrder?:number, bundle?:cc.AssetManager.Bundle ) {
        this.tsPath = tsPath;
        this.prefab = prefab;
        this.zOrder = zOrder || 0;
        this.bundle = bundle || null;
    }
    
}
