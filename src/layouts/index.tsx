import {useEffect, useState} from "react";
import {Link, Outlet} from 'umi';
import styles from './index.less';
import {NavBar, Space, Switch, Toast} from "antd-mobile";
import {
    enable as enableDarkMode,
    disable as disableDarkMode,
    isEnabled as isDarkReaderEnabled
} from 'darkreader';
import {StorageUtils} from "@/utils/StorageUtils";

export default function Layout() {

    const [layoutTheme, setLayoutTheme] = useState<'light' | 'dark'>();

    const right = (
        <div style={{fontSize: 24}}>
            <Space style={{'--gap': '16px'}}>
                <a href="https://github.com/hsllee/SimpleTools.git" target="_blank">Github</a>
                <Switch uncheckedText='浅色' checkedText='深色' checked={layoutTheme == 'dark'} onChange={(checked) => {
                    if (checked) {
                        setLayoutTheme('dark');
                    } else {
                        setLayoutTheme('light');
                    }
                }}/>
            </Space>
        </div>
    );

    useEffect(() => {
        let layoutTheme2 = StorageUtils.getCookie(APP_CONFIG.APP_NAME + 'LayoutTheme');
        layoutTheme2 = layoutTheme2 == 'dark' ? 'dark' : 'light';
        setLayoutTheme(layoutTheme2 as any);
    }, []);

    useEffect(() => {
        try {
            if (layoutTheme == 'dark') {
                if (!isDarkReaderEnabled()) {
                    enableDarkMode({
                        brightness: 100,
                        contrast: 90,
                        sepia: 10,
                    });
                    StorageUtils.setCookie(APP_CONFIG.APP_NAME + 'LayoutTheme', 'dark', 604800);
                }
            } else {
                if (isDarkReaderEnabled()) {
                    disableDarkMode();
                    StorageUtils.setCookie(APP_CONFIG.APP_NAME + 'LayoutTheme', 'light', 604800);
                }
            }
        } catch (e) {
            console.log('主题切换出错', e);
            Toast.show({content: '主题切换出错'});
        }
    }, [layoutTheme]);

    return (
        <div className={styles.navs}>
            <NavBar right={right} back={null}>
                工具箱
            </NavBar>
            <Outlet/>
        </div>
    );
}
