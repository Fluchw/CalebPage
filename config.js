// config.js

// 橙色系预设
const ORANGE_COLORS = [
    'rgb(255, 165, 0)',  // #FFA500
    'rgb(236, 88, 0)',   // #EC5800
    'rgb(255, 117, 24)', // #FF7518
    'rgb(255, 95, 21)',  // #FF5F15
    'rgb(240, 128, 0)',  // #F08000
    'rgb(255, 170, 51)', // #FFAA33
    'rgb(255, 149, 0)'   // Already in RGB format
];

// 蓝色系预设
const BLUE_COLORS = [
    'rgb(0, 0, 255)',     // #0000FF
    'rgb(0, 150, 255)',   // #0096FF
    'rgb(0, 71, 171)',    // Already in RGB format
    'rgb(0, 106, 255)',   // Already in RGB format
    'rgb(1, 67, 160)',    // Already in RGB format
    'rgb(73, 115, 173)'   // Already in RGB format
];

// 随机获取颜色
function getRandomColor(colorArray) {
    return colorArray[Math.floor(Math.random() * colorArray.length)];
}

// 随机选择一个橙色和一个蓝色
const selectedOrange = getRandomColor(ORANGE_COLORS);
const selectedBlue = getRandomColor(BLUE_COLORS);

// 随机决定内外顺序
const INNER_COLOR = Math.random() < 0.5 ? selectedOrange : selectedBlue;
const OUTER_COLOR = INNER_COLOR === selectedOrange ? selectedBlue : selectedOrange;

// 添加颜色控制器
const ColorController = {
    init() {
        this.blackHoleEffect = {
            innerColor: INNER_COLOR,
            outerColor: OUTER_COLOR
        };
        
        // 从localStorage加载保存的颜色
        const savedColors = JSON.parse(localStorage.getItem('blackHoleColors') || '{}');
        if (savedColors.inner) this.blackHoleEffect.innerColor = savedColors.inner;
        if (savedColors.outer) this.blackHoleEffect.outerColor = savedColors.outer;
        
        // 初始化时更新一次颜色
        this.updateBlackHoleColors();
    },

    updateBlackHoleColors() {
        const iframe = document.getElementById('blackHoleIframe');
        if (iframe && iframe.contentWindow) {
            iframe.contentWindow.postMessage({
                type: 'updateColors',
                inner: this.blackHoleEffect.innerColor,
                outer: this.blackHoleEffect.outerColor
            }, '*');
            this.saveColors();
        }
    },

    applyPreset(preset) {
        if (!preset || !preset.inner || !preset.outer) return;
        this.blackHoleEffect.innerColor = preset.inner;
        this.blackHoleEffect.outerColor = preset.outer;
        this.updateBlackHoleColors();
        this.updateInputs();
    },

    reset() {
        this.blackHoleEffect.innerColor = INNER_COLOR;
        this.blackHoleEffect.outerColor = OUTER_COLOR;
        this.updateBlackHoleColors();
        this.updateInputs();
    },

    setInnerColor(color) {
        this.blackHoleEffect.innerColor = color;
        this.updateBlackHoleColors();
    },

    setOuterColor(color) {
        this.blackHoleEffect.outerColor = color;
        this.updateBlackHoleColors();
    },

    saveColors() {
        localStorage.setItem('blackHoleColors', JSON.stringify({
            inner: this.blackHoleEffect.innerColor,
            outer: this.blackHoleEffect.outerColor
        }));
    },

    updateInputs() {
        const innerInput = document.getElementById('innerColorInput');
        const outerInput = document.getElementById('outerColorInput');
        if (innerInput) innerInput.value = this.blackHoleEffect.innerColor;
        if (outerInput) outerInput.value = this.blackHoleEffect.outerColor;
    },

    setupEventListeners() {
        const innerInput = document.getElementById('innerColorInput');
        const outerInput = document.getElementById('outerColorInput');
        const resetColorsBtn = document.getElementById('resetColors');

        if (innerInput) {
            innerInput.addEventListener('input', () => {
                this.setInnerColor(innerInput.value);
            });
        }

        if (outerInput) {
            outerInput.addEventListener('input', () => {
                this.setOuterColor(outerInput.value);
            });
        }

        // 动态创建预设按钮
        const presetContainer = document.getElementById('presetContainer');
        if (presetContainer) {
            COLOR_PRESETS.forEach((preset, index) => {
                const presetBtn = document.createElement('button');
                presetBtn.id = `colorPreset${index + 1}`;
                presetBtn.textContent = `预设 ${index + 1}`;
                presetBtn.addEventListener('click', () => {
                    this.applyPreset(preset);
                });
                presetContainer.appendChild(presetBtn);
            });
        }

        if (resetColorsBtn) {
            resetColorsBtn.addEventListener('click', () => {
                this.reset();
            });
        }
    }
};

