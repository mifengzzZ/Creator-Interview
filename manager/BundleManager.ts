/*
 * @Descripttion: Bundle远程资源管理器
 * @Author: Zhiping Jiang
 * @Information: 564371466@qq.com
 * @Date: 2020-10-21 21:42:59
 * @Belong: Copyright (c) 2020 564371466@qq.com All rights reserved.
 */
//------------------------------------------------------------------------------------
// 外部引入
import { AppConfig } from "../../AppConfig";

//------------------------------------------------------------------------------------

export default class BundleManager {

    private static _ins : BundleManager = null;

    private _bundleMap : any = {};

    static getInstance () : BundleManager {
        if (!this._ins) {
            this._ins = new BundleManager();
        }
        return this._ins;
    }

    /**
     * 通过url缓存bundle资源,并保存
     */
    loadBundleByUrl ( folderPath:string, callback?:any ) {
        cc.assetManager.loadRemote(AppConfig.bundleUrl + folderPath, (err:any, bundle:cc.AssetManager.Bundle) => {
            if (err) {
                return cc.log("[BundleManager] load " + folderPath + " bundle faild.");
            } else {
                cc.log("[BundleManager] load " + folderPath + " bundle success.")
                if (callback) {
                    callback(bundle);
                }
            }
        });
    }

    /**
     * 保存bundle
     */
    saveBundleByName ( bundle:cc.AssetManager.Bundle, bundleName:string ) {
        if (!this._bundleMap[bundleName]) {
            this._bundleMap[bundleName] = bundle;
        } else {
            cc.log("[BundleManager] error : cur " + bundleName + " exist; Need to reset please first remove");
        }
    }

    /**
     * 获取bundle
     */
    getBundleByName ( bundleName:string ) : cc.AssetManager.Bundle {
        if (!this._bundleMap[bundleName]) {
            cc.log("[BundleManager] not found " + bundleName + " bundle.");
            return null;
        }
        return this._bundleMap[bundleName];
    }

    /**
     * 释放bundle
     */
    removeBundleByName ( bundleName:string ) {
        if (!this._bundleMap[bundleName]) {
            cc.log("[BundleManager] remove faild, because the not found " + bundleName + " bundle.");
        } else {
            this._bundleMap[bundleName].releaseAll();
            cc.assetManager.removeBundle(this._bundleMap[bundleName]);
            this._bundleMap[bundleName] = null;
            cc.log("[BundleManager] remove " + bundleName + " bundle success.");
        }
    }
    
    
}