// 当文档加载完成时初始化颜色控制器
document.addEventListener('DOMContentLoaded', () => {
    ColorController.init();
    ColorController.setupEventListeners();
});


const APP_CONFIGS = {
    imageUrls: {
        浮花以载_图标: "https://patchwiki.biligame.com/images/lysk/8/89/lpacy5xrzxonb3nasqpv4dk78app6d4.png",
        浮花以载_长图: "https://patchwiki.biligame.com/images/lysk/6/65/pvea1olklkmpw82qc94caqr2ye7igmi.png",
        浮花以载: "https://patchwiki.biligame.com/images/lysk/7/7c/0c17und2dg0w7y9c7nnrev3uf7cvxc7.jpg",
        寂路不归_图标: "https://patchwiki.biligame.com/images/lysk/e/ee/6w25vspa4wzntildi6pb0lwfjjbxcm7.png",
        寂路不归_长图: "https://patchwiki.biligame.com/images/lysk/4/4c/gqgm6aimkwziqn3bdtvxpbzldwujfz7.png",
        寂路不归: "https://patchwiki.biligame.com/images/lysk/7/76/4irh7jynupzwlw3e2zhj9fp3w1bwfvq.jpg",
        寂路同赴_图标: "https://patchwiki.biligame.com/images/lysk/5/58/c9gzfpokb2oz5bm55xa8fkdzukdx42p.png",
        寂路同赴_长图: "https://patchwiki.biligame.com/images/lysk/e/e1/7piacni6x7x78f859vu9a2llxwkkwgj.png",
        寂路同赴: "https://patchwiki.biligame.com/images/lysk/9/95/5gcnwxpp641muzihey1zmg2zhmp61bh.jpg",
        离途密触_图标: "https://patchwiki.biligame.com/images/lysk/9/90/2ytd5gyxfbb0vzlz6e3cksfer4rf068.png",
        离途密触_长图: "https://patchwiki.biligame.com/images/lysk/b/b3/jkxtvyd68b0xbhszy042u3ixpsjiq2x.png",
        离途密触: "https://patchwiki.biligame.com/images/lysk/f/f0/d4uo87wv0bvqfykm3r90qgsj9be16l6.png",
        离途幻乐_图标: "https://patchwiki.biligame.com/images/lysk/1/1f/jdsf585baowvnu08c2kkewliy3y3b2g.png",
        离途幻乐_长图: "https://patchwiki.biligame.com/images/lysk/6/68/clrkh06d8xkao786w1t3unc1cwfpspb.png",
        离途幻乐: "https://patchwiki.biligame.com/images/lysk/8/83/4rnvu1zpel2no1b02bsbtt70zkehwj4.png",
        终结_图标: "https://patchwiki.biligame.com/images/lysk/d/da/38j474dwz9q9arrijk4f63ou48sw7jt.png",
        终结_长图: "https://patchwiki.biligame.com/images/lysk/d/d7/1n7co2kk6r3u5rjagjfi4fybmldykx3.png",
        寥落假象_图标: "https://patchwiki.biligame.com/images/lysk/c/c2/59krony52r0op0srptuq55dov4au1j2.png",
        寥落假象_长图: "https://patchwiki.biligame.com/images/lysk/7/72/mwekcrqrja6pphat6lwplda32vhxxoj.png",
        寥落假象: "https://patchwiki.biligame.com/images/lysk/8/84/6omqyusy9er2rq5nc0qh5etd1rmavxg.png",
        附骨之痕_图标: "https://patchwiki.biligame.com/images/lysk/5/55/ihpdofzbb26xc4p0u3gict91x9eskhb.png",
        附骨之痕_长图: "https://patchwiki.biligame.com/images/lysk/e/ee/av1gs2fxn6iohy6am6n118wivrcbm0m.png",
        附骨之痕: "https://patchwiki.biligame.com/images/lysk/8/81/8dq3rvzruzj38jtnyen6dk6r8c6im94.jpg",
        无尽夏_图标: "https://patchwiki.biligame.com/images/lysk/4/43/9t6ivv2mbpo2qnqu726z473jaz5srun.png",
        无尽夏_长图: "https://patchwiki.biligame.com/images/lysk/c/c8/pmlpmsmy4mh7qbg6tll3nzjwvw35tyw.png",
        无尽夏: "https://patchwiki.biligame.com/images/lysk/a/a9/a1oqgzfjsqct19rzl5ep0whai7or1lb.jpg",
        暗潮边缘_图标: "https://patchwiki.biligame.com/images/lysk/1/1d/kokgiun0j8rk0mg15449tlbq1uzf0q1.png",
        暗潮边缘_长图: "https://patchwiki.biligame.com/images/lysk/8/81/6fb5ibxpwrq00qy36wikssid7utjef3.png",
        触痛讯号_图标: "https://patchwiki.biligame.com/images/lysk/8/8f/r9oa6hwz8ldqru4qz0flad9f9v56720.png",
        触痛讯号_长图: "https://patchwiki.biligame.com/images/lysk/0/01/6xccs3h7cxr15ilqo1kg1pxp4ju71l3.png",
        触痛讯号: "https://patchwiki.biligame.com/images/lysk/9/9b/nzbh60s7gjemhesmunstf0438y1to4i.jpg",
        限定余味_图标: "https://patchwiki.biligame.com/images/lysk/6/6b/tawzelqgfp384utjwpvzjt7dxsnvrlv.png",
        限定余味_长图: "https://patchwiki.biligame.com/images/lysk/d/d5/s8agau4egg33w62rcvwhnyyna9n94ki.png",
        远空棠雨_图标: "https://patchwiki.biligame.com/images/lysk/b/ba/o1q6kugca9wcyq06p4t1byw71d49r0d.png",
        远空棠雨_长图: "https://patchwiki.biligame.com/images/lysk/d/d8/jyx3jj49tta8eycjmxcw7j7tgmhwu6t.png",
        远空棠雨: "https://patchwiki.biligame.com/images/lysk/5/5b/4uwsvdyqfsqqo1sg9sk3jk3o1c7ec6u.jpg",
        远空迷航_图标: "https://patchwiki.biligame.com/images/lysk/4/4d/m98vse11qizn5r4irluwcqg6cvtc2qe.png",
        远空迷航_长图: "https://patchwiki.biligame.com/images/lysk/c/cf/tvdjpkyazljcvgork035kahuj0nhi9w.png",
        远空迷航: "https://patchwiki.biligame.com/images/lysk/f/fe/h31yldfvtxe8lc7ss664ez2vl4oht02.jpg",
        回夏_图标: "https://patchwiki.biligame.com/images/lysk/e/e0/m51g28gb18xv2gka6a10b9hrenkwrjm.png",
        回夏_长图: "https://patchwiki.biligame.com/images/lysk/c/c6/nnkeaacengvyx2vv1wkkk71yqsc4oik.png",
        回夏: "https://patchwiki.biligame.com/images/lysk/c/c4/pzm260ni52l7ddtewemexgrt06a47f0.png",
        天际线_图标: "https://patchwiki.biligame.com/images/lysk/4/40/r3936ldg7f1towasm6issidv6tad6wu.png",
        天际线_长图: "https://patchwiki.biligame.com/images/lysk/a/a6/7ocitywu789pbcph0iam9ccumo23lo9.png",
        天际线: "https://patchwiki.biligame.com/images/lysk/c/c6/7gjv389874y5qmpsycx2dn341xp3mrw.png",
        戏中局外_图标: "https://patchwiki.biligame.com/images/lysk/d/d8/k197qgb4tna5gd8wqrd19uhds5qq188.png",
        戏中局外_长图: "https://patchwiki.biligame.com/images/lysk/5/52/oj3mc93s5ro05rx3m8fny002ztkfpef.png",
        戏中局外: "https://patchwiki.biligame.com/images/lysk/6/6f/g97pr3h3th9aqvf5sspygmwxmgx9aky.png",
        绕金枝_图标: "https://patchwiki.biligame.com/images/lysk/1/16/2c6wgmpc21aqris4ykxbkyfie0h5t65.png",
        绕金枝_长图: "https://patchwiki.biligame.com/images/lysk/c/c3/dukt32tgpodjh4fnpidp5gtibhvmiqf.png",
        绕金枝: "https://patchwiki.biligame.com/images/lysk/3/3e/oizjd46te6nyyvkqtbbffdr3dfyfu10.png",
        适配流言_图标: "https://patchwiki.biligame.com/images/lysk/f/fe/1ul8bbu7np3jlzx0gxvvupby7jtsrlz.png",
        适配流言_长图: "https://patchwiki.biligame.com/images/lysk/a/ab/if929pmovuqbj5zy3v2r47xnqm7vhzd.png",
        适配流言: "https://patchwiki.biligame.com/images/lysk/8/8b/ht51dm77a7i05tu7ei6dfnxpr4zdxz0.png",
        预支约定_图标: "https://patchwiki.biligame.com/images/lysk/9/93/2pkheal9x30fjv74tm8qmi250kl3asn.png",
        预支约定_长图: "https://patchwiki.biligame.com/images/lysk/4/4c/5bp9dq0rmsbr0fzv2z14ir9gxxvber4.png",
        预支约定: "https://patchwiki.biligame.com/images/lysk/5/5f/qt9qap3tzfdnmc7qrmbgntfnkrtvznb.png",
        长昼如昨_图标: "https://patchwiki.biligame.com/images/lysk/5/58/5aq3g6oyhyf0mlu2d2d3vbraxk8m87v.png",
        长昼如昨_长图: "https://patchwiki.biligame.com/images/lysk/1/1a/hlj4b2hz6bl8sm6ubjoiuanfmtcczsw.png",
        长昼如昨: "https://patchwiki.biligame.com/images/lysk/4/4a/25n97ynr334ebqeflhprqemp68o6dex.png",
        长昼顷刻_图标: "https://patchwiki.biligame.com/images/lysk/d/d1/hluy1g7fn11ilaq9jru94xvi23mhlak.png",
        长昼顷刻_长图: "https://patchwiki.biligame.com/images/lysk/e/e1/nr1s5otdq9pv8eutalsuusvq2cba864.png",
        长昼顷刻: "https://patchwiki.biligame.com/images/lysk/1/1f/a6dmxw2oh0ddll5md50q7umrw88diat.png"
    },
    

    // 全局配置
    globalBackgroundImageUrl: 'https://source.unsplash.com/random/1920x1080/?galaxy,abstract,dark-theme', // 替换为你想要的全局背景图URL

    // 入口页面文字
    entryPage: {
        title: "探索未知之境",
        subtitle: "向下滑动，开启奇妙旅程"
    },

    // 音乐播放器列表 - 直接在这里打乱顺序
musicFiles: getShuffledMusicFiles([
    { title: "万象遇你", src: "music/沈洛君 - 恋与深空·万象遇你「钢琴」.mp3" },
    { title: "仲夏雨", src: "music/沈洛君 - 恋与深空·夏以昼·仲夏雨「钢琴」.mp3" },
    { title: "巨大轰鸣", src: "music/沈洛君 - 恋与深空·夏以昼·回归预告pv巨大轰鸣「钢琴」.mp3" },
    { title: "家人", src: "music/沈洛君 - 恋与深空·夏以昼·家人「钢琴」.mp3" },
    { title: "抵达梦境边缘", src: "music/沈洛君 - 恋与深空·夏以昼·抵达梦境边缘「钢琴」.mp3" },
    { title: "无尽夏·飞鸟回还时", src: "music/沈洛君 - 恋与深空·夏以昼·无尽夏·飞鸟回还时「钢琴」.mp3" },
    { title: "无引力乐园", src: "music/沈洛君 - 恋与深空·夏以昼·无引力乐园「钢琴」.mp3" },
    { title: "荒芜航线", src: "music/沈洛君 - 恋与深空·夏以昼·荒芜航线「钢琴」.mp3" },
    { title: "触痛讯号", src: "music/沈洛君 - 恋与深空·夏以昼·触痛讯号「钢琴」.mp3" },
    { title: "远空迷航", src: "music/沈洛君 - 恋与深空·夏以昼·远空迷航「钢琴」.mp3" },
    { title: "飞鸟回还日", src: "music/沈洛君 - 恋与深空·夏以昼·飞鸟回还日「钢琴」.mp3" },
    { title: "深空序曲", src: "music/沈洛君 - 恋与深空·深空序曲「钢琴」.mp3" },
    { title: "深空变奏", src: "music/沈洛君 - 恋与深空变奏.mp3" },
    { title: "万象遇你pv", src: "music/沈洛君 - 恋与深空·万象遇你pv「钢琴」.mp3" },

]),

    // 3D 旋转木马配置
    carousel: {
        itemImageUrls: [
            '离途密触',  // 使用新的引用格式
            '离途幻乐',
            '回夏',
            '天际线',
            '戏中局外'
        ],
        translateZValue: '28vw',
    },

    // 手风琴效果配置
    accordion: {
        data: [
            { title: "浮花以载", imageUrl: "浮花以载" },
            { title: "寂路不归", imageUrl: "寂路不归" },
            { title: "寂路同赴", imageUrl: "寂路同赴" },
            { title: "附骨之痕", imageUrl: "附骨之痕" },
            { title: "无尽夏", imageUrl: "无尽夏" }
        ]
    },

    // 抽屉式轮播配置
    drawerCarousel: {
        data: [
                // { title: "online1", imageUrl: "online1" },
                // { title: "online2", imageUrl: "online2" },
                // { title: "online3", imageUrl: "online3" },
                // { title: "online4", imageUrl: "online4" },
                // { title: "online5", imageUrl: "online5" },
                // { title: "local3", imageUrl: "local3" },
                // { title: "local8", imageUrl: "local8" },
                // { title: "local9", imageUrl: "local9" },
                // { title: "local10", imageUrl: "local10" },
            { 
                navTitle: "触痛讯号", 
                title: "触痛讯号", 
                quote: "在璀璨星海中独行，每一步都印刻着永恒。", 
                imageUrl: "触痛讯号_长图", 
                description: "纵使前路漫漫，始终相信光明就在前方。" 
            },
            { 
                navTitle: "远空棠雨", 
                title: "远空棠雨", 
                quote: "跨越星河，探寻未知的边界。", 
                imageUrl: "远空棠雨_长图", 
                description: "每一次的冒险，都是对宇宙奥秘的新发现。" 
            },
            // { 
            //     navTitle: "深空序曲", 
            //     title: "深空序曲", 
            //     quote: "在无垠宇宙中聆听星辰的低语。", 
            //     imageUrl: "local10", 
            //     description: "这是一曲穿越时空的永恒乐章。" 
            // },
            { 
                navTitle: "远空迷航", 
                title: "远空迷航", 
                quote: "迷失在浩瀚星海，寻找归途的指引。", 
                imageUrl: "远空迷航_长图", 
                description: "在漫漫旅程中，找寻属于自己的星光。" 
            },
            { 
                navTitle: "寥落假象", 
                title: "寥落假象", 
                quote: "寥落假象1", 
                imageUrl: "寥落假象_长图", 
                description: "寥落假象2" 
            }
            
        ]
    },

    // 视差滚动区块配置
    parallax: {
        itemsData: [
            { 
                title: "「离途密触」", 
                desc: "离途密触", 
                imageUrl: "离途密触" 
            },
            { 
                title: "「离途幻乐」", 
                desc: "离途幻乐", 
                imageUrl: "离途幻乐" 
            },
            { 
                title: "「寥落假象」", 
                desc: "寥落假象", 
                imageUrl: "寥落假象" 
            },
            { 
                title: "「回夏」", 
                desc: "回夏", 
                imageUrl: "回夏" 
            },
            { 
                title: "「天际线」", 
                desc: "天际线", 
                imageUrl: "天际线" 
            },
            { 
                title: "「戏中局外」", 
                desc: "戏中局外", 
                imageUrl: "戏中局外" 
            },
            // { 
            //     title: "「绕金枝」", 
            //     desc: "绕金枝", 
            //     imageUrl: "绕金枝" 
            // },
            { 
                title: "「适配流言」", 
                desc: "适配流言", 
                imageUrl: "适配流言" 
            },
            { 
                title: "「预支约定」", 
                desc: "预支约定", 
                imageUrl: "预支约定" 
            },
            // { 
            //     title: "「长昼如昨」", 
            //     desc: "长昼如昨", 
            //     imageUrl: "长昼如昨" 
            // },
            { 
                title: "「长昼顷刻」", 
                desc: "长昼顷刻", 
                imageUrl: "长昼顷刻" 
            },
            // { 
            //     title: "「浮花以载」", 
            //     desc: "浮花以载", 
            //     imageUrl: "浮花以载_长图" 
            // },
            // { 
            //     title: "「远空棠雨」", 
            //     desc: "远空棠雨", 
            //     imageUrl: "远空棠雨_长图" 
            // }
        ]
    }
};

// 辅助函数：解析图片URL
function getImageUrl(key) {
    return APP_CONFIGS.imageUrls[key] || key;
}

// 预处理所有配置中的图片URL
function processImageUrls(config) {
    // 处理所有需要图片URL的配置项
    ['carousel.itemImageUrls', 'accordion.data', 'drawerCarousel.data', 'parallax.itemsData'].forEach(path => {
        const keys = path.split('.');
        let current = config;
        for (const key of keys.slice(0, -1)) {
            if (current[key]) current = current[key];
            else return;
        }
        
        const lastKey = keys[keys.length - 1];
        if (Array.isArray(current[lastKey])) {
            current[lastKey] = current[lastKey].map(item => {
                if (typeof item === 'string') {
                    return getImageUrl(item);
                }
                if (item.imageUrl) {
                    return { ...item, imageUrl: getImageUrl(item.imageUrl) };
                }
                return item;
            });
        }
    });

    return config;
}

// 修改导出的配置,每次重新洗牌音乐列表
function getShuffledMusicFiles(musicFiles) {
    return [...musicFiles].sort(() => Math.random() - 0.5);
}

const PROCESSED_APP_CONFIGS = processImageUrls(APP_CONFIGS);